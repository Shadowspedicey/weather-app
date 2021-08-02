import "regenerator-runtime/runtime";
import { fromUnixTime, format } from "date-fns";
import fitText from "./fit-text.js";
import Weather from "./weather.js";

const Getter = (() =>
{
	const GetLocation = () => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));

	const GetCurrentWeather = async () =>
	{
		let userLocation;
		try
		{
			userLocation = await GetLocation();
		} catch (err)
		{
			if (err.message === "User denied Geolocation")
			{
				return GetCityByInput();
			}
		}
		return Weather.LocationCurrentInfoCoords(userLocation);
	};

	const GetForecast = async () =>
	{
		let userLocation;
		try
		{
			userLocation = await GetLocation();
		} catch (err)
		{
			if (err.message === "User denied Geolocation") return null;
		}
		return Weather.LocationForecastInfoCoords(userLocation);
	};

	async function GetCityByInput()
	{
		const input = prompt("What location do you want to see then?");
		const weather = await Weather.LocationCurrentInfoName(input);
		if (weather.message) return GetCityByInput();
		else return weather;
	}

	return { GetCurrentWeather, GetForecast };
})();

const Interface = (() =>
{
	const DisplayWeather = async () =>
	{
		const currentWeather = await Getter.GetCurrentWeather();
		let forecast = await Getter.GetForecast();
		if (forecast == null) 
			forecast = await Weather.LocationForecastInfoCoords({"coords": {"latitude": currentWeather.coord.lat, "longitude": currentWeather.coord.lon}});

		DisplayCurrentWeather(currentWeather);
		DisplayForecast(forecast);
	};

	const DisplayCurrentWeather = async (currentWeather) =>
	{
		const city = document.querySelector("#city");
		const currentIcon = document.querySelector("#current-temp .weather-icon img");
		const currentTemp = document.querySelector("#current-temp .temp");
		const currentWind = document.querySelector("#current-wind .wind");
		const currentHumidity = document.querySelector("#current-humidity .humidity");
	
		console.log(currentWeather);
		if (currentWeather == null) return;

		city.textContent = currentWeather.name;
		fitText(10, city.parentElement, city);

		currentIcon.src = `./weather-icons/${currentWeather.weather[0].icon}.png`;
		currentTemp.textContent = Math.round(currentWeather.main.temp);

		currentWind.textContent = Math.round(currentWeather.wind.speed * 3.6);

		currentHumidity.textContent = currentWeather.main.humidity;
	};

	const DisplayForecast = async (forecast) =>
	{
		const daysDOM = document.querySelectorAll(".day-column");
		for (let i = 0; i < daysDOM.length; i++)
		{
			let dayName = daysDOM[i].querySelector(".day");
			if (dayName.id === "d0") dayName.textContent = "Today";
			else dayName.textContent = format(fromUnixTime(forecast.daily[i].dt), "EEEE");
			fitText(5, dayName.parentElement.parentElement, dayName);

			daysDOM[i].querySelector(".day-status").textContent = forecast.daily[i].weather[0].main;

			daysDOM[i].querySelector("img").src = `./weather-icons/${forecast.daily[i].weather[0].icon}.png`;

			daysDOM[i].querySelector(".min").textContent = Math.round(forecast.daily[i].temp.min);
			daysDOM[i].querySelector(".max").textContent = Math.round(forecast.daily[i].temp.max);
		}
	};
	
	return { DisplayWeather };
})();

Interface.DisplayWeather();
