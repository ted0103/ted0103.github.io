import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { zoomScale, dragPosition } from './gallery-state.mjs';
import { springFrames } from './spring.mjs';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let lenis: Lenis | undefined;
function syncSmoothScroll() {
  lenis?.destroy();
  lenis = reducedMotion.matches || document.body.classList.contains('is-playground')
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

const viewport = document.querySelector<HTMLElement>('.gallery-viewport');
const canvas = document.querySelector<HTMLElement>('.gallery-canvas');
if (viewport && canvas) {
  let scale = 1;
  let pan = { x: 0, y: 0 };
  const offsets = new WeakMap<HTMLElement, {x: number; y: number}>();
  let drag: {id: number; target: HTMLElement; start: {x: number; y: number}; origin: {x: number; y: number}} | null = null;
  const zoomIn = document.querySelector<HTMLButtonElement>('[aria-label="Zoom in"]')!;
  const zoomOut = document.querySelector<HTMLButtonElement>('[aria-label="Zoom out"]')!;
  const status = document.querySelector<HTMLElement>('#zoom-status')!;
  function updateCanvas() {
    canvas!.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${scale})`;
    canvas!.dataset.scale = String(scale);
    zoomIn.disabled = scale >= 2.5;
    zoomOut.disabled = scale <= .5;
    status.textContent = `Zoom ${Math.round(scale * 100)}%`;
  }
  function zoom(direction: number) {
    scale = zoomScale(scale, direction);
    updateCanvas();
  }
  zoomIn.addEventListener('click', () => zoom(1));
  zoomOut.addEventListener('click', () => zoom(-1));
  viewport.addEventListener('pointerdown', event => {
    if (event.button !== 0 || drag) return;
    const photo = (event.target as Element).closest<HTMLElement>('.gallery-photo');
    const target = photo ?? viewport;
    target.focus({preventScroll:true});
    drag = { id:event.pointerId, target, start:{x:event.clientX,y:event.clientY}, origin:photo ? (offsets.get(photo) ?? {x:0,y:0}) : {...pan} };
    target.setPointerCapture(event.pointerId);
    if (photo) photo.style.zIndex = '20';
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const position = dragPosition(drag.origin, drag.start, {x:event.clientX,y:event.clientY}, drag.target === viewport ? 1 : scale);
    if (drag.target === viewport) {
      pan = position;
      updateCanvas();
    } else {
      offsets.set(drag.target, position);
      drag.target.style.translate = `${position.x}px ${position.y}px`;
    }
  });
  function endDrag(event: PointerEvent) {
    if (!drag || event.pointerId !== drag.id) return;
    if (drag.target.hasPointerCapture(event.pointerId)) drag.target.releasePointerCapture(event.pointerId);
    drag = null;
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', () => { drag = null; });
  viewport.addEventListener('keydown', event => {
    if (event.key === '+' || event.key === '=') { event.preventDefault(); zoom(1); return; }
    if (event.key === '-') { event.preventDefault(); zoom(-1); return; }
    if (event.key === 'Home') {
      event.preventDefault(); scale = 1; pan = {x:0,y:0};
      canvas.querySelectorAll<HTMLElement>('.gallery-photo').forEach(photo => { offsets.delete(photo); photo.style.translate = ''; });
      updateCanvas(); return;
    }
    const vectors: Record<string, [number,number]> = {ArrowLeft:[-20,0], ArrowRight:[20,0], ArrowUp:[0,-20], ArrowDown:[0,20]};
    const delta = vectors[event.key];
    if (!delta) return;
    event.preventDefault();
    const photo = (event.target as Element).closest<HTMLElement>('.gallery-photo');
    if (photo) {
      const position = offsets.get(photo) ?? {x:0,y:0};
      position.x += delta[0] / scale; position.y += delta[1] / scale;
      offsets.set(photo, position); photo.style.translate = `${position.x}px ${position.y}px`;
    } else { pan.x += delta[0]; pan.y += delta[1]; updateCanvas(); }
  });
  updateCanvas();
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
