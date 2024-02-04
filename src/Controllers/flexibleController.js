const { User, FlexibleUserCreneau,Notification, Creneau } = require('../Models/models');


exports.getAllFlexibleUserCreneau = async (req, res) => {
    try {
        const flexibleUserCreneau = await FlexibleUserCreneau.findAll();
        res.status(200).json({ flexibleUserCreneau: flexibleUserCreneau });
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

const formatHeure = (heure) => {
    return heure.split(":").slice(0, 2).join(":");
}
   

exports.createFlexibleUserCreneau = async (req, res) => {
    try {
        const { iduser, idcreneau } = req.body;
        let flexibleUserCreneau = await FlexibleUserCreneau.create({
            iduser: iduser,
            idcreneau: idcreneau,
        });

        flexibleUserCreneau = await FlexibleUserCreneau.findOne({ 
            where: { iduser: iduser, idcreneau: idcreneau } ,
            include: [
             {
                model: User,
             },
             {
                model: Creneau,
             }
         ],
        });

        const username= `${flexibleUserCreneau.User.prenom} ${flexibleUserCreneau.User.nom} (${flexibleUserCreneau.User.pseudo})`
        const admin = await User.findOne({ where: { role: 'ADMIN' } });
        const jour = formatDate(flexibleUserCreneau.Creneau.jour);
        const creneau =`${jour}, de ${formatHeure(flexibleUserCreneau.Creneau.heure_debut)} à ${formatHeure(flexibleUserCreneau.Creneau.heure_fin)}`

        await Notification.create({
            iduser: admin.iduser,
            idfestival: flexibleUserCreneau.Creneau.idfestival,
            label: `Utilisateur ${username} est inscrit en tant que bénévole flexible pendant ${creneau}. Attribuez-lui un poste dès maintenant depuis le planning  !`
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