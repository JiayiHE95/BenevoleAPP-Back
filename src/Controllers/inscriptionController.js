const {Inscription,Espace, PosteCreneau} = require('../Models/models');
const {Sequelize} = require('sequelize');

exports.getInscriptionsByUserCreneau = async (req, res) => {
    try {
        const { iduser, idcreneau } = req.params;
        const inscriptions = await Inscription.findAll({where: { iduser: iduser, idcreneau: idcreneau }});
        if(inscriptions.length==0){
            res.status(200).json({ find : false,inscriptions: inscriptions });
        }else{
         res.status(200).json({ find : true,inscriptions: inscriptions });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }

}

exports.createInscription = async (req, res) => {
 try {
     const { iduser, idcreneau, idfestival, idposte, idzonebenevole } = req.body;
     console.log(req.body);

     if (idzonebenevole == null) {
         console.log("idzonebenevole est null");
         const espace = await Espace.findOne({ where: { idposte: idposte } });

         const zonebenevole = espace.idzonebenevole;

         const inscription = await Inscription.create({
             iduser: iduser,
             idcreneau: idcreneau,
             idposte: idposte,
             idfestival: idfestival,
             idzonebenevole: zonebenevole,
         });
         

         const posteCreneau = await PosteCreneau.update(
             { capacite_restante: Sequelize.literal('capacite_restante - 1') },
             { where: { idposte: idposte, idcreneau: idcreneau,idzonebenevole: zonebenevole } }
         );
     }else{
      for (const [idZone, nomZone] of Object.entries(idzonebenevole)) {
       const inscription = await Inscription.create({
           iduser: iduser,
           idcreneau: idcreneau,
           idposte: idposte,
           idfestival: idfestival,
           idzonebenevole: parseInt(idZone),
       });

       const posteCreneau = await PosteCreneau.update(
        { capacite_restante: Sequelize.literal('capacite_restante - 1') },
        { where: { idposte: idposte, idcreneau: idcreneau,idzonebenevole: parseInt(idZone) } }
    );

   }
     }

     res.status(200).json({ created: true, message: "Inscriptions created successfully" });
 } catch (error) {
     console.error(error);
     res.status(500).json({ created: false, message: "Erreur serveur" });
 }
}


exports.getIncriptionsByPostCreneau = async (req, res) => {
    try {
        const { idposte, idcreneau } = req.query;
        const inscriptions = await Inscription.findAll({where: { idposte: idposte, idcreneau: idcreneau }});
        if(inscriptions.length==0){
            res.status(200).json({ find : false,inscriptions: inscriptions });
        }else{
         res.status(200).json({ find : true,inscriptions: inscriptions });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

exports.deleteInscription = async (req, res) => {
    try {
        const { idposte,idcreneau,iduser } = req.body;

        // Check if the inscription with the given ID exists
        const inscription = await Inscription.destroy({where: { idposte: idposte, idcreneau: idcreneau,iduser:iduser }});

        res.status(200).json({ deleted : true, message: "Inscription deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ deleted : false, message: "Erreur serveur" });
    }
}