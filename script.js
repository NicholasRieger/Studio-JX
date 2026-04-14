const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
  });
}

const packageTriggers = document.querySelectorAll("[data-accordion-trigger]");

if (packageTriggers.length > 0) {
  packageTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (window.innerWidth >= 768) return;

      const contentId = trigger.getAttribute("data-accordion-trigger");
      const currentContent = document.getElementById(contentId);
      const currentIcon = trigger.querySelector("[data-accordion-icon]");
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      packageTriggers.forEach((otherTrigger) => {
        const otherContentId = otherTrigger.getAttribute("data-accordion-trigger");
        const otherContent = document.getElementById(otherContentId);
        const otherIcon = otherTrigger.querySelector("[data-accordion-icon]");

        if (otherContent) {
          otherContent.classList.add("hidden");
        }

        otherTrigger.setAttribute("aria-expanded", "false");

        if (otherIcon) {
          otherIcon.classList.remove("rotate-180");
        }
      });

      if (!isExpanded && currentContent) {
        currentContent.classList.remove("hidden");
        trigger.setAttribute("aria-expanded", "true");

        if (currentIcon) {
          currentIcon.classList.add("rotate-180");
        }
      }
    });
  });
}

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}