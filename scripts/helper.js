const helper = (() => {
	function getDayName(dateObj) {
    	return dateObj.toLocaleDateString("en-us", { weekday: 'long' });        
	}
	function addDays(date, nOfDays) {
		date.setDate(date.getDate() + nOfDays);
		return date;
	}

	return {getDayName, addDays}
})();

export default helper;