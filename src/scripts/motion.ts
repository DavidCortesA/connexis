// Animaciones con Motion (https://motion.dev). Pocas y con propósito:
// 1. Entrada del hero (titular y CTA) sin tocar la opacidad del texto → no retrasa el LCP.
// 2. Revelado al hacer scroll con escalonado por tarjeta (atributo data-reveal + --i).
// 3. Barra de progreso de lectura y respuesta táctil en botones.
// Con prefers-reduced-motion todo queda estático y visible.
import { animate, inView, press, scroll, stagger } from 'motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveal = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (reduce) {
  reveal.forEach((el) => el.classList.add('is-in'));
} else {
  document.documentElement.classList.add('motion');

  // 1 · Hero
  const hero = document.querySelectorAll<HTMLElement>('[data-hero] > *');
  if (hero.length) animate(hero, { y: [16, 0] }, { duration: 0.9, ease: EASE, delay: stagger(0.08) });
  const radar = document.querySelector<HTMLElement>('[data-hero-art]');
  if (radar) animate(radar, { opacity: [0, 1], scale: [0.92, 1] }, { type: 'spring', stiffness: 60, damping: 18, delay: 0.15 });

  // 2 · Revelado al hacer scroll (una sola vez por elemento)
  inView(
    reveal,
    (el) => {
      const i = Number((el as HTMLElement).style.getPropertyValue('--i')) || 0;
      animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.8, ease: EASE, delay: i * 0.07 }).finished.then(() =>
        el.classList.add('is-in'),
      );
    },
    { margin: '0px 0px -10% 0px', amount: 0.05 },
  );

  // 3 · Respuesta táctil en botones
  press('.btn, .filter', (el) => {
    animate(el, { scale: 0.97 }, { type: 'spring', stiffness: 600, damping: 30 });
    return () => animate(el, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 20 });
  });

  // Ícono de confirmación en /gracias
  const ok = document.querySelector<HTMLElement>('[data-pop]');
  if (ok) animate(ok, { scale: [0.4, 1], rotate: [-20, 0] }, { type: 'spring', stiffness: 260, damping: 14, delay: 0.1 });
}

// Barra de progreso de lectura (también útil con reduced-motion: solo refleja el scroll)
const bar = document.querySelector<HTMLElement>('[data-progress]');
if (bar) scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));
