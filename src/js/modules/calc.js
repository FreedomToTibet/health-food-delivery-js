function calc() {
	
	// ******  Calories Calculater  ******

	const calculateResult = document.querySelector('.calculating__result span');

	let sex, height, weight, age, ratio;

	localStorage.getItem('sex') ? sex = localStorage.getItem('sex') : (sex = 'female', localStorage.setItem('sex', 'female'));
	localStorage.getItem('ratio') ? ratio = localStorage.getItem('ratio') : (ratio = 1.375, localStorage.setItem('ratio', 1.375));

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(element => {
			element.classList.remove(activeClass);

			if (element.getAttribute('id') === localStorage.getItem('sex')) {
				element.classList.add(activeClass);
			}

			if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				element.classList.add(activeClass);
			}
		});
	}

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			calculateResult.textContent = '___';
			return;
		}

		sex === 'female' ? calculateResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio) :
			calculateResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
	}

	function getStaticCalcInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(element => {
			element.addEventListener('click', (e) => {

				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', sex);
				}

				elements.forEach(element => {
					element.classList.remove(activeClass);
				})

				e.target.classList.add(activeClass);
				calcTotal();
			});
		});
	}

	function getDynamicCalcInformation(selector) {
		const inputElement = document.querySelector(selector);

		inputElement.addEventListener('input', () => {

			inputElement.value.match(/\D/g) ? inputElement.style.border = '1px solid red' : inputElement.style.border = 'none';

			switch (inputElement.getAttribute('id')) {
				case 'height':
					height = +inputElement.value;
					break;
				case 'weight':
					weight = +inputElement.value;
					break;
				case 'age':
					age = +inputElement.value;
					break;
			}
			calcTotal();
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	calcTotal();

	getStaticCalcInformation('#gender div', 'calculating__choose-item_active');
	getStaticCalcInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	getDynamicCalcInformation('#height');
	getDynamicCalcInformation('#weight');
	getDynamicCalcInformation('#age');
}

export default calc;