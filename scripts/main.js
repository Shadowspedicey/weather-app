import locationManager from "./locationManager.js";
import weatherManager from "./weatherManager.js";
import domManager from "./domManager.js";

await locationManager.getCurrentPosition();
const info = await weatherManager.getWeatherByCity(locationManager.info.city);
domManager.renderInfo(info);


