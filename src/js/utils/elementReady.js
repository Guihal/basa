async function elementReady(selector) {
	return new Promise((resolve) => {
		const observer = new MutationObserver((mutations, obs) => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector)); // Промис выполнен, элемент найден
				obs.disconnect();
			}
		});

		observer.observe(document.documentElement, { childList: true, subtree: true });
	});
}
