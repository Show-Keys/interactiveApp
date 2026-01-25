import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.thahertech.interactiveapp',
  appName: 'البرنامج التعريفي التفاعلي',
  webDir: 'build',
};

// Live Reload (optional)
//
// By default we ship bundled web assets from `webDir`.
// To enable Live Reload on Android emulator, set:
//   CAP_LIVE_RELOAD_URL=http://10.0.2.2:3000
// then run `npx cap sync android` and `npx cap run android`.
const liveReloadUrl = process.env.CAP_LIVE_RELOAD_URL;
if (liveReloadUrl) {
  config.server = {
    url: liveReloadUrl,
    cleartext: true,
  };
}

export default config;
