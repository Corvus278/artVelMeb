const adsSlider = new Swiper(".ads-slider", {
	// Optional parameters
	loop: true,

	speed: 500,

	// autoplay
	autoplay: {
		delay: 3000,
	},

	// If we need pagination
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});
