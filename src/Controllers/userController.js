const express = require('express');
const router = express.Router();
const { User } = require('../Models/models');


// Create a new user
exports.createUser =(async (req, res) => {
    const {pseudo,nom,prenom,tel,mail,association,taille_tshirt,est_vegetarien,hebergement,jeu_prefere,role} = req.body;
    try {
        const user = await User.create({
            pseudo: pseudo,
            nom: nom,
            prenom: prenom,
            tel: tel,
            mail: mail,
            association: association,
            taille_tshirt: taille_tshirt,
            est_vegetarien: est_vegetarien,
            hebergement:hebergement,
            jeu_prefere: jeu_prefere,
            role: role
              
        });
    res.status(201).json({ user: user.toJSON() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// Get all users
exports.getUsers=(async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get a specific user by ID
exports.getUser=(async (req, res) => {
  const {iduser} = req.body;
  try {
    const user = await User.findByPk(iduser);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ user: user.toJSON() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// Delete a user by ID
exports.deleteUser=( async (req, res) => {
  const {iduser} = req.body;

  try {
    const user = await User.findByPk(iduser);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

