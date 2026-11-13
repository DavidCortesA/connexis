// Animaciones con Motion (https://motion.dev).
// 1. Entrada del hero sin tocar la opacidad del texto → no retrasa el LCP.
// 2. Apariciones al hacer scroll (revisión en cada scroll, sin depender de IntersectionObserver): bloques, tarjetas en secuencia, títulos palabra por palabra,
//    fotos con revelado tipo cortina + parallax, línea de las etiquetas, filas de tablas y footer.
// 3. Barra de progreso de lectura y respuesta táctil en botones.
// Con prefers-reduced-motion: solo desvanecidos suaves (sin desplazamientos ni parallax).
import { animate, press, scroll, stagger } from 'motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
root.classList.add('motion');
if (reduce) root.classList.add('motion-reduce');

// Dispara `fn` una vez cuando el elemento entra a la pantalla. Se revisa en cada scroll (rAF),
// así nada se queda oculto aunque el usuario baje muy rápido o salte con un ancla.
const pending = new Map<Element, () => void>();
let ticking = false;
function check() {
  ticking = false;
  const limit = window.innerHeight * 0.92;
  pending.forEach((fn, el) => {
    if (el.getBoundingClientRect().top < limit) { pending.delete(el); fn(); }
  });
}
const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
function onEnter(el: Element, fn: () => void) { pending.set(el, fn); queue(); }
window.addEventListener('scroll', queue, { passive: true });
window.addEventListener('resize', queue);
window.addEventListener('load', queue);

const inHero = (el: Element) => Boolean(el.closest('[data-hero], [data-hero-art], .cx-loader, .mbar, .cookies'));

// ---------- 1 · Hero ----------
if (!reduce) {
  const hero = document.querySelectorAll<HTMLElement>('[data-hero] > *');
  if (hero.length) animate(hero, { y: [16, 0] }, { duration: 0.9, ease: EASE, delay: stagger(0.08) });
  const art = document.querySelector<HTMLElement>('[data-hero-art]');
  if (art) animate(art, { opacity: [0, 1], scale: [0.9, 1] }, { type: 'spring', stiffness: 60, damping: 18, delay: 0.15 });
}

// ---------- 2 · Apariciones al hacer scroll ----------
// Además de los [data-reveal] marcados a mano, se agregan automáticamente estos bloques.
const AUTO = [
  'main .section-head', 'main .tldr', 'main .table-wrap', 'main .card', 'main .faq__item', 'main .step',
  'main form.lead', 'main .channel', 'main .benefits__list li', 'main .checks li', 'main .hero__proof li',
  'main .diag__contact li', 'main .prose > *', 'main .lp-final', 'main .ctaband', 'main .thanks',
  '.share-band__in', '.footer__grid > *', '.footer__bottom',
].join(',');

const marked = new Set<HTMLElement>(document.querySelectorAll<HTMLElement>('[data-reveal]'));
document.querySelectorAll<HTMLElement>(AUTO).forEach((el) => {
  if (inHero(el) || marked.has(el)) return;
  // Si un ancestro ya aparece, no duplicar la animación
  for (const m of marked) if (m.contains(el)) return;
  el.setAttribute('data-reveal', '');
  marked.add(el);
});
// Escalonado entre hermanos que aparecen juntos
marked.forEach((el) => {
  if (el.style.getPropertyValue('--i')) return;
  const sibs = Array.from(el.parentElement?.children ?? []).filter((c) => marked.has(c as HTMLElement));
  el.style.setProperty('--i', String(Math.max(0, sibs.indexOf(el))));
});

marked.forEach((el) =>
  onEnter(el, () => {
    const i = Number(el.style.getPropertyValue('--i')) || 0;
    const delay = Math.min(i, 8) * 0.07;
    const kf = reduce || el.tagName === 'TR' ? { opacity: [0, 1] } : { opacity: [0, 1], y: [28, 0] };
    const done = () => el.classList.add('is-in');
    animate(el, kf, { duration: reduce ? 0.5 : 0.8, ease: EASE, delay }).finished.then(done, done);
  }),
);

if (!reduce) {
  // Títulos H2: las palabras suben desde una máscara
  document.querySelectorAll<HTMLElement>('main h2, .footer__title').forEach((h) => {
    if (inHero(h) || h.closest('.tldr, .faq__item, form, .cookies')) return;
    splitWords(h);
    const words = h.querySelectorAll<HTMLElement>('.w__i');
    words.forEach((w) => (w.style.transform = 'translateY(105%)'));
    onEnter(h, () => {
      animate(words, { y: ['105%', '0%'] }, { duration: 0.75, ease: EASE, delay: stagger(0.045, { startDelay: 0.05 }) });
    });
  });

  // Etiquetas (eyebrow): la línea se dibuja de izquierda a derecha
  document.querySelectorAll<HTMLElement>('.eyebrow').forEach((e) => {
    if (inHero(e)) return;
    e.style.setProperty('--line', '0');
    onEnter(e, () => { animate(e, { '--line': [0, 1] } as any, { duration: 0.7, ease: EASE, delay: 0.1 }); });
  });

  // Fotos: revelado tipo cortina + ligera escala, y parallax mientras se hace scroll
  document.querySelectorAll<HTMLElement>('main .photo').forEach((p) => {
    const img = p.querySelector<HTMLElement>('img');
    if (!img) return;
    const eager = inHero(p) || p.getBoundingClientRect().top < window.innerHeight;
    if (!eager) {
      p.style.clipPath = 'inset(0 0 100% 0)';
      onEnter(p, () => {
        const clear = () => { p.style.clipPath = ''; };
        animate(p, { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] }, { duration: 1.1, ease: EASE }).finished.then(clear, clear);
        animate(img, { scale: [1.18, 1.06] }, { duration: 1.4, ease: EASE });
      });
    }
    // Parallax solo en fotos que no son enlaces (los enlaces usan zoom al pasar el cursor)
    if (!p.closest('a')) {
      img.style.scale = '1.06';
      scroll(animate(img, { y: ['-4%', '4%'] }, { ease: 'linear' }), { target: p, offset: ['start end', 'end start'] });
    }
  });

  // 3 · Respuesta táctil en botones
  press('.btn, .filter, .channel', (el) => {
    animate(el, { scale: 0.97 }, { type: 'spring', stiffness: 600, damping: 30 });
    return () => animate(el, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 20 });
  });

  // Ícono de confirmación en /gracias
  const ok = document.querySelector<HTMLElement>('[data-pop]');
  if (ok) animate(ok, { scale: [0.4, 1], rotate: [-20, 0] }, { type: 'spring', stiffness: 260, damping: 14, delay: 0.1 });
}

// Barra de progreso de lectura (solo refleja el scroll; también con reduced-motion)
const bar = document.querySelector<HTMLElement>('[data-progress]');
if (bar) scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));

/** Envuelve cada palabra en una máscara para animarla, conservando etiquetas internas (p. ej. .hl). */
function splitWords(el: HTMLElement) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(document.createTextNode(part)); return; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.className = 'w__i';
          inner.textContent = part;
          w.append(inner);
          frag.append(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as Element).matches('svg, br')) {
        walk(child);
      }
    });
  };
  walk(el);
}
