const AppConstant = Object.freeze({
	storageKeys: {
		unit: "unit",
		odo: "odo",
		trip: "trip",
		avgSpeedTotalDistance: "avgSpeedTotalDistance",
		language: "language",
		totalTime: "totalTime",
		avgSpeedTotalTime: "avgSpeedTotalTime",
		topSpeed: "topSpeed",
		speedCorrection: "speedCorrection",
	},

	backUpKeys: [
		"odo",
		"trip",
		"avgSpeedTotalDistance",
		"totalTime",
		"avgSpeedTotalTime",
		"topSpeed",
	],

	unitSystem: {
		metric: {
			label: "metric",
			speedUnit: "km/h",
			meterUnit: "m",
			kilometerUnit: "km",
		},
		imperial: {
			label: "imperial",
			speedUnit: "mph",
			feetUnit: "ft",
			mileUnit: "mi",
		},
	},

	languages: {
		vi: "vi",
		en: "en",
	},
});

export default AppConstant;
