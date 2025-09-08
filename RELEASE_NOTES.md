## v1.0.0 (production)

Fecha: 2025-09-08

### Cambios clave

- Seguridad backend:
  - Autenticación con `bcrypt` y JWT; middleware `verifyToken`, `requireSuperAdmin`, `requireSelfOrSuperAdmin`.
  - Headers de seguridad (`helmet`), rate limit global y específico para login.
  - CORS configurable por `CORS_ORIGINS`.

- Observabilidad y fiabilidad:
  - Endpoints `/healthz`, `/readyz` (chequea DB) y `/metrics` (Prometheus `prom-client`).
  - Logging estructurado con `pino-http`.

- Performance:
  - Compresión HTTP (`compression`).
  - Caché en memoria + headers `Cache-Control` en `GET /api/paquetes` y `GET /api/torneos`.
  - Imágenes WebP, `loading="lazy"`, `decoding="async"`, atributos `width/height` y `<picture>`.
  - Preload de hero image y preconnect de Google Fonts.

- Frontend UX:
  - API client centralizado (Axios) con toasts globales y manejo de errores.
  - `AuthContext`, `ScrollToTop`, `Spinner`, `ErrorBoundary`, microanimaciones (Framer Motion).
  - Navegación con `Link`, layout de Admin y tema de colores.

- Funcionalidad:
  - Endpoint `GET /api/viajes/cliente/:id`.
  - Vistas: Mis Datos, Mi Viaje, Admin* actualizadas.

- Calidad y CI/CD:
  - Tests backend (Node `node:test` + Supertest): login, 401/403, healthchecks.
  - GitHub Actions: tests backend, build frontend, lint/prettier y Lighthouse en producción.
  - ESLint + Prettier configurados en el repo.

### Variables de entorno

- Backend: `PORT`, `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS`.
- Frontend: `REACT_APP_API_URL` (apunta al backend `/api`).

### Notas de despliegue

- Render (backend): configurar variables y redeploy. `/readyz` debe devolver 200.
- Vercel (frontend): `REACT_APP_API_URL` a la URL del backend.

### Chequeos post-deploy

- `GET /healthz` => 200, `GET /readyz` => 200, `GET /metrics` => texto Prometheus.
- Login exitoso desde el frontend y rutas protegidas accesibles según rol.

### Conocidos/pendientes

- Monitorear métricas y ajustar TTL de caché si cambia el patrón de tráfico.


