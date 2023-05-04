import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'io.ionic.starter',
	appName: 'GPS Dashboard',
	webDir: 'www',
	bundledWebRuntime: false,
	android: {
		useLegacyBridge: true,
	},
};

export default config;
