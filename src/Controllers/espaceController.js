const { Espace } = require('../Models/models');

exports.createEspace = async (req, res) => {
    const { nom, idPoste, idZonePlan } = req.body;
    try {
        const espace = await Espace.create({
            nom: nom,
            idPoste: idPoste,
            idZonePlan: idZonePlan
        });

        res.status(201).json({ message: "Espace ajouté !", espace: espace.toJSON() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.deleteEspace = async (req, res) => {
    const { nom } = req.body;

    try {
        // Check if the espace with the given ID exists
        const espace = await Espace.findOne({ where: { nom: nom } });
        if (!espace) {
            return res.status(404).json({ message: "Espace not found" });
        }

        // Delete the espace
        await espace.destroy();

        res.status(200).json({ message: "Espace deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Get all espaces
exports.getAllEspaces = async (req, res) => {
    try {
        const espaces = await Espace.findAll();

        res.status(200).json({ espaces: espaces });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
