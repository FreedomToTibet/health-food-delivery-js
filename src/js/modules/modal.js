function openModalWindow(modalSelector, modalTimerStart) {
	const modal = document.querySelector(modalSelector);
	const scrollWidth = calculateScroll();

	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.marginRight = `${scrollWidth}px`;
	document.body.style.overflow = 'hidden';

	if(modalTimerStart) {
		clearInterval(modalTimerStart);
	}

	function calculateScroll() {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }
	
}

function closeModalWindow(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
	document.body.style.marginRight = `0px`;
	document.querySelector('.modal__dialog').classList.add('show');
	document.querySelector('.modal__dialog').classList.remove('hide');
}

function modal(triggerSelector, modalSelector, modalTimerStart) {
	
	// **********  Modal  ************

	const modalTrigger = document.querySelectorAll(triggerSelector),
				modal = document.querySelector(modalSelector);

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModalWindow(modalSelector, modalTimerStart));
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModalWindow(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code == 'Escape' && modal.classList.containe('show')) closeModalWindow(modalSelector);
	});

	

	// function showModalByScroll() {
	// 	if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
	// 		openModalWindow(modalSelector, modalTimerStart, modalTimerStart);
	// 		window.removeEventListener('scroll', showModalByScroll);
	// 	}
	// }
	// window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModalWindow};
export {openModalWindow};