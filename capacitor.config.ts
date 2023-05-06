import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  android: {
    useLegacyBridge: true,
  },
  appId: 'io.ionic.starter',
  appName: 'GPS Dashboard',
  bundledWebRuntime: false,
  webDir: 'www',
};

export default config;
