const {Inscription,Espace,User, Notification, PosteCreneau, Creneau, Poste} = require('../Models/models');
const {Sequelize} = require('sequelize');


exports.getRegisteredPeopleByCreneau = async (req, res) => {
    try {

        
        const { creneau } = req.body;

        console.log(creneau);

        const inscriptions = await Inscription.findAll({
            where: { 
                idcreneau: creneau.idcreneau, 
                idfestival: creneau.idfestival, 
                idposte:creneau.idposte,
                idzonebenevole:creneau.idzonebenevole 
            },
            include: [
                {
                    model: User,
                },
            ],

        });

        if (inscriptions.length === 0) {
            res.status(200).json({ find: false, inscriptions: inscriptions });
        } else {
            res.status(200).json({ find: true, inscriptions: inscriptions });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
   
    const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const jourSemaine = joursSemaine[dateObject.getDay()];
   
    const jour = String(dateObject.getDate()).padStart(2, '0');
    const mois = String(dateObject.getMonth() + 1).padStart(2, '0');
    const annee = dateObject.getFullYear();
   
    const formattedDate = `${jourSemaine} ${jour}/${mois}/${annee}`;
   
    return formattedDate;
};

exports.validateRegistration = async (req, res) => {
    try {
        const { idinscription, valide } = req.body;
        const inscription = await Inscription.findOne({ 
            where: { idinscription: idinscription },
            include: [
                {
                    model: User,
                },
                {
                    model: Creneau,
                },
                {   
                    model: Poste,
                }
            ] 
        });
        const admin = await User.findOne({ where: { role: 'ADMIN' } });
        
        if (inscription) {
            const username= `${inscription.User.prenom} ${inscription.User.nom} (${inscription.User.pseudo})`
            const jour= formatDate(inscription.Creneau.jour);
            const poste =`${inscription.Poste.nom} (${jour}, de ${inscription.Creneau.heure_debut} à ${inscription.Creneau.heure_fin})`
            if (valide === true) {
                inscription.valide = true;
                await inscription.save();

                await Notification.create({
                    iduser: admin.iduser,
                    idfestival: inscription.idfestival,
                    label: `Utilisateur ${username} a accepté votre proposition de poste, l'inscription a été réalisée pour le poste ${poste}`
                });

                return res.status(200).json({ success: true, message: 'Registration validated successfully' });
            } else {
                

                await Notification.create({
                    iduser: admin.iduser,
                    idfestival: inscription.idfestival,
                    label: `Utilisateur ${username} a refusé votre proposition de poste, l'inscription a été supprimée pour le poste ${poste}`
                });
                await Notification.create({
                    iduser: inscription.iduser,
                    idfestival: inscription.idfestival,
                    label: "Vous avez refusé une proposition de poste, merci de vous réinscrire sur le créneau en flexible si vous souhaitez toujours être flexible à ce créneau"
                });

                const inscription2 = await Inscription.findOne({ where: { idinscription: idinscription } });
                const posteCreneau = await PosteCreneau.findOne({ where: { idposte: inscription2.idposte, idcreneau: inscription2.idcreneau } });
                posteCreneau.capacite_restante = posteCreneau.capacite_restante + 1;
                await posteCreneau.save();
                await Inscription.destroy({ where: { idinscription: idinscription } });
                
                return res.status(200).json({ success: true, message: 'Registration rejected successfully' });
            }
        } else {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




exports.getInscriptionsOfUserByFestival = async (req, res) => {
    try {
        const { iduser, idfestival } = req.params;
        const inscriptions = await Inscription.findAll({
            where: { iduser: iduser, idfestival: idfestival }
            
        });
        console.log(inscriptions);
        if (inscriptions.length === 0) {
            res.status(200).json({ find: false, inscriptions: inscriptions });
        } else {
            res.status(200).json({ find: true, inscriptions: inscriptions });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}



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
     console.log("j'entre dans la fonction");
     console.log(idzonebenevole);

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
             valide : true
         });
         

         const posteCreneau = await PosteCreneau.update(
             { capacite_restante: Sequelize.literal('capacite_restante - 1') },
             { where: { idposte: idposte, idcreneau: idcreneau,idzonebenevole: zonebenevole } }
         );
         
     }else{
       
      for (const [idZone, nomZone] of Object.entries(idzonebenevole)) {
        console.log("j'entre dans la partie object entries");
       const inscription = await Inscription.create({
           iduser: iduser,
           idcreneau: idcreneau,
           idposte: idposte,
           idfestival: idfestival,
           idzonebenevole: parseInt(idZone),
           valide : true
       });
       console.log("j'ai créé inscritpion");
       
       

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

// admin inscrit benevole
exports.createInscription2 = async (req, res) => {
    try {
        const { iduser, idcreneau, idfestival, idposte, idzonebenevole } = req.body;
          const inscription = await Inscription.create({
              iduser: iduser,
              idcreneau: idcreneau,
              idposte: idposte,
              idfestival: idfestival,
              idzonebenevole:idzonebenevole,
              
          });
   
          const posteCreneau = await PosteCreneau.update(
           { capacite_restante: Sequelize.literal('capacite_restante - 1') },
           { where: { idposte: idposte, idcreneau: idcreneau,idzonebenevole: idzonebenevole } }
       );
   
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

exports.getInscriptionsByFestival = async (req, res) => {
    console.log("je suis dans la fonction getInscriptionsByFestival");
    try {
        const { idfestival } = req.params;
        const inscriptions = 
        await User.findAll({
            include: [
              {
                model: Inscription,
                where: { idfestival: idfestival },
              },
            ],
          });
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