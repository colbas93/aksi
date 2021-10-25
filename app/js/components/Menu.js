
/* ==============================
🟠 Mobile Menu
 ================================ */
export const mobileMenu = (() => {
	if (document.querySelector(".burger")) {
		const $burger = document.querySelector(".burger");
		const $headerMenu = document.querySelector(".header__menu");
		$burger.addEventListener("click", (e) => {
			$burger.classList.toggle("is-open");
			$headerMenu.classList.toggle("is-open");
		});
	}
})();
