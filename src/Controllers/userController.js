const express = require('express');
const { createTokens , validateToken} = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User } = require('../Models/models');

const jwt=require("jsonwebtoken")
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const { Op } = require('sequelize');

exports.searchUsers = async (req, res) => {
  try {
    const { searchQuery } = req.body;
    
    // Utilisez Sequelize pour rechercher les utilisateurs
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { pseudo: { [Op.iLike]: `%${searchQuery}%` } }, // Recherche insensible à la casse
          { mail: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      },
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createUser = async(req, res) =>{
  const {pseudo,nom,prenom,tel,mail,association,taille_tshirt,est_vegetarien,hebergement,jeu_prefere,mdp} = req.body
  const hashedPassword = await bcrypt.hash(mdp, 10);

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
      role: "BENEVOLE",
      mdp: hashedPassword     
    }).then((data)=>{
      res.status(200).send(data)
    }).catch((e)=>{ 
      res.status(500).end()
      throw e
    })
  }

  exports.updateUser = async (req, res) => {
    const {pseudo,nom,prenom,tel,mail,association,taille_tshirt,est_vegetarien,hebergement,jeu_prefere,iduser} = req.body
    
    await User.update({ 
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
    },
    { where: { iduser:  iduser } }
    ).then(()=>{
      res.status(200).send({update:true})
    }).catch((e)=>{ 
      res.status(500).end()
      throw e
    })
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
exports.getUserById=(async (req, res) => {
  const {iduser} = req.params;
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

exports.getUserByMail= async (req, res) => {
  const { mail} = req.params
  await User.findAll({ 
    where: { mail: mail } 
  }).then((data)=>{
    if (data.length>0){
      res.send({exist:true, message:"valid Mail"})
    }else{
      res.send({exist:false, message:"UnValid Mail"})
    }
  })
}



// Delete a user by ID
exports.deleteUserById=( async (req, res) => {
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
  const { mail, mdp } = req.body
  await User.findOne({ 
    where: { mail: mail } 
  }).then((data)=>{
    if (data){
      bcrypt.compare(mdp, data.mdp, (e, response)=>{
        if (response){
          const iduser=data.iduser
          const token=jwt.sign({iduser},"jwtSecret",{
            expiresIn:5000,
          })
          res.send({auth:true, token:token, user:data})
        }else{
          res.send({auth:false, message:"Identifiant ou mot de pass incorrect"})
        }
      })
    }else{
      res.send({auth:false, message:"Utilisateur n'existe pas"})
    }
  })
}

exports.verifyJWT=(req,res,next)=>{
  const token=req.headers["x-access-token"]
  if (!token){
    res.send({auth:false, message:"token non trouvable"})
  }else{
    jwt.verify(token,"jwtSecret",(err,decoded)=>{
      if(err){
        res.send({auth:false, message:"token expiré"})
      }else{
        const iduser = decoded.iduser
        res.send({auth:true, message:"logged"})
        next()
      }
    })
  }
}


exports.verifyPassword= async (req, res) => {
  const { mail, mdp } = req.body
  await User.findOne({ 
    raw: true,
    where: { mail: mail } 
  }).then((data)=>{
    if (data){
      bcrypt.compare(mdp, data.mdp, (e, response)=>{
        if (response){
          res.send({passwordCorrect:true})
        }else{
          res.send({passwordCorrect:false})
        }
      })
    }else{
      res.send({passwordCorrect:false})
    }
  })
}

exports.verifyPWToken=(req,res,next)=>{
  const token=req.headers["pw-token"]
  if (!token){
    res.send({auth:false, message:"pw token non trouvable"})
  }else{
    jwt.verify(token,"passwordForgot",(err)=>{
      if(err){
        res.send({auth:false, message:"pw token expiré"})
      }else{
        res.send({auth:true, message:"pw token vérifié"})
        next()
      }
    })
  }
}

exports.passwordForgot=async(req,res)=>{
  const { mail} = req.body
  await User.findOne({ 
    where: { mail: mail } 
  }).then((data)=>{
    if (data){
      const token=jwt.sign({mail},"passwordForgot",{
        expiresIn:10000,
      })
      User.update({ reset_password_token: token }, { where: { mail: mail } })
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'alicehe951015@gmail.com',
          pass: 'xosvtlvmkfnymgzw'
        }
      });

      const emailTemplate = fs.readFileSync('Template/reset-pw.html', 'utf8')
      const compiledTemplate = handlebars.compile(emailTemplate)
      const url=process.env.URL || "http://localhost:3000/"
      const html = compiledTemplate({ resetPasswordLink: `${url}reset-password/${token}` });

      const mailOptions = {
        from: 'alicehe951015@gmail.com',
        to: mail,
        subject: 'Festival du Jeu Montpellier - Réinitialisation de mot de passe',
        html: html
      }

      try {
        transporter.sendMail(mailOptions)
        res.status(200).send({reset:true, message:'Un e-mail a été envoyé pour réinitialiser votre mot de passe.'});
      } catch (error) {
        console.error(error);
        res.status(500).send({reset:false, message:'Erreur lors de l\'envoi de l\'e-mail.'});
      }
    }else{
      res.status(200).send({reset:false, message:'Le mail saisi ne correspond à aucun compte'});
    }
  })
}

exports.passwordReset = async (req, res) => {
  const { mail, mdp} = req.body
  const hashedPassword = await bcrypt.hash(mdp, 10);
  await User.update({ reset_password_token: null, mdp:hashedPassword }, { where: { mail: mail } }).then((data)=>{
    res.status(200).send({reset:true, message:'Mot de passe initialisé avec réussite ! '});
  }).catch((e)=>{ 
    res.status(500).end()
    throw e
  })
 }

 
exports.getUserByPWToken= async (req, res) => {
  const { token} = req.params
  await User.findAll({ 
    where: { reset_password_token: token } 
  }).then((data)=>{
    if (data.length>0){
      res.send(data)
    }else{
      res.send({exist:false, message:"Unvalid token"})
    }
  })
}
