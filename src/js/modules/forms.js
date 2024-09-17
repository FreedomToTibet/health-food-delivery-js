import {closeModalWindow, openModalWindow} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerStart) {
	
	// ******  Forms sending  ******

	const forms = document.querySelectorAll(formSelector),
		message = {
			loading: './assets/img/form/spinner.svg',
			success: 'We will request you soon!',
			failure: 'Something wrong...'
		};

	forms.forEach(item => {
		bindPostData(item);
	});

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img'); // spiner 
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
display: block;
margin: 15px auto 0;
`;
			form.insertAdjacentElement('afterend', statusMessage)

			const formData = new FormData(form);

			/* const object = {};
			formData.forEach(function(value, key) {
			object[key] = value;
			}) */

			const formJson = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('https://65eeb08f08706c584d9bf69f.mockapi.io/api/requests', formJson)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		})
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModalWindow('.modal', modalTimerStart);

		const thanksModal = document.createElement('div');

		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
<div class="modal__content">
<div class="modal__title">${message}</div>
</div>
`;

		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModalWindow('.modal');
		}, 1500);
	}
}

export default forms;