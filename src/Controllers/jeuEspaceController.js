const { JeuEspace, Jeu, Espace } = require('../Models/models');
const {Sequelize} = require('sequelize');

exports.getAllJeuxByEspace = async (req, res) => {
    try {
        const jeux = await JeuEspace.findAll({
            include: [
                {
                    model: Espace,
                    where: {
                      [Sequelize.Op.or]: [
                        { idzoneplan: req.query.idzonebenevole },
                        { idzonebenevole: req.query.idzonebenevole }
                      ],
                    },
                  },
                {
                    model: Jeu,
                    // Ajoutez ici toutes les conditions supplémentaires pour la jointure si nécessaire.
                }
            ],
            where: {
                idfestival: req.query.idfestival // Ajoutez la condition pour l'ID du festival
            }
        });

        res.status(200).json({ jeux: jeux });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.getOneByFestival = async (req, res) => {
    try {
        const { idfestival } = req.params;
        const jeuEspace = await JeuEspace.findOne({
            where: { idfestival: idfestival },
        });
        
        if(!jeuEspace){
            res.status(200).json({ find: false, jeuEspace: jeuEspace });
        }else{
            res.status(200).json({ find: true, jeuEspace: jeuEspace });
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

