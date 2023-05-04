const AppConstant = Object.freeze({
	storageKeys: {
		avgSpeedTotalDistance: 'avgSpeedTotalDistance',
		avgSpeedTotalTime: 'avgSpeedTotalTime',
		language: 'language',
		speedCorrection: 'speedCorrection',
		topSpeed: 'topSpeed',
		totalDistance: 'totalDistance',
		totalTime: 'totalTime',
		tripDistance: 'tripDistance',
		unit: 'unit',
	},

	// backUpKeys: [
	// 	"totalDistance",
	// 	"tripDistance",
	// 	"avgSpeedTotalDistance",
	// 	"totalTime",
	// 	"avgSpeedTotalTime",
	// 	"topSpeed",
	// ],

	unit: {
		metric: {
			value: 'metric',
			speedUnit: 'km/h',
			distanceUnit: 'km',
			lengthUnit: 'm',
		},
		imperial: {
			value: 'imperial',
			speedUnit: 'mph',
			distanceUnit: 'mi',
			lengthUnit: 'ft',
		},
	},

	languages: {
		en: { name: 'English', value: 'en' },
		vi: { name: 'Tiếng Việt', value: 'vi' },
	},

	inputType: {
		text: 'text',
		number: 'number',
		email: 'email',
		password: 'password',
	},

	buttonType: {
		button: 'button',
		submit: 'submit',
		reset: 'reset',
	},

	buttonExpand: {
		block: 'block',
		full: 'full',
	},

	fill: {
		clear: 'clear',
		default: 'default',
		outline: 'outline',
		solid: 'solid',
	},

	color: {
		danger: 'danger',
		dark: 'dark',
		light: 'light',
		medium: 'medium',
		primary: 'primary',
		secondary: 'secondary',
		success: 'success',
		tertiary: 'tertiary',
		warning: 'warning',
	},
});

export default AppConstant;
