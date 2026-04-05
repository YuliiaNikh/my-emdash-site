const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			const el = entry.target as HTMLElement;
			const delay = parseInt(el.dataset.revealDelay || "0", 10);
			setTimeout(() => el.classList.add("is-visible"), delay);
			observer.unobserve(el);
		});
	},
	{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((el) => observer.observe(el));

function animateCountUp(el: HTMLElement) {
	const target = parseInt(el.dataset.countUp || "0", 10);
	if (!target) return;
	const duration = 1800;
	const start = performance.now();

	function tick(now: number) {
		const elapsed = now - start;
		const progress = Math.min(elapsed / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3);
		const current = Math.round(eased * target);
		el.textContent = current.toLocaleString("en-US");
		if (progress < 1) requestAnimationFrame(tick);
	}

	requestAnimationFrame(tick);
}

const counters = document.querySelectorAll<HTMLElement>("[data-count-up]");
const counterObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			const el = entry.target as HTMLElement;
			const delay = parseInt(
				(el.closest("[data-reveal]") as HTMLElement)?.dataset
					.revealDelay || "0",
				10
			);
			setTimeout(() => animateCountUp(el), delay + 200);
			counterObserver.unobserve(el);
		});
	},
	{ threshold: 0.5 }
);

counters.forEach((el) => counterObserver.observe(el));
