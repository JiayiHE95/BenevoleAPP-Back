const { Poste } = require('../Models/models');

// Create a new poste
exports.createPoste = async (req, res) => {
    const { nom } = req.body;
    try {
        const poste = await Poste.create({
            nom: nom
        });

        res.status(201).json({ message: "Poste ajouté !", poste: poste.toJSON() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Delete a poste by ID
exports.deletePoste = async (req, res) => {
    const { idposte } = req.body;

    try {
        // Check if the poste with the given ID exists
        const poste = await Poste.findByPk(idposte);
        if (!poste) {
            return res.status(404).json({ message: "Poste not found" });
        }

        // Delete the poste
        await poste.destroy();

        res.status(200).json({ message: "Poste deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Get all postes
exports.getAllPostes = async (req, res) => {
    try {
        const postes = await Poste.findAll();

        res.status(200).json({ postes: postes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
