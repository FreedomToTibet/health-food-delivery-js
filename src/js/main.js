"use strict"

import tabs 	from './modules/tabs';
import modal 	from './modules/modal';
import timer 	from './modules/timer';
import cards 	from './modules/cards';
import calc 	from './modules/calc';
import forms 	from './modules/forms';
import slider from './modules/slider';
import {openModalWindow} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

	const modalTimerStart = setTimeout(() => openModalWindow('.modal', modalTimerStart), 3000000);
	
	const date = '2023-10-22';
	let endDate = Date.parse(date);
	if (Date.parse(date) - Date.parse(new Date()) <= 0) {
		endDate = Date.parse(new Date()) + 604800000;
	};

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerStart);
	// // timer('.timer', date);
	timer('.timer', endDate);
	cards();
	calc();
	forms('form', modalTimerStart);
	slider({
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		slide: '.offer__slide',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
});