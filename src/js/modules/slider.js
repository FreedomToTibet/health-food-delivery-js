function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

	// ******  Slider  ******

	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		next = document.querySelector(nextArrow),
		prev = document.querySelector(prevArrow),
		numberAllSlides = document.querySelector(totalCounter),
		currentNumberSlide = document.querySelector(currentCounter),
		slidesWrapper = document.querySelector(wrapper),
		slidesField = document.querySelector(field),
		widthSlider = window.getComputedStyle(slidesWrapper).width,
		indicators = document.createElement('ol'),
		dots = [];

	let slideIndex = 1,
			slideOffset = 0;

	function deleteNotDigits(str) {return Math.trunc(+str.replace(/[^\d.]/g, ""));};

	function sliderDots(dots, index) {

		dots.forEach(dot => dot.style.opacity = ".5");
		dots[index - 1].style.opacity = '1';
	}

	numberAllSlides.textContent = `${slides.length}`.padStart(2, 0);

	currentNumberSlide.textContent = `${slideIndex}`.padStart(2, 0);

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = widthSlider;
	});

	slider.style.position = 'relative';
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');

		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	next.addEventListener('click', () => {
		if (slideOffset == deleteNotDigits(widthSlider) * (slides.length - 1)) {
			slideOffset = 0;
		} else {
			slideOffset += deleteNotDigits(widthSlider);
		}

		slidesField.style.transform = `translateX(-${slideOffset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		currentNumberSlide.textContent = `${slideIndex}`.padStart(2, 0);

		sliderDots(dots, slideIndex);

	});

	prev.addEventListener('click', () => {
		if (slideOffset == 0) {
			slideOffset = deleteNotDigits(widthSlider) * (slides.length - 1);
		} else {
			slideOffset -= deleteNotDigits(widthSlider);
		}

		slidesField.style.transform = `translateX(-${slideOffset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		currentNumberSlide.textContent = `${slideIndex}`.padStart(2, 0);

		sliderDots(dots, slideIndex);

	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;

			slideOffset = deleteNotDigits(widthSlider) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${slideOffset}px)`;

			currentNumberSlide.textContent = `${slideIndex}`.padStart(2, 0);

			sliderDots(dots, slideIndex);
		});
	});
}

export default slider;