const Avis = require('../models/Avis'); 

// Récupérer tous les avis
exports.getAllAvis = async (req, res) => {
  try {
    const avis = await Avis.findAll();
    res.status(200).json(avis);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Récupérer les avis par utilisateur
exports.getAvisByUser = async (req, res) => {
  try {
    const { iduser } = req.params;
    const avis = await Avis.findAll({
      where: { iduser }
    });
    res.status(200).json(avis);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Créer un avis
exports.createAvis = async (req, res) => {
  try {
    const { texte, date, iduser, idfestival } = req.body;
    const newAvis = await Avis.create({ texte, date, iduser, idfestival });
    res.status(201).json(newAvis);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mettre à jour un avis
exports.updateAvis = async (req, res) => {
  try {
    const { idavis } = req.params;
    const { texte, date } = req.body;
    const avis = await Avis.findByPk(idavis);
    if (!avis) {
      return res.status(404).send('Avis not found');
    }
    avis.texte = texte;
    avis.date = date;
    await avis.save();
    res.status(200).json(avis);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Supprimer un avis
exports.deleteAvis = async (req, res) => {
  try {
    const { idavis } = req.params;
    const deleted = await Avis.destroy({
      where: { idavis }
    });
    if (deleted) {
      res.status(204).send("Avis deleted");
    } else {
      res.status(404).send("Avis not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
