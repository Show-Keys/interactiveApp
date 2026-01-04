import fs from 'node:fs';

function chmodIfExists(path, mode) {
  try {
    fs.chmodSync(path, mode);
  } catch (e) {
    // Ignore: Windows, missing files, or restricted FS.
  }
}

// Appflow runners are typically Linux. If executable bits get lost for any reason,
// `npx cap ...` (or fastlane steps that call `cap`) can fail with command-not-found.
// Ensuring +x on the Capacitor CLI entrypoint and its .bin shim keeps builds resilient.
if (process.platform !== 'win32') {
  chmodIfExists('node_modules/@capacitor/cli/bin/capacitor', 0o755);
  chmodIfExists('node_modules/.bin/capacitor', 0o755);
  chmodIfExists('node_modules/.bin/cap', 0o755);
}
