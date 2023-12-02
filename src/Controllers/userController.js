const express = require('express');
const { createTokens , validateToken} = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User } = require('../Models/models');





exports.createUser = async(req, res) =>{
  const {pseudo,nom,prenom,tel,mail,association,taille_tshirt,est_vegetarien,hebergement,jeu_prefere,role,mdp} = req.body
  const userAlreadyExist = await User.findOne({where: {mail: mail}});

  if (userAlreadyExist){
      res.status(409).json({message: "Mail already used for a user !"})
  }
  else{
      bcrypt.hash(mdp, 10).then((hash)=>{
      User.create({
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
        role: role,
        mdp: hash
          
    })
      .then(()=> {
          res.status(200).json({message: " User créé !"})
      })
      .catch((err)=>{
          res.status(500).json({error: err});
          
      })
  })
  }
  
  
}

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

exports.login = async(req, res)=>{
  const user = await User.findOne({ where: {mail: req.body.mail}})
  
  .then((user)=>{
      if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" })
      }
      bcrypt.compare(req.body.mdp, user.mdp)
      .then((match)=>{
          if (!match){
              res.status(401).json({error: "Wrong User/mdp combination"})
          } else{
              const accessToken = createTokens(user)
              res.status(201).json({
                  iduser: user.iduser,
                  token: accessToken})
              
          }
      })
  })
  .catch(err =>{
      res.status(500).json({error: err})
  })

}

