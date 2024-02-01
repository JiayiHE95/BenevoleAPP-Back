const {Inscription,Espace,User,Supervision, Notification, PosteCreneau} = require('../Models/models');
const {Sequelize} = require('sequelize');


exports.getReferentByPoste = async (req, res) => {
  try {
    const { idposte, idfestival } = req.body;
    
    const referents = await Supervision.findAll({
      where: { idposte: idposte, idfestival:idfestival},
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json({ referents: referents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.addReferent = async (req, res) => {
    try {
      const { idposte, idfestival, iduser } = req.body;
  
      // Create a new Supervision record
      const supervision = await Supervision.create({
        idposte: idposte,
        idfestival: idfestival,
        iduser: iduser,
      });
  
      // Check if the operation was successful
      if (supervision) {
        const notification = await Notification.create({
          iduser: iduser,
          idfestival: idfestival,
          label: "Vous avez été promu référent"})
        // Successful creation, respond with 201 Created status
        res.status(201).json({ message: 'Referent added successfully', supervision: supervision });
      } else {
        // Operation failed, respond with 500 Internal Server Error status
        res.status(500).json({ message: 'Failed to add referent' });
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  

