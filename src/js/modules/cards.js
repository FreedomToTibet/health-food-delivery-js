import {getResource} from '../services/services';

function cards() {
	
	// ******  Use classes for creating the cards on our site  ********

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...cardClasses) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.cardClasses = cardClasses;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 37;
			this.exchangeToUAH();
		}

		exchangeToUAH() {
			this.price *= this.transfer;
		}

		render() {
			const cardMenu = document.createElement('div');

			if (this.cardClasses.length === 0) {
				this.cardMenu = 'menu__item';
				cardMenu.classList.add(this.cardMenu);
			} else {
				this.cardClasses.forEach(className => cardMenu.classList.add(className));
			}

			cardMenu.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Price:</div>
					<div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
				</div>`;

			this.parent.append(cardMenu);
		}
	}

	getResource('https://65eeb08f08706c584d9bf69f.mockapi.io/api/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	/* axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach( ({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}); */

}

export default cards;