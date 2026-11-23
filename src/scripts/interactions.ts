import { deckMotion } from './deck-motion.mjs';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { springFrames } from './spring.mjs';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let lenis: Lenis | undefined;
function syncSmoothScroll() {
  lenis?.destroy();
  lenis = reducedMotion.matches
    ? undefined
    : new Lenis({ autoRaf: true, anchors: true, allowNestedScroll: true });
}
syncSmoothScroll();
reducedMotion.addEventListener('change', syncSmoothScroll);
if (!reducedMotion.matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in-view');
      if (entry.target instanceof HTMLElement && entry.target.hasAttribute('data-drop')) {
        const style = getComputedStyle(entry.target);
        const animation = entry.target.animate(springFrames({
          y: Number(entry.target.dataset.dropY ?? -28),
          rotate: parseFloat(style.getPropertyValue('--tilt')) || -4,
          damping: Number(entry.target.dataset.damping ?? 13),
        }), { duration: 1500, delay: (parseFloat(style.getPropertyValue('--delay')) || 0) * 1000, fill: 'both' });
        reducedMotion.addEventListener('change', event => { if (event.matches) animation.finish(); }, { once: true });
      }
      observer.unobserve(entry.target);
    }
  }, { threshold: .08 });
  document.querySelectorAll('[data-reveal], [data-drop], [data-pop], [data-letters]').forEach(element => observer.observe(element));
  reducedMotion.addEventListener('change', event => {
    if (event.matches) document.documentElement.classList.remove('motion-ready');
  });
}

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#navigation');
function closeMenu() {
  menu?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation?.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

const sections = document.querySelectorAll('.about-page section[id]');
if (sections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.querySelectorAll('.about-tabs a').forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}

document.querySelectorAll<HTMLElement>('.contact-intro, .case-image, .hero').forEach(area => {
  const heroLens = area.matches('.hero') ? area.querySelector<HTMLElement>('.invert-lens') : null;
  let dismissed = false;
  const updateLens = (event: MouseEvent) => {
    if (('pointerType' in event && event.pointerType === 'touch') || reducedMotion.matches) return;
    const box = area.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const lens = area.querySelector<HTMLElement>('.invert-lens');
    if (lens) { lens.style.left = `${x}px`; lens.style.top = `${y}px`; }
    else { area.style.setProperty('--lens-x', `${x}px`); area.style.setProperty('--lens-y', `${y}px`); }
    if (heroLens) {
      const halfWidth = heroLens.offsetWidth / 2;
      const halfHeight = heroLens.offsetHeight / 2;
      const overlaps = [...area.querySelectorAll('h1, .primary-button')].some(target => {
        const rect = target.getBoundingClientRect();
        return event.clientX + halfWidth > rect.left && event.clientX - halfWidth < rect.right
          && event.clientY + halfHeight > rect.top && event.clientY - halfHeight < rect.bottom;
      });
      heroLens.classList.toggle('is-visible', !dismissed && !overlaps);
    }
  };
  area.addEventListener('pointermove', updateLens);
  if (heroLens) {
    area.addEventListener('click', event => {
      if ((event.target as Element).closest('a, button')) return;
      dismissed = !dismissed;
      updateLens(event);
    });
    area.addEventListener('pointerleave', () => heroLens.classList.remove('is-visible'));
  }
});

// Mobile cards finish scrolling into view before they join the stack.
const decks = [...document.querySelectorAll<HTMLElement>('.project-folder')];
if (decks.length) {
  const compactDecks = matchMedia('(max-width:999px), (max-height:749px)');
  let pending = 0;
  function updateDecks() {
    pending = 0;
    const enabled = compactDecks.matches && !reducedMotion.matches;
    document.documentElement.classList.toggle('compact-decks', enabled);
    if (!enabled) return;
    const measurements = decks.map(deck => ({top:deck.getBoundingClientRect().top,height:deck.offsetHeight}));
    decks.forEach((deck, index) => {
      const motion = deckMotion(measurements[index].top, measurements[index].height, innerHeight, index);
      deck.style.setProperty('--stack-top', `${motion.stickyTop}px`);
      deck.style.setProperty('--assemble', String(motion.remaining));
    });
  }
  function scheduleDecks() { if (!pending) pending = requestAnimationFrame(updateDecks); }
  addEventListener('scroll', scheduleDecks, {passive:true});
  addEventListener('resize', scheduleDecks);
  compactDecks.addEventListener('change', scheduleDecks);
  reducedMotion.addEventListener('change', scheduleDecks);
  const deckSizes = new ResizeObserver(scheduleDecks);
  decks.forEach(deck => deckSizes.observe(deck));
  updateDecks();
}
