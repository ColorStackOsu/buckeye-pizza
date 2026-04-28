export function initRevealAnimations() {
  const reveals = document.querySelectorAll(
    ".reveal, .reveal-lg, .reveal-md, .reveal-forward, .reveal-lg-forward, .reveal-left, .reveal-right, .reveal-sm-left, .reveal-sm-right"
  );

  const revealElements = function () {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 50;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  };

  window.addEventListener("scroll", revealElements);
  window.addEventListener("resize", revealElements);

  revealElements();
}
