Green Pass — Monorepo (Frontend + Backend)

## Estructura

```
backend/    # API Node/Express + PostgreSQL
frontend/   # React (CRA) + Bootstrap + framer-motion
```

## Requisitos

- Node.js 18+
- npm 9+
- PostgreSQL 13+ (o un servicio gestionado)

## Variables de entorno

Backend (`backend/.env`):

```
PORT=5001
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DBNAME
JWT_SECRET=cambia-esto
```

Frontend (`frontend/.env`):

```
REACT_APP_API_URL=http://localhost:5001/api
```

Nota: El frontend tiene un fallback a `http://localhost:5001/api` si no definís `REACT_APP_API_URL`.

## Instalación

```
cd backend && npm i
cd ../frontend && npm i
```

## Desarrollo

En dos terminales separadas:

```
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm start
```

Back-end corre en `http://localhost:5001` y el front en `http://localhost:3000`.

## Endpoints útiles (Backend)

- `GET /api/ping` → sanity check
- `GET /api/test-db` → prueba conexión a DB
- `POST /api/auth/login` → login (JWT)
- `GET /api/users`, `PUT /api/users/:id` → gestión de usuarios
- `GET /api/torneos` y relacionados
- `POST /api/notify/notify-package-view` → tracking de vistas de paquetes

## Build de producción (Frontend)

```
cd frontend
npm run build
```

El directorio `frontend/build/` está ignorado por git.

## Despliegue

- Frontend: Vercel/Netlify (CRA está listo). Configurar `REACT_APP_API_URL` a la URL de la API en producción.
- Backend: Render/Railway/Fly/Heroku. Configurar `PORT`, `DATABASE_URL` y `JWT_SECRET` en el servicio.

## Scripts útiles

Backend:

```
npm run dev     # nodemon
npm start       # producción
npm run seed    # carga datos demo (1 admin, 2 clientes, 2 paquetes, 1 viaje)
```

Frontend:

```
npm start       # dev
npm run build   # prod
```

## Notas de arquitectura

- Cliente HTTP centralizado en `frontend/src/api/client.js` (usa `REACT_APP_API_URL`).
- Estado global de auth con `AuthContext` y persistencia en `localStorage`.
- UI: Bootstrap + microanimaciones con framer-motion, skeletons en vistas largas.
