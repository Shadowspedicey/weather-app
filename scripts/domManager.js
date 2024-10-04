const domManager = (() => {
	let info;
	const briefEl = document.querySelector("#brief");
	const dayForecastEl = document.querySelector("#day-forecast");
	function renderInfo(_info) {
		info = _info;
		renderBrief();
		renderDayForecast();
	}

	function renderBrief() {
		briefEl.querySelector("h2").textContent = info.address;
		briefEl.querySelector(".degree").textContent = info.days[0].temp;
		briefEl.querySelector("p").textContent = info.days[0].conditions;
	}
	function renderDayForecast() {
		dayForecastEl.querySelector("h3").textContent = info.days[0].description;

		const currentHour = new Date().toTimeString().slice(0, 2);
		const timetable = dayForecastEl.querySelector(".timetable");
		timetable.querySelectorAll(".hour").forEach((e, i) => {
			let ending = "AM";
			let hour = +currentHour + i;
			e.querySelector(".degree").textContent = info.days[0].hours[hour].temp;
			if (hour >= 12) {
				ending = "PM";
				if (hour > 12) {
					hour -= 12;
				}
			} else if (hour >= 24) {
				ending = "AM";
				hour -= 24;
				if (hour == 0)
					hour = 12;
			}
			e.querySelector("h4").textContent = hour + ending;
		});
	}

	return {renderInfo}
})();

export default domManager;