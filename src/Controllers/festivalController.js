const {Festival} = require('../Models/models')
const {Sequelize} = require('sequelize')


exports.createFestival = async (req, res) => {

    const { annee, date_debut, date_fin, nom } = req.body;
    try {
        const festival = await Festival.create({
            annee: annee,
            date_debut: date_debut,
            date_fin: date_fin,
            nom : nom,
            valide: false,

        });

        res.status(201).json({ message: "Festival ajouté !", festival: festival.toJSON() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


exports.deleteFestival = async (req, res) => {
    const { nom } = req.body;

    try {
        // Check if the festival with the given ID exists
        const festival = await Festival.findOne({ where: { nom: nom } });
        if (!festival) {
            return res.status(404).json({ message: "Festival not found" });
        }

        // Delete the festival
        await festival.destroy();

        res.status(200).json({ message: "Festival deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.updateFestival = async (req, res) => {
     const { idfestival, annee, date_debut, date_fin, nom, valide } = req.body;
    
     try {
          // Check if the festival with the given ID exists
          const festival = await Festival.findOne({ where: { idfestival: idfestival } });
          if (!festival) {
                return res.status(404).json({ message: "Festival not found" });
          }
    
        if (annee !== undefined) {
            festival.annee = annee;
        }
        if (date_debut !== undefined) {
            festival.date_debut = date_debut;
        }
        if (date_fin !== undefined) {
            festival.date_fin = date_fin;
        }
        if (nom !== undefined) {
            festival.nom = nom;
        }
        if (valide !== undefined) {
            festival.valide = valide;
        }
        await festival.save();
    
      res.status(200).json({ message: "Festival updated successfully", festival: festival.toJSON() });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Erreur serveur" });
     }    
}


// Get all festivals
exports.getAllFestivals = async (req, res) => {
    try {
        const festivals = await Festival.findAll({
            order: [['idfestival', 'DESC']], // Ordonne par ID de manière décroissante
        });

        res.status(200).json({ find: true, festivals: festivals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ find: false, message: "Erreur serveur" });
    }
};


exports.getFestivalByAnnee = async (req, res) => {
    const {annee} = req.params
    console.log(annee)
    try {
        const festival = await Festival.findOne({ where: { annee: annee } });
        if (!festival) {
            return res.json({ find:false,  message: "Festival not found" });
        }
        res.status(200).json({ find:true, festival: festival.toJSON() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ find:false, message: "Erreur serveur" });
    }
};

exports.getFestivalEnCours = async (req, res) => {
    try {
        const currentDate=new Date()
        const currentannee=currentDate.getFullYear()
        const festivalEnCours = await Festival.findOne({
            where: {
                date_fin: {
                    [Sequelize.Op.gte]: currentDate,
                },
                annee: currentannee,
            },
            order: [['idfestival', 'DESC']], // Ordonne par ID de manière décroissante
           
        });

        if (!festivalEnCours) {
            res.json({ find: false, message: "Festival not found" });
        } else {
            res.status(200).json({ find: true, festival: festivalEnCours.toJSON() });
        }
    } catch (error) {
        res.status(500).json({ find: false, message: "Erreur serveur" });
    }
};