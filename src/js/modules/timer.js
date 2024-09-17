function timer(idTimer, deadline) {

	// **********  Timer  ************

	function getTimeRemaining(endtime) {

		// const tempTime = Date.parse(endtime) - Date.parse(new Date());

		const tempTime = endtime - Date.parse(new Date()),
			days = Math.floor(tempTime / (1000 * 60 * 60 * 24)),
			hours = Math.floor((tempTime / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((tempTime / 1000 / 60) % 60),
			seconds = Math.floor((tempTime / 1000) % 60);


		return {
			'common': tempTime,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}

	function addZero(num) {
		return `${num}`.padStart(2, 0);
	}

	function setClock(selector, endtime) {

		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {

			const t = getTimeRemaining(endtime);

			days.innerHTML = addZero(t.days);
			hours.innerHTML = addZero(t.hours);
			minutes.innerHTML = addZero(t.minutes);
			seconds.innerHTML = addZero(t.seconds);

			if (t.common <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(idTimer, deadline);
}

export default timer;