

const { JeuEspace, Jeu } = require('../Models/models');

exports.getAllJeuxByIdjeu = async (req, res) => {
    try {
        const jeux = await JeuEspace.findAll({
            where: { idzonebenevole: req.query.idzonebenevole },
            include: [
                {
                    model: Jeu,
                    // Add any additional conditions for the join here if needed
                }
            ],
        });

        res.status(200).json({ jeux: jeux });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

