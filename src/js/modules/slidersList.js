const slidersList = () => {
	const slidersList = document.querySelectorAll(".slider-list");

	if (slidersList.length) {
		slidersList.forEach((slider) => {
			new Swiper(slider, {
				speed: 500,
				slidesPerView: 2,
				spaceBetween: 14,
				slidesPerGroup: 2,
				// slidesPerGroupSkip: 3,
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				navigation: {
					nextEl: ".slider-list__control--next",
					prevEl: ".slider-list__control--prev",
				},

				breakpoints: {
					568: {
						slidesPerView: 3,
						slidesPerGroup: 3,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 25,
						slidesPerGroup: 4,
					},
				},
			});
		});
	}
};

slidersList();
