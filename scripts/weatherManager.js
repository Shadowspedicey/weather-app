const weatherManager = (() => {
	let today = "";
	let nextWeekDay = "";
	async function getWeatherByCity(city) {
		init();
		const weatherRes = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${today}/${nextWeekDay}?key=FSM4TCUXKS6B6ZU5A5UMM27MK&unitGroup=metric`);
		const weatherJson = await weatherRes.json();
		return weatherJson;
	}

	function init() {
		today = new Date().toJSON().slice(0, 10);
		nextWeekDay = new Date(today);
		nextWeekDay.setDate(nextWeekDay.getDate() + 7);
		nextWeekDay = nextWeekDay.toJSON().slice(0, 10);
	}

	return {getWeatherByCity}
})();

export default weatherManager;