// import { reset } from 'browser-sync';
import Choices from 'choices.js';
import Swiper from 'swiper/bundle';

import "../js/components/Menu";
import "../js/components/range-slider";

/* ==============================
Скрыть header при скролле
 ================================ */

let lastScroll = 0;
const defaultOffset = 80;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
	// скролл вниз
	if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
		header.classList.add('hide');
	}
	// скролл вверх
	else if(scrollPosition() < lastScroll && containHide()) {
		header.classList.remove('hide');
	}

	lastScroll = scrollPosition();
});

/* ==============================
Swiper слайдер
- Services slider
- Team slider
- Project slider
- Range slider
 ================================ */
// Services slider
if(document.querySelector(".services__slider")) {
	const slider = document.querySelector(".services__slider");


	let servicesSwiper;

	function mobileSlider() {	
		if (window.innerWidth <= 782 && slider.dataset.mobile == "false") {
			servicesSwiper = new Swiper(slider, {
				slidesPerView: 1,
				spaceBetween: 10,
				loop: true,
				slideClass: "swiper-slide",
				breakpoints: {
					320: { 
						slidesPerView: 1.13,
						spaceBetween: 10,
					},
					568: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
				},
				// Подключение пагинации
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
				},
			});

			slider.dataset.mobile = "true";
		}

		if (window.innerWidth > 782) {
			slider.dataset.mobile = "false";

			if (slider.classList.contains("swiper-container-initialized")) {
				servicesSwiper.destroy();
			}
		}
	}

	mobileSlider();

	window.addEventListener("resize", () => {
		mobileSlider();
	});
};


// Team slider
if(document.querySelector(".team__slider")) {
	new Swiper('.team__slider', {
		navigation: {
			nextEl: '.team__button-next',
			prevEl: '.team__button-prev'
		},
		grabCursor: true,
		loop: true,
		// centeredSlides: true,
		breakpoints: {
			320: { 
				slidesPerView: 1.6,
				spaceBetween: 50,
				centeredSlides: true,
			},
			568: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			1024: {
				slidesPerView: 4,
			},
		},
	});
};

// Project slider
if(document.querySelector(".projects__slider")) {
	new Swiper('.projects__slider', {
		navigation: {
			nextEl: '.projects__button-next',
			prevEl: '.projects__button-prev'
		},
		grabCursor: true,
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 34,
			},
		},
	});
};

/* ==============================
Работа калькулятора
 ================================ */
// Calculator
if(document.querySelector(".price-sliders")) {
	const slideValue = document.querySelector(".price-slider__value");
	const inputSlider = document.querySelector(".price-slider__range");
	const slideCloud = document.querySelector(".price-slider__cloud");
	const totalPrice = document.querySelector('.price-sliders__total-number');
	let priceService = 300;

	// Меняем число в облаке
	inputSlider.oninput = (()=> {
		let value = inputSlider.value;
		slideValue.textContent = value;
		totalPrice.textContent = value * priceService;
		slideCloud.style.left = value + "%";
		slideCloud.classList.add("show");
	});
	// Прячем облако при потере фокуса
	inputSlider.onblur = (()=> {
		slideCloud.classList.remove("show");
	});
	// Красим полоску при перемещении ползунка
	inputSlider.addEventListener("mousemove", ()=>{
		let x = inputSlider.value;
		let color = 'linear-gradient(90deg, rgb(32, 160, 201)' + x + '%, rgb(218, 221, 224)' + x + '%)';
		inputSlider.style.background = color;
	});
};
	
	/* ==============================
	Select с помощью choices
	================================ */
	
if(document.querySelector('.choices-menu')) {
	const defaultSelect = () => {
		const element = document.querySelector('.choices-menu');
		const choices = new Choices(element, {
			searchEnabled: false,
		});
	};

	defaultSelect();
};
