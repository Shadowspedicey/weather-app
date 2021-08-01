const Weather = (() =>
{
	const LocationCurrentInfo = async _location =>
	{
		return await new Promise((resolve, reject) =>
		{
			fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${_location.coords.latitude}&lon=${_location.coords.longitude}&units=metric&appid=f49e171463b5cd51a79e76a3a37d883e`, {mode: "cors"})
				.then(response => response.json()).then(resolve, reject);
		});
	};

	return { LocationCurrentInfo };
})();

// 7 Days forecast
// https://api.openweathermap.org/data/2.5/onecall?lat=31&lon=30&exclude=current,minutely,hourly,alerts&appid=f49e171463b5cd51a79e76a3a37d883e

export default Weather;
