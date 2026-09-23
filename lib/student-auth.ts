import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export type StudentProfile = {
  name: string;
  email: string;
  studentId?: string;
  program?: string;
  yearLevel?: string;
  role?: string;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');
const LOGIN_PATH = process.env.EXPO_PUBLIC_LOGIN_PATH ?? '/auth/login';
const PROFILE_PATH = process.env.EXPO_PUBLIC_PROFILE_PATH ?? '/auth/me';
const GRADES_PATH = process.env.EXPO_PUBLIC_GRADES_PATH ?? '/grades';
const TOKEN_KEY = 'student_portal_token';
export const DEMO_CREDENTIALS = { email: 'student@cce106.demo', password: 'Student123!' };
export const isDemoMode = !API_URL;
const DEMO_PROFILE: StudentProfile = {
  name: 'Demo Student',
  email: DEMO_CREDENTIALS.email,
  studentId: 'CCE-106-001',
  program: 'Information Technology',
  yearLevel: '3rd Year',
  role: 'Student',
};
const DEMO_GRADES: StudentGrade[] = [
  { id: '1', courseCode: 'CCE 106', course: 'Application Development', grade: '1.50', units: 3, term: '1st Semester' },
  { id: '2', courseCode: 'IT 11', course: 'Networking 2', grade: '1.75', units: 3, term: '1st Semester' },
  { id: '3', courseCode: 'IT 12', course: 'Systems Integration', grade: '1.25', units: 3, term: '1st Semester' },
];

async function saveToken(token: string) {
  if (Platform.OS === 'web') {
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(TOKEN_KEY, token);
    return;
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

async function readToken() {
  if (Platform.OS === 'web') {
    return typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(TOKEN_KEY) : null;
  }
  return SecureStore.getItemAsync(TOKEN_KEY);
}

async function removeToken() {
  if (Platform.OS === 'web') {
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(TOKEN_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export const isAuthApiConfigured = Boolean(API_URL);

function getApiUrl(path: string) {
  if (!API_URL) throw new Error('Add EXPO_PUBLIC_API_URL to your .env file to connect the student portal.');
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

async function readResponse(response: Response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = body?.message ?? body?.error ?? `Request failed (${response.status})`;
    throw new Error(typeof message === 'string' ? message : `Request failed (${response.status})`);
  }
  return body;
}

function findToken(body: any): string | undefined {
  return body?.token ?? body?.access_token ?? body?.accessToken ??
    body?.data?.token ?? body?.data?.access_token ?? body?.data?.accessToken;
}

function toProfile(body: any): StudentProfile {
  const student = body?.profile ?? body?.user ?? body?.data?.profile ?? body?.data?.user ?? body?.data ?? body;
  const name = student?.name ?? student?.fullName ?? student?.full_name ??
    [student?.firstName ?? student?.first_name, student?.lastName ?? student?.last_name].filter(Boolean).join(' ');
  return {
    name: name || 'Student',
    email: student?.email ?? student?.student?.email ?? '',
    studentId: student?.studentId ?? student?.student_id ?? student?.id,
    program: student?.program ?? student?.course,
    yearLevel: student?.yearLevel ?? student?.year_level ?? student?.year,
    role: student?.role,
  };
}

export async function login(email: string, password: string) {
  if (!API_URL) {
    if (email.trim().toLowerCase() !== DEMO_CREDENTIALS.email || password !== DEMO_CREDENTIALS.password) {
      throw new Error('Invalid email or password. Use the demo credentials shown below.');
    }
    const token = `demo.${Date.now()}.${Math.random().toString(36).slice(2)}`;
    await saveToken(token);
    return { token, profile: DEMO_PROFILE };
  }

  const response = await fetch(getApiUrl(LOGIN_PATH), {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = await readResponse(response);
  const token = findToken(body);
  if (!token) throw new Error('Login succeeded, but the response did not include a token. Check the token field name.');
  await saveToken(token);
  return { token, profile: toProfile(body) };
}

export async function getSavedToken() {
  return readToken();
}

export async function fetchStudentProfile(token: string) {
  return toProfile(await fetchProtectedJson(token, PROFILE_PATH));
}

export async function fetchStudentGrades(token: string) {
  const body = await fetchProtectedJson(token, GRADES_PATH);
  const grades = Array.isArray(body) ? body : body?.grades ?? body?.data?.grades ?? body?.data;
  if (!Array.isArray(grades)) throw new Error('The grades endpoint did not return a grades list.');
  return grades as StudentGrade[];
}

async function fetchProtectedJson(token: string, path: string) {
  if (!API_URL) {
    const parts = token.split('.');
    const createdAt = Number(parts[1]);
    const validDemoToken = parts[0] === 'demo' && Number.isFinite(createdAt) && Date.now() - createdAt < 8 * 60 * 60 * 1000;
    if (!validDemoToken) throw new Error('Request failed (401): Session expired. Please sign in again.');
    // In demo mode this acts as the protected endpoint's Bearer-token check.
    if (path === PROFILE_PATH) return DEMO_PROFILE;
    if (path === GRADES_PATH) return DEMO_GRADES;
    throw new Error(`No demo endpoint configured for ${path}.`);
  }

  const response = await fetch(getApiUrl(path), {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });
  return readResponse(response);
}

export async function clearSavedToken() {
  await removeToken();
}

export type StudentGrade = {
  id?: string | number;
  course?: string;
  courseCode?: string;
  course_code?: string;
  subject?: string;
  grade?: string | number;
  finalGrade?: string | number;
  final_grade?: string | number;
  units?: string | number;
  term?: string;
  semester?: string;
  status?: string;
};
