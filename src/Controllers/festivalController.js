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
    const { idfestival } = req.body;

    try {
        // Check if the festival with the given ID exists
        const festival = await Festival.findOne({ where: { idfestival: idfestival } });
        if (!festival) {
            return res.status(404).json({ message: "Festival not found" });
        }

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
        console.log(festivals)

        res.status(200).json({ find: true, festivals: festivals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ find: false, message: "Erreur serveur" });
    }
};


exports.getFestivalByAnnee = async (req, res) => {
    const {annee} = req.params

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



exports.getFestivalSelection = async (req, res) => {
    try {
        const id = req.params.id;

        // Vérifiez si l'ID est défini avant d'effectuer la requête
        if (!id) {
            return res.status(400).json({ find: false, message: "Invalid festival ID" });
        }

        const festival = await Festival.findOne({
            where: {
                idfestival: id
            }
        });

        if (!festival) {
            res.json({ find: false, message: "Festival not found" });
        } else {
            res.status(200).json({ find: true, festival: festival });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ find: false, message: "Server error", error: error.message });
    }
};
