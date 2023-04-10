export interface Geolocation {
	latitude: string;
	longitude: string;
	accuracy: number | null;
	altitude: number | null;
	altitudeAccuracy: number | null;
	simulated: boolean;
	speed: number | null;
	bearing: number | null;
	time: number | null;
	gpsStatus: string;
}

export interface GeolocationDashboard {
	latitude: string;
	longitude: string;
	gpsStatus: string;
}
