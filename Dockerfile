# syntax=docker/dockerfile:1

FROM node:17 AS frontend

WORKDIR /webapp

COPY frontend/package*.json ./

RUN npm install

COPY frontend .

ENV VITE_APIURL=http://localhost:8080/api

RUN npm run build

FROM node:17 AS backend

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend .

COPY --from=frontend /webapp/dist ./public

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]