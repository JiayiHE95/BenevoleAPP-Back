const {Festival} = require('../Models/models')


exports.createFestival = async (req, res) => {

    const { annee, date_debut, date_fin, nom } = req.body;
    try {
        const festival = await Festival.create({
            annee: annee,
            date_debut: date_debut,
            date_fin: date_fin,
            nom : nom
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


// Get all festivals
exports.getAllFestivals = async (req, res) => {
    try {
        const festivals = await Festival.findAll();

        res.status(200).json({ festivals: festivals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};