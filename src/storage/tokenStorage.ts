import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'secure_profile_access_token';
// SecureStore is native-only. This keeps web previews usable without persisting
// credentials in browser storage; refreshes on web start a signed-out session.
let webSessionToken: string | null = null;

export async function saveToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    webSessionToken = token;
    return;
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  if (Platform.OS === 'web') return webSessionToken;
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken(): Promise<void> {
  if (Platform.OS === 'web') {
    webSessionToken = null;
    return;
  }
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
