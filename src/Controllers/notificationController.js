const {Inscription,Espace,User, Notification, PosteCreneau} = require('../Models/models');
const {Sequelize} = require('sequelize');


exports.getNotificationsOfUserByFestival = async (req, res) => {
    try {
        const { iduser, idfestival } = req.params;
        
        const notifications = await Notification.findAll({
            where: { iduser: iduser, idfestival: idfestival }
            
        });
        if (notifications.length === 0) {
            res.status(200).json({ find: false, notifications: notifications });
        } else {
            res.status(200).json({ find: true, notifications: notifications });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}


exports.deleteNotification = async (req, res) => {
    try {
        const { idnotification } = req.body;

        // Check if the inscription with the given ID exists
        const notification = await Notification.destroy({where: { idnotification: idnotification}});

        res.status(200).json({ deleted : true, message: "Notification deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ deleted : false, message: "Erreur serveur" });
    }
}