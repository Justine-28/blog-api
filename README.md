# Blog API - INF222

API Backend pour gérer un blog simple.

## Installation
```bash
npm install
node index.js
```

## Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/articles | Créer un article |
| GET | /api/articles | Lister les articles |
| GET | /api/articles/:id | Récupérer un article |
| PUT | /api/articles/:id | Modifier un article |
| DELETE | /api/articles/:id | Supprimer un article |
| GET | /api/articles/search?query= | Rechercher un article |

## Documentation Swagger

http://localhost:3000/api-docs
