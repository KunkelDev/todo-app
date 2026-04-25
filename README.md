# Task App

Eine einfache REST-API zur Aufgabenverwaltung, entwickelt mit Node.js, Express, PostgreSQL und einem Vanilla JS-Frontend.

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Backend | Node.js, Express.js |
| Datenbank | PostgreSQL (via Docker) |
| API-Dokumentation | OpenAPI 3.0 / Swagger UI |
| Tests | Jest, Supertest |
| Frontend | HTML, CSS, Vanilla JavaScript |

## Voraussetzungen

- [Node.js](https://nodejs.org/) (LTS)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

## Installation

1. Repository klonen

```bash
```

2. Abhaengigkeiten installieren

```bash
npm install
```

3. Umgebungsvariablen einrichten

```bash
copy .env.example .env
```

> Die Datei `.env` bei Bedarf mit eigenen Werten befuellen.

## Verwendung

1. Datenbank starten

```bash
docker compose up -d
```

2. Datenbanktabelle initialisieren

```bash
node db-init.js
```

3. Server starten

```bash
node server.js
```

> Server: `http://localhost:3000`
> Swagger UI: `http://localhost:3000/api-docs`

## API-Endpunkte

| Methode | URL | Beschreibung |
|---|---|---|
| GET | /tasks | Alle Aufgaben abrufen |
| GET | /tasks/:id | Einzelne Aufgabe abrufen |
| POST | /tasks | Neue Aufgabe erstellen |
| PATCH | /tasks/:id | Aufgabe aktualisieren |
| DELETE | /tasks/:id | Aufgabe loeschen |

### Abfrageparameter (GET /tasks)

| Parameter | Beschreibung | Beispiel |
|---|---|---|
| `priority` | Nach Prioritaet filtern | `?priority=high` |
| `sort` | Ergebnisse sortieren | `?sort=created_at` |
| `search` | Nach Titel suchen | `?search=einkauf` |

## Tests ausfuehren

> Docker muss laufen, bevor die Tests gestartet werden.

```bash
npm test
```