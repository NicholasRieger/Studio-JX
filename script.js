// Menu mobile
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
  });

  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Acordeão dos pacotes no mobile
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
        const otherContentId = otherTrigger.getAttribute(
          "data-accordion-trigger",
        );
        const otherContent = document.getElementById(otherContentId);
        const otherIcon = otherTrigger.querySelector("[data-accordion-icon]");

        if (otherContent) {
          otherContent.classList.add("hidden");
          otherContent.classList.remove("flex");
        }

        otherTrigger.setAttribute("aria-expanded", "false");

        if (otherIcon) {
          otherIcon.classList.remove("rotate-180");
        }
      });

      if (!isExpanded && currentContent) {
        currentContent.classList.remove("hidden");
        currentContent.classList.add("flex");
        trigger.setAttribute("aria-expanded", "true");

        if (currentIcon) {
          currentIcon.classList.add("rotate-180");
        }
      }
    });
  });
}

// Ano atual no rodapé
const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Carrossel de avaliações
const reviews = [
  {
    author: "Bianca P.",
    text: "Gostaria de expressar minha profunda gratidão pelo atendimento excepcional da Julia. Ela é uma profissional verdadeiramente incrível, demonstrando uma atenção aos detalhes que vai além do comum.",
  },
  {
    author: "Nicholas R.",
    text: "Nota 1000. Explica cada ação que está sendo feito, deixando a gente bem seguro sobre a qualidade e o que está sendo feito na nossa pele.",
  },
  {
    author: "Micaela P.",
    text: "Profissional super atenciosa, com cuidado nos mínimos detalhes. Studio super aconchegante. Recomendo demais!",
  },
  {
    author: "Aline R.",
    text: "Amei minha limpeza de pele, vou voltar!",
  },
  {
    author: "Simone B.",
    text: "A Júlia é uma excelente profissional. Atenciosa e dá dicas valiosas!",
  },
  {
    author: "Tania R.",
    text: "Profissional dedicada, delicada e competente. Uma experiência magnífica. O local extremamente agradável.",
  },
  {
    author: "Nilva F.",
    text: "O que dizer da Júlia, excelente profissional, muito técnica, cuidadosa nos procedimentos, paciente, explica tudo com detalhes, faço sobrancelha e microagulhamento, os resultados são incríveis, super recomendo.",
  },
  {
    author: "Micaela P.",
    text: "Profissional extremamente atenciosa e cuidadosa, sempre explica os procedimentos do início ao fim! Ambiente muito bonito e limpo.",
  },
  {
    author: "Bia A.",
    text: "Excelente designer de sobrancelha! Recomendo!",
  },
];

const reviewsTrack = document.querySelector("#reviews-track");
const prevReviewButton = document.querySelector("#reviews-prev");
const nextReviewButton = document.querySelector("#reviews-next");

const reviewsPerSlide = 3;
let currentReviewSlide = 1;
let isReviewTransitioning = false;

prevReviewButton?.classList.add("cursor-pointer");
nextReviewButton?.classList.add("cursor-pointer");

function isDesktopReviewCarousel() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function createReviewCard(review) {
  return `
    <article class="flex min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl bg-[#f5f5f5] p-6 text-left shadow-sm">
      <p class="text-sm italic leading-6">"${review.text}"</p>
      <p class="mt-4 italic">- ${review.author}</p>
    </article>
  `;
}

function splitReviewsIntoSlides(items) {
  const slides = [];

  for (let i = 0; i < items.length; i += reviewsPerSlide) {
    slides.push(items.slice(i, i + reviewsPerSlide));
  }

  return slides;
}

function createReviewSlide(slideReviews) {
  return `
    <div class="min-w-full">
      <div class="grid gap-6 md:grid-cols-3 md:gap-14">
        ${slideReviews.map(createReviewCard).join("")}
      </div>
    </div>
  `;
}

function updateReviewCarousel(withAnimation = true) {
  if (!reviewsTrack) return;

  const shouldAnimate = withAnimation && isDesktopReviewCarousel();

  reviewsTrack.style.transition = shouldAnimate
    ? "transform 500ms ease-in-out"
    : "none";

  reviewsTrack.style.transform = `translateX(-${currentReviewSlide * 100}%)`;
}

function resetInfiniteReviewCarouselIfNeeded() {
  const originalSlides = splitReviewsIntoSlides(reviews);

  if (currentReviewSlide === originalSlides.length + 1) {
    currentReviewSlide = 1;
    updateReviewCarousel(false);
  }

  if (currentReviewSlide === 0) {
    currentReviewSlide = originalSlides.length;
    updateReviewCarousel(false);
  }

  isReviewTransitioning = false;
}

function setupReviewCarousel() {
  if (!reviewsTrack) return;

  const originalSlides = splitReviewsIntoSlides(reviews);

  if (originalSlides.length === 0) return;

  const firstSlideClone = originalSlides[0];
  const lastSlideClone = originalSlides[originalSlides.length - 1];

  const infiniteSlides = [lastSlideClone, ...originalSlides, firstSlideClone];

  reviewsTrack.innerHTML = infiniteSlides.map(createReviewSlide).join("");

  updateReviewCarousel(false);
}

nextReviewButton?.addEventListener("click", () => {
  if (isReviewTransitioning) return;

  isReviewTransitioning = true;
  currentReviewSlide++;
  updateReviewCarousel();

  if (!isDesktopReviewCarousel()) {
    resetInfiniteReviewCarouselIfNeeded();
  }
});

prevReviewButton?.addEventListener("click", () => {
  if (isReviewTransitioning) return;

  isReviewTransitioning = true;
  currentReviewSlide--;
  updateReviewCarousel();

  if (!isDesktopReviewCarousel()) {
    resetInfiniteReviewCarouselIfNeeded();
  }
});

reviewsTrack?.addEventListener("transitionend", () => {
  resetInfiniteReviewCarouselIfNeeded();
});

window.addEventListener("resize", () => {
  updateReviewCarousel(false);
});

setupReviewCarousel();