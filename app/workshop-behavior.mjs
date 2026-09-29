export function nextMenuState(currentOpen, action) {
  if (action === 'toggle') return !currentOpen;
  if (action === 'close') return false;
  throw new Error(`Unknown menu action: ${action}`);
}

export function shouldAnimate(prefersReducedMotion) {
  return !prefersReducedMotion;
}

export function initRevealEffects() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = [...document.querySelectorAll('[data-reveal]')];

  if (!shouldAnimate(reducedMotion) || typeof IntersectionObserver === 'undefined') {
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
  );

  targets.forEach((target) => observer.observe(target));
}
