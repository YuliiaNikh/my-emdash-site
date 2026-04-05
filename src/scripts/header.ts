const openBtn = document.getElementById("hamburger-open");
const closeBtn = document.getElementById("hamburger-close");
const menu = document.getElementById("mobile-menu");

function openMenu() {
	menu?.classList.add("is-open");
	menu?.setAttribute("aria-hidden", "false");
	document.body.style.overflow = "hidden";
}

function closeMenu() {
	menu?.classList.remove("is-open");
	menu?.setAttribute("aria-hidden", "true");
	document.body.style.overflow = "";
}

openBtn?.addEventListener("click", openMenu);
closeBtn?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") closeMenu();
});
