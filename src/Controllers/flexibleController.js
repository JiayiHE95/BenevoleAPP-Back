const { User, FlexibleUserCreneau,Notification } = require('../Models/models');


exports.getAllFlexibleUserCreneau = async (req, res) => {
    try {
        const flexibleUserCreneau = await FlexibleUserCreneau.findAll();
        res.status(200).json({ flexibleUserCreneau: flexibleUserCreneau });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

exports.createFlexibleUserCreneau = async (req, res) => {
    try {
        const { iduser, idcreneau } = req.body;
        const flexibleUserCreneau = await FlexibleUserCreneau.create({
            iduser: iduser,
            idcreneau: idcreneau,
        });
        res.status(200).json({ created : true, flexibleUserCreneau: flexibleUserCreneau });
    } catch (error) {
        console.error(error);
        res.status(500).json({ created : false, message: "Erreur serveur" });
    }
}

exports.deleteFlexibleUserCreneau = async (req, res) => {
    try {
        const { iduser, idcreneau, idfestival } = req.body;
        const flexibleUserCreneau = await FlexibleUserCreneau.destroy({
            where: { iduser: iduser, idcreneau: idcreneau }
        });

        if (idfestival){

            const notification = await Notification.create({
            iduser: iduser,
            idfestival: idfestival,
            label: "Vous avez une proposition de poste en attente de validation"
        });

        }
        
        res.status(200).json({ deleted : true, flexibleUserCreneau: flexibleUserCreneau });
    } catch (error) {
        console.error(error);
        res.status(500).json({ deleted : false, message: "Erreur serveur" });
    }

}

exports.getFlexibleUserByCreneau = async (req, res) => {
    try {
        const idcreneau = req.params.idcreneau;
        const flexibleUserCreneau = await FlexibleUserCreneau.findAll({ 
         where: { idcreneau: idcreneau } ,
         include: [
          {
              model: User,
          },
      ],
        
        });
        if(!flexibleUserCreneau){
            return res.json({ find: false, message: "FlexibleUserCreneau not found" });
        }else{
         res.status(200).json({ find : true,flexibleUserCreneau: flexibleUserCreneau });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ find: false,message: "Erreur serveur" });
    }
}

exports.getOne= async (req, res) => {
    try {
     const { iduser, idcreneau } = req.body;
        const flexibleUserCreneau = await FlexibleUserCreneau.findOne({ 
         where: { iduser: iduser, idcreneau: idcreneau } ,
         include: [
          {
              model: User,
          },
      ],
        
        });
        if(!flexibleUserCreneau){
            return res.json({ find: false, message: "FlexibleUserCreneau not found" });
        }else{
         res.status(200).json({ find : true,flexibleUserCreneau: flexibleUserCreneau });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ find: false,message: "Erreur serveur" });
    }
}