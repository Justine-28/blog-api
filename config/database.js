const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./blog.db', (err) => {
  if (err) {
    console.error('Erreur connexion base de données:', err.message);
  } else {
    console.log('Base de données connectée');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    auteur TEXT NOT NULL,
    date TEXT NOT NULL,
    categorie TEXT NOT NULL,
    tags TEXT NOT NULL
  )
`);

module.exports = db;