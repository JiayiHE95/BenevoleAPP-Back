const { Hebergement, User, Festival } = require('../Models/models');

// Create a new poste
exports.createHebergement = async (req, res) => {
    const { distance, description, nb_places, iduser, idfestival } = req.body;
    try {
        const hebergement = await Hebergement.create({
            distance: distance,
            description: description,
            nb_places: nb_places,
            iduser: iduser,
            idfestival: idfestival
        });

        res.status(201).json({ created: true, hebergement: hebergement.toJSON() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ created:false, message: "Erreur serveur" });
    }
};

// Delete a poste by ID
exports.deleteHebergement = async (req, res) => {
    

    try {
        const { idhebergement } = req.params;
        // Check if the poste with the given ID exists
        const hebergement = await Hebergement.findByPk(idhebergement);
        if (!hebergement) {
            return res.status(404).json({ message: "Hebergement not found" });
        }

        // Delete the poste
        await hebergement.destroy();

        res.status(200).json({ message: "Hebergement deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Get all postes
exports.getAllHebergementsByFestival = async (req, res) => {

    try {
        const { idfestival } = req.params;
        const hebergements = await Hebergement.findAll({where: {idfestival : idfestival},include: [
            {
               model: User,
            }
        ]});

        res.status(200).json({ hebergements: hebergements });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
// Get all postes
exports.getAllHebergementsByUserFestival = async (req, res) => {

    try {
        const { idfestival, iduser } = req.params;
        const hebergements = await Hebergement.findAll({where: {idfestival : idfestival, iduser : iduser},include: [
            {
               model: User,
            }
        ]});

        res.status(200).json({ hebergements: hebergements });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
