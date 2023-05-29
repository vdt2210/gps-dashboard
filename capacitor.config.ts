import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  android: {
    useLegacyBridge: true,
  },
  appId: 'io.ionic.starter',
  appName: 'GPS Dashboard',
  webDir: 'www',
};

export default config;
