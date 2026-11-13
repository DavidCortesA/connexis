// Comportamientos globales: animaciones (Motion) y medición de clics clave.
import './motion';

// Medición: cualquier elemento con data-track="evento" envía el evento a GA4.
// Eventos usados: click_to_call, click_whatsapp, click_email, cta_click, share.
document.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
  if (!el) return;
  (window as any).cxTrack?.(el.dataset.track, {
    ubicacion: el.dataset.trackLoc || '',
    texto: (el.textContent || '').trim().slice(0, 60),
    pagina: location.pathname,
  });
});
