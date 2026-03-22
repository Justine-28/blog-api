const db = require('../config/database');

const Article = {

  // Créer un article
  create: (article, callback) => {
    const { titre, contenu, auteur, date, categorie, tags } = article;
    db.run(
      `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [titre, contenu, auteur, date, categorie, tags],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  },

  // Récupérer tous les articles (avec filtres optionnels)
  findAll: (filtres, callback) => {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (filtres.categorie) {
      query += ' AND categorie = ?';
      params.push(filtres.categorie);
    }
    if (filtres.auteur) {
      query += ' AND auteur = ?';
      params.push(filtres.auteur);
    }
    if (filtres.date) {
      query += ' AND date = ?';
      params.push(filtres.date);
    }

    db.all(query, params, callback);
  },

  // Récupérer un article par ID
  findById: (id, callback) => {
    db.get('SELECT * FROM articles WHERE id = ?', [id], callback);
  },

  // Modifier un article
  update: (id, article, callback) => {
    const { titre, contenu, categorie, tags } = article;
    db.run(
      `UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ?
       WHERE id = ?`,
      [titre, contenu, categorie, tags, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  },

  // Supprimer un article
  delete: (id, callback) => {
    db.run('DELETE FROM articles WHERE id = ?', [id], function (err) {
      callback(err, { changes: this.changes });
    });
  },

  // Rechercher des articles
  search: (query, callback) => {
    db.all(
      `SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?`,
      [`%${query}%`, `%${query}%`],
      callback
    );
  }
};

module.exports = Article;