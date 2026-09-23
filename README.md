# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Test the Quotes API with Postman

1. Open Postman and choose **Import**.
2. Select `postman/Quotes-App.postman_collection.json` from this project.
3. Open the imported **Quotes App API** collection and send **Get a random quote**.
4. A successful response is HTTP `200` and includes `quote` and `author` fields. The collection also checks these fields in its Tests tab.

The Expo app uses this same `GET https://dummyjson.com/quotes/random` endpoint when it loads and when **NEW QUOTE** is pressed.

## Connect the Student Portal API

The portal includes login, persistent token storage, session restore, a protected profile request, role display, and logout. It runs with a local demo account when no backend URL is set. To use a real backend:

1. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL` to a URL reachable from your phone or emulator. Restart Expo after changing environment variables.
2. Import `postman/Student-Portal-API.postman_collection.json` into Postman. Set the collection variables `baseUrl`, `studentEmail`, and `studentPassword` to your API URL and test account.
3. Send **Login**, then **Get protected profile**. Login must accept `POST /auth/login` with `{ "email": "...", "password": "..." }` and return a token field. Profile must accept `GET /auth/me` with `Authorization: Bearer <token>` and return a profile/user object containing at least a name or email. Optional profile fields are `studentId`, `program`, `yearLevel`, and `role`.
4. If your backend uses different routes, set `EXPO_PUBLIC_LOGIN_PATH` and `EXPO_PUBLIC_PROFILE_PATH` in `.env`. The grades screen also uses `EXPO_PUBLIC_GRADES_PATH` (default `/grades`).

The sample collection documents the contract the app currently expects; it does not create or host a student backend. Use credentials issued by your backend. The demo credentials shown in the app work only in demo mode.
