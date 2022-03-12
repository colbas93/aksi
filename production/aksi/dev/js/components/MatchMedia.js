export const mediaQuery = (minMaxWidth = "min", measure = 1200, callBack) => {
	const mq = window.matchMedia(`(${minMaxWidth}-width: ${measure}px)`);
	function mediaQueryChange(e) {
		if (e.matches) {
			callBack();
		}
	}
	mq.addListener(mediaQueryChange);
	mediaQueryChange(mq);
}