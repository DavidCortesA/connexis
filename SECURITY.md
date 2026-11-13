# Política de seguridad

## Reportar una vulnerabilidad

Si encuentra una vulnerabilidad en el sitio **connexis.mx** o en este repositorio, **no abra un issue público**. Escríbanos a **contacto@connexis.mx** con el asunto `Seguridad · connexis.mx` e incluya:

- Descripción del problema y su impacto.
- Pasos para reproducirlo (URL, navegador, datos de prueba).
- Cualquier prueba de concepto, sin datos personales reales.

Confirmamos la recepción en un máximo de 3 días hábiles y le informamos el plan de corrección. Le pedimos no divulgar el hallazgo hasta que esté resuelto.

## Alcance

| Incluido | Fuera de alcance |
|---|---|
| Código de este repositorio | Servicios de terceros (Google Analytics, Netlify, Vercel, Formspree) |
| Sitio publicado en connexis.mx | Ataques de denegación de servicio o pruebas automatizadas masivas |
| Formularios y cabeceras HTTP | Ingeniería social al equipo de ConneXis |

## Medidas implementadas

- **Sitio estático** (Astro): sin base de datos ni servidor propio que atacar.
- **Cabeceras HTTP** en `vercel.json` y `netlify.toml`: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **Formularios**: validación en el cliente, campo trampa (honeypot) contra bots y envío a Netlify Forms o a un proveedor configurado por variable de entorno; no se guardan datos en el navegador.
- **Analítica con Consent Mode v2**: sin cookies de medición hasta que el visitante acepta.
- **Secretos**: ninguno en el código. Solo variables `PUBLIC_*` (IDs públicos) definidas en el panel del hosting; `.env` está en `.gitignore`.
- **Dependencias**: actualizaciones semanales de seguridad con Dependabot (`.github/dependabot.yml`). Ejecute `npm audit` antes de cada release.

## Si cambia el proveedor de formularios

La CSP permite `connect-src 'self' https:` y `form-action 'self' https:` para no romper el envío a Formspree, Web3Forms u otro servicio. Si fija un proveedor, restrinja ambas directivas a su dominio.

## Versiones con soporte

| Versión | Soporte |
|---|---|
| 1.x (Etapa 1) | ✅ |
