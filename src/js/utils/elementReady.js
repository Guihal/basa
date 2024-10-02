export async function elementReady(selector, parent = false) {
	let block = document.querySelector(selector);

	if (block) {
		resolve(block);
		return;
	}

	return new Promise((resolve) => {
		const observer = new MutationObserver((mutations, obs) => {
			block = parent ? parent.querySelector(selector) : document.querySelector(selector);

			if (block) {
				resolve(block);
				obs.disconnect();
			}
		});

		observer.observe(parent ? parent : document.documentElement, { childList: true, subtree: true });
	});
}
