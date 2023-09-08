import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  android: {
    useLegacyBridge: true,
  },
  appId: 'com.vdt.gpsdashboard',
  appName: 'GPS Dashboard',
  webDir: 'www',
};

export default config;
