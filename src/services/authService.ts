const BASE_URL = 'https://dummyjson.com';

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
};

type LoginResponse = UserProfile & { accessToken?: string; token?: string };

async function readResponse<T>(response: Response): Promise<T> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error('The server returned an unreadable response. Please try again.');
  }
  if (!response.ok) {
    const message =
      typeof body === 'object' && body !== null && 'message' in body && typeof body.message === 'string'
        ? body.message
        : 'Request failed. Please check your connection and try again.';
    throw new Error(message);
  }
  return body as T;
}

export async function loginUser(username: string, password: string): Promise<{ token: string; user: UserProfile }> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
  });
  const data = await readResponse<LoginResponse>(response);
  const token = data.accessToken ?? data.token;
  if (!token) throw new Error('The sign-in response did not include an access token.');
  return { token, user: data };
}

export async function getCurrentUser(token: string): Promise<UserProfile> {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return readResponse<UserProfile>(response);
}
