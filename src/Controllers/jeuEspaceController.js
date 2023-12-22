

const { JeuEspace, Jeu, Espace } = require('../Models/models');

exports.getAllJeuxByIdjeu = async (req, res) => {
    try {
        const jeux = await JeuEspace.findAll({
            include: [
                {
                    model: Espace,
                    where: { idzoneplan: req.query.idzonebenevole },
                },
                {
                    model: Jeu,
                    // Ajoutez ici toutes les conditions supplémentaires pour la jointure si nécessaire.
                }
            ],
        });

        res.status(200).json({ jeux: jeux });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


