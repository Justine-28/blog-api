const Article = require('../models/article');

// Créer un article
exports.createArticle = (req, res) => {
  const { titre, contenu, auteur, date, categorie, tags } = req.body;

  if (!titre || !contenu || !auteur || !categorie) {
    return res.status(400).json({ message: 'Titre, contenu, auteur et categorie sont obligatoires' });
  }

  const article = {
    titre,
    contenu,
    auteur,
    date: date || new Date().toISOString().split('T')[0],
    categorie,
    tags: tags || ''
  };

  Article.create(article, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    res.status(201).json({ message: 'Article créé avec succès', id: result.id });
  });
};

// Récupérer tous les articles
exports.getArticles = (req, res) => {
  const { categorie, auteur, date } = req.query;

  Article.findAll({ categorie, auteur, date }, (err, articles) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    res.status(200).json({ articles });
  });
};

// Récupérer un article par ID
exports.getArticleById = (req, res) => {
  const { id } = req.params;

  Article.findById(id, (err, article) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    if (!article) return res.status(404).json({ message: 'Article non trouvé' });
    res.status(200).json(article);
  });
};

// Modifier un article
exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const { titre, contenu, categorie, tags } = req.body;

  if (!titre || !contenu || !categorie) {
    return res.status(400).json({ message: 'Titre, contenu et categorie sont obligatoires' });
  }

  Article.findById(id, (err, article) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    if (!article) return res.status(404).json({ message: 'Article non trouvé' });

    Article.update(id, { titre, contenu, categorie, tags }, (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
      res.status(200).json({ message: 'Article modifié avec succès' });
    });
  });
};

// Supprimer un article
exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  Article.findById(id, (err, article) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    if (!article) return res.status(404).json({ message: 'Article non trouvé' });

    Article.delete(id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
      res.status(200).json({ message: 'Article supprimé avec succès' });
    });
  });
};

// Rechercher des articles
exports.searchArticles = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Le paramètre query est obligatoire' });
  }

  Article.search(query, (err, articles) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    res.status(200).json({ articles });
  });
};