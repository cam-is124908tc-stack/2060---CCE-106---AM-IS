# Secure Profile App Lab

A React Native app for practicing API authentication and secure token handling with Expo SDK 57.

## Run the app

```bash
npm install
npx expo start
```

Open it in Expo Go on Android or iOS. The app uses the native `expo-secure-store` module for token persistence, so web is only a preview: its token stays in memory and is cleared when the page reloads.

## Practice login

DummyJSON publishes these test credentials:

- Username: `emilys`
- Password: `emilyspass`

The app sends them to `POST https://dummyjson.com/auth/login`, stores the returned access token with SecureStore, then loads the profile from `GET https://dummyjson.com/auth/me` with an `Authorization: Bearer` header. On app start it checks SecureStore and restores the profile; logout deletes the stored token.

## Use the API in Postman

The app calls DummyJSON directly. To send and inspect the same API requests in Postman, import both files from `postman/` using **Import** in your Postman workspace:

- `Secure Profile App.postman_collection.json`
- `Secure Profile App.postman_environment.json`

Select the **Secure Profile App Lab - DummyJSON** environment, then run the collection in order. The valid login request saves its access token as an environment variable; the next request uses it as a Bearer token for `/auth/me`. The last request checks that a wrong password is rejected. Postman supports importing collection and environment JSON files, and its scripts can set environment variables for subsequent requests ([import guide](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data), [environment variables](https://learning.postman.com/docs/use/send-requests/variables/environment-variables)).

These are public test credentials for a practice API. Do not enter a personal password. This demo does not implement production authentication or a real user database.

## Project files

- `src/app/index.tsx` — login and authenticated profile interface, loading and error states, session restore, logout.
- `src/services/authService.ts` — login and protected profile API requests.
- `src/storage/tokenStorage.ts` — SecureStore token save, read, and delete methods.
