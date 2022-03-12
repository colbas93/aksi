

export const hideOnShowHeader = (headerSelector) => {
	const $header = document.querySelector(headerSelector);
	const headerHeight = $header.offsetHeight;
	const pageDocument = document.documentElement;
	const pageWindow = window;
	let prevScroll = pageWindow.scrollY || pageDocument.scrollTop;
	let curScroll;
	let direction = 0;
	let prevDirection = 0;

	const toggleHeader = (direction, curScroll) => {
		if (direction === 2 && curScroll > headerHeight) {
			$header.classList.add('hide');
			prevDirection = direction;
		}
		else if (direction === 1) {
			$header.classList.remove('hide');
			prevDirection = direction;
		}
	};

	const checkScroll = () => {
		curScroll = pageWindow.scrollY || pageDocument.scrollTop;
		if (curScroll > prevScroll) {
			direction = 2;
		}
		else if (curScroll < prevScroll) {
			direction = 1;
		}
		if (direction !== prevDirection) {
			toggleHeader(direction, curScroll);
		}
		prevScroll = curScroll;
	};

	window.addEventListener('scroll', checkScroll);
}
