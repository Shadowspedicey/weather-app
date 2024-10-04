const locationManager = (() => {
	const _info = {};
	async function getCurrentPosition() {
		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(async pos => {
				_info.lat = pos.coords.latitude;
				_info.long = pos.coords.longitude;
				const reverseGeo = await fetch(`https://us1.locationiq.com/v1/reverse?key=pk.428cd04206da9290f0e6d75425cc061c&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&accept-language=en`);
				const reverseGeoJson = await reverseGeo.json();
				_info.city = reverseGeoJson.address.city;
				resolve();
			});
		});
	}
	
	return {getCurrentPosition, get info() {return _info;}}
})();

export default locationManager;