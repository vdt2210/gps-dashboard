const AppConstant = Object.freeze({
	storageKeys: {
		unit: "unit",
		odo: "odo",
		trip: "trip",
		averageSpeedTrip: "averageSpeedTrip",
		language: "language",
		totalTime: "totalTime",
		averageSpeedTotalTime: "averageSpeedTotalTime",
		topSpeed: "topSpeed",
		speedCorrection: "speedCorrection",
	},

	backUpKeys: [
		"odo",
		"trip",
		"averageSpeedTrip",
		"totalTime",
		"averageSpeedTotalTime",
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
