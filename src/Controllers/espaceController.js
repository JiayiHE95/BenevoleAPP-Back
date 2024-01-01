const { Espace, Inscription, PosteCreneau, Creneau } = require('../Models/models');
const sequelize = require('../config/database') ;
const {Sequelize} = require('sequelize');

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

// Get all espaces using raw SQL
exports.getAllEspacesParent = async (req, res) => {
    try {
        const espaces = await Espace.findAll({
            where: { idposte: 1, idzoneplan:null },
        });

        res.status(200).json({ espaces: espaces });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.getZonesBenevoles = async (req, res) => {
    try {
        const { idzonebenevole, idfestival, idcreneau } = req.params;

        const espaces = await Espace.findAll({ 
            where: { 
                idposte:1,
                [Sequelize.Op.or]: [
                    { idzoneplan: idzonebenevole },
                    { idzonebenevole: idzonebenevole }
                ]
             },

             include: [
                {
                  model: Inscription,
                },
                {
                    model: PosteCreneau,
                    include: [
                        {
                            model: Creneau,
                            where: { idfestival: idfestival, idcreneau: idcreneau },

                            attributes: []
                        },
                    ],
                }
            ],

            
            });
        if (!espaces) {
            return res.status(404).json({ find : false,message: "Zone not found" });
        }else{
            res.status(200).json({ find: true, espaces: espaces });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ find : false, message: "Erreur serveur" });
    }
}

