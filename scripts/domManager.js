import helper from "./helper.js";

const domManager = (() => {
	let info;
	const briefEl = document.querySelector("#brief");
	const dayForecastEl = document.querySelector("#day-forecast");
	const weekForecastEl = document.querySelector("#week-forecast");
	function renderInfo(_info) {
		info = _info;
		renderBrief();
		renderDayForecast();
		renderWeekForecast();
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
			const hourInfo = {
				hour: +currentHour + i,
				hour12format: +currentHour + i,
				day: 0
			};
			if (hourInfo.hour >= 24) {
				ending = "AM";
				hourInfo.hour -= 24;
				hourInfo.day = 1;
				if (hourInfo.hour == 0)
					hourInfo.hour12format = 12;
			} else if (hourInfo.hour >= 12) {
				ending = "PM";
				if (hourInfo.hour > 12) {
					hourInfo.hour12format = hourInfo.hour - 12;
				}
			}
			e.querySelector("h4").textContent = i == 0 ? "Now" : hourInfo.hour12format + ending;
			e.querySelector("img").src = `../icons/${info.days[hourInfo.day].hours[hourInfo.hour].icon}.svg`
			e.querySelector(".degree").textContent = info.days[hourInfo.day].hours[hourInfo.hour].temp;
		});
	}
	function renderWeekForecast() {
		weekForecastEl.querySelectorAll(".day").forEach((e, i) => {
			const dayName = i == 0 ? "Today" : helper.getDayName(helper.addDays(new Date(), i));
			e.querySelector("h4").textContent = dayName;
			e.querySelector("img").src = `../icons/${info.days[i].icon}.svg`;
			e.querySelector("p").textContent = info.days[i].temp;
		});
	}

	return {renderInfo}
})();

export default domManager;