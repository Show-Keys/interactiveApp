
  # البرنامج التعريفي التفاعلي

  This is a code bundle for البرنامج التعريفي التفاعلي. The original project is available at 
  https://shorturl.at/81X0q

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Build Android APK (fastest path)

  This project is a web (Vite + React) app. The fastest way to produce an Android APK from the same UI is to wrap the built site in a native Android shell using Capacitor.

  ### Prerequisites

  - Node.js + npm
  - Android Studio installed (includes Android SDK)
  - Java 17 (recommended for modern Android Gradle builds)

  ### Steps

  1) Install dependencies:

  - `npm i`

  2) Build the web app and sync into Android:

  - `npm run android:sync`

  3) Build an APK:

  - Option A (Android Studio): `npm run android:open` then use **Build > Build Bundle(s) / APK(s) > Build APK(s)**
  - Option B (command line debug APK): `npm run android:apk:debug`

  The debug APK is typically created at:

  - `android/app/build/outputs/apk/debug/app-debug.apk`

  ### Notes

  - If you need a signed release APK/AAB for publishing, we can add a release keystore + Gradle signing config.
  
