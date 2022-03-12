
/* ==============================
🟠 Mobile Menu
 ================================ */
export const mobileMenu = (() => {
	if (document.querySelector(".burger")) {
		const $burger = document.querySelector(".burger");
		const $headerMenu = document.querySelector(".header__menu");
		const $body = document.querySelector("body");
		$burger.addEventListener("click", (e) => {
			$burger.classList.toggle("is-open");
			$headerMenu.classList.toggle("is-open");
			$body.classList.toggle("lock");
		});
	}
})();
