// Validación y envío de formularios de prospectos.

type Check = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => string;

const messages: Record<string, Check> = {
  nombre: (el) => (el.value.trim().length < 2 ? 'Escriba su nombre.' : ''),
  empresa: (el) => (el.value.trim().length < 2 ? 'Escriba el nombre de su empresa.' : ''),
  correo: (el) => {
    const v = el.value.trim();
    if (!v) return 'Escriba su correo.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Revise el correo, parece incompleto (ejemplo: nombre@empresa.com).';
  },
  telefono: (el) => {
    const digits = el.value.replace(/\D/g, '');
    if (!digits) return 'Escriba un teléfono de contacto.';
    if (digits.length !== 10) return `El teléfono debe tener 10 dígitos (lleva ${digits.length}).`;
    if (/^[01]/.test(digits)) return 'Revise el número: en México los teléfonos no empiezan con 0 ni con 1.';
    if (/^(\d)\1{9}$/.test(digits)) return 'Revise el número, parece incompleto o de prueba.';
    return '';
  },
};

function setError(form: HTMLFormElement, el: HTMLElement, msg: string) {
  const errId = `${el.id}-err`;
  const err = form.querySelector<HTMLElement>(`#${CSS.escape(errId)}`);
  if (err) err.textContent = msg;
  if (msg) el.setAttribute('aria-invalid', 'true');
  else el.removeAttribute('aria-invalid');
}

function validate(form: HTMLFormElement) {
  const errors: { el: HTMLElement; msg: string }[] = [];
  for (const [name, check] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as HTMLInputElement | null;
    if (!el || el.type === 'hidden') continue;
    const msg = check(el);
    setError(form, el, msg);
    if (msg) errors.push({ el, msg });
  }
  return errors;
}

async function send(form: HTMLFormElement) {
  const data = new FormData(form);
  const endpoint = form.dataset.endpoint;
  if (endpoint) {
    const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return;
  }
  // Netlify Forms
  const body = new URLSearchParams(data as unknown as Record<string, string>).toString();
  const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

/** Deja solo dígitos (máx. 10), quita la lada +52 si la pegan y formatea como 81 1234 5678. */
export function formatPhone(value: string) {
  let d = value.replace(/\D/g, '');
  if (d.length > 10 && d.startsWith('521')) d = d.slice(3);
  else if (d.length > 10 && d.startsWith('52')) d = d.slice(2);
  d = d.slice(0, 10);
  return [d.slice(0, 2), d.slice(2, 6), d.slice(6, 10)].filter(Boolean).join(' ');
}

export function initLeadForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-lead-form]:not([data-ready])').forEach((form) => {
    form.dataset.ready = '1';
    const summary = form.querySelector<HTMLElement>('[data-summary]')!;
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    const label = btn.querySelector<HTMLElement>('[data-btn-label]')!;
    const original = label.textContent;
    let started = false;

    // Teléfono: solo números, máximo 10 dígitos, con formato automático
    form.querySelectorAll<HTMLInputElement>('input[data-phone]').forEach((el) => {
      el.addEventListener('input', () => {
        const formatted = formatPhone(el.value);
        if (formatted !== el.value) el.value = formatted;
      });
      el.addEventListener('keydown', (e) => {
        // Bloquea letras y símbolos (deja pasar atajos, borrar y navegación)
        if (e.ctrlKey || e.metaKey || e.altKey || e.key.length > 1) return;
        if (!/\d/.test(e.key)) e.preventDefault();
      });
    });

    // Validación al salir del campo, sin gritarle al usuario mientras escribe.
    form.querySelectorAll<HTMLInputElement>('input[required]').forEach((el) => {
      el.addEventListener('blur', () => { if (el.value) setError(form, el, messages[el.name]?.(el) ?? ''); });
      el.addEventListener('input', () => { if (el.getAttribute('aria-invalid')) setError(form, el, messages[el.name]?.(el) ?? ''); });
      el.addEventListener('focus', () => {
        if (started) return; started = true;
        (window as any).cxTrack?.('form_start', { formulario: form.dataset.source });
      }, { once: true });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      summary.hidden = true;
      const errors = validate(form);
      if (errors.length) {
        summary.innerHTML = `<strong>Revise ${errors.length === 1 ? 'un campo' : `${errors.length} campos`}:</strong> ${errors.map((x) => x.msg).join(' ')}`;
        summary.hidden = false;
        errors[0].el.focus();
        (window as any).cxTrack?.('form_error', { formulario: form.dataset.source, campos: errors.length });
        return;
      }
      btn.setAttribute('aria-busy', 'true');
      btn.disabled = true;
      label.textContent = 'Enviando…';
      try {
        await send(form);
        const servicio = (form.elements.namedItem('servicio') as HTMLInputElement | null)?.value ?? '';
        try { sessionStorage.setItem('cx-lead', JSON.stringify({ servicio, origen: form.dataset.source, t: Date.now() })); } catch {}
        location.assign('/gracias');
      } catch {
        btn.removeAttribute('aria-busy');
        btn.disabled = false;
        label.textContent = original;
        summary.innerHTML = 'No pudimos enviar su solicitud. Intente de nuevo o contáctenos directo por <a href="tel:+528129129134">teléfono</a> o <a href="https://wa.me/528129129134" target="_blank" rel="noopener">WhatsApp</a>.';
        summary.hidden = false;
        summary.focus?.();
        (window as any).cxTrack?.('form_send_error', { formulario: form.dataset.source });
      }
    });
  });
}
