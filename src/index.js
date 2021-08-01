import "regenerator-runtime/runtime";
import fitText from "./fit-text.js";
import Weather from "./weather.js";

const Getter = (() =>
{
	const GetLocation = () => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));

	const GetWeather = async () =>
	{
		let userLocation;
		try
		{
			userLocation = await GetLocation();
		} catch (err)
		{
			if (err.message === "User denied Geolocation") return alert("Whatever, cunt");
		}
		return Weather.LocationCurrentInfo(userLocation);
	};

	return { GetWeather };
})();

const Interface = (() =>
{
	const city = document.querySelector("#city");
	const currentIcon = document.querySelector("#current-temp .weather-icon img");
	const currentTemp = document.querySelector("#current-temp .temp");
	const currentWind = document.querySelector("#current-wind .wind");
	const currentHumidity = document.querySelector("#current-humidity .humidity");

	const DisplayCurrentWeather = async () =>
	{
		const currentWeather = await Getter.GetWeather();
		console.log(currentWeather);

		city.textContent = currentWeather.name;
		fitText(10, city.parentElement, city);

		currentIcon.src = `./weather-icons/${currentWeather.weather[0].icon}.png`;
		currentTemp.textContent = Math.round(currentWeather.main.temp);

		currentWind.textContent = Math.round(currentWeather.wind.speed * 3.6);

		currentHumidity.textContent = currentWeather.main.humidity;
	};
	
	return { DisplayCurrentWeather };
})();

Interface.DisplayCurrentWeather();
