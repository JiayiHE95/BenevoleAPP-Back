const sequelize= require("../config/database")

const Festival = require('./Festival');
const Creneau = require('./Creneau');
const Jeu = require('./Jeu');
const Poste = require('./Poste');
const Espace = require('./Espace');
const PosteCreneau = require('./PosteCreneau');
const User = require('./User');
const Supervision = require('./Supervision');
const Inscription = require('./Inscription');
const JeuEspace = require('./JeuEspace');



// Relation Poste et Espace
Poste.hasMany(Espace,{ foreignKey: { name: 'idPoste', allowNull: false }, onDelete: 'CASCADE' })
Espace.belongsTo(Poste,{ foreignKey: { name: 'idPoste', allowNull: false }})
// Comment faire le Espace Espace ??
Espace.belongsTo(Espace, { foreignKey: 'idZonePlan', onDelete: 'CASCADE' });


//Relation PosteCreneau Poste
Poste.hasMany(PosteCreneau, {foreignKey: { name: 'idPoste', allowNull: false }, onDelete: 'CASCADE' })
PosteCreneau.belongsTo(Poste,{foreignKey: {name: 'idPoste', allowNull: false}})

// Relation PosteCreneau Creneau
Creneau.hasMany(PosteCreneau, {foreignKey: { name: 'idCreneau', allowNull: false }, onDelete: 'CASCADE' })
PosteCreneau.belongsTo(Creneau,{foreignKey: {name: 'idCreneau', allowNull: false}})

// Relation PosteCreneau Festival
Festival.hasMany(PosteCreneau, {foreignKey: { name: 'idFestival', allowNull: false }, onDelete: 'CASCADE' })
PosteCreneau.belongsTo(Festival,{foreignKey: {name: 'idFestival', allowNull: false}})

// Relation Espace Supervision
Espace.hasMany(Supervision,{foreignKey: { name: 'idZoneBenevole', allowNull: false }, onDelete: 'CASCADE' })
Supervision.belongsTo(Espace,{foreignKey:{name: 'idZoneBenevole', allowNull: false}})

// Relation User Supervision
User.hasMany(Supervision,{foreignKey: { name: 'idUser', allowNull: false }, onDelete: 'CASCADE' })
Supervision.belongsTo(User,{foreignKey:{name: 'idUser', allowNull: false}})

// Relation Espace JeuEspace
Espace.hasMany(JeuEspace,{foreignKey: { name: 'idZoneBenevole', allowNull: false }, onDelete: 'CASCADE' })
JeuEspace.belongsTo(Espace,{foreignKey:{name: 'idZoneBenevole',allowNull: false}})

// Relation Jeu JeuEspace
Jeu.hasMany(JeuEspace,{foreignKey: { name: 'idJeu', allowNull: false }, onDelete: 'CASCADE' })
JeuEspace.belongsTo(Jeu,{foreignKey:{name: 'idJeu', allowNull: false}})

// Relation User Inscription
User.hasMany(Inscription,{foreignKey: { name: 'idUser', allowNull: false }, onDelete: 'CASCADE' })
Inscription.belongsTo(User,{foreignKey:{name: 'idUser', allowNull: false}})

// Relation User Inscription
User.hasMany(Inscription,{foreignKey: { name: 'idUser', allowNull: false }, onDelete: 'CASCADE' })
Inscription.belongsTo(User,{foreignKey:{name: 'idUser', allowNull: false}})


// Relation PosteCreneau Inscription

PosteCreneau.hasMany(Inscription, { foreignKey: 'idPoste', onDelete: 'CASCADE' });
Inscription.belongsTo(PosteCreneau, { foreignKey: 'idPoste' });

PosteCreneau.hasMany(Inscription, { foreignKey: 'idCreneau', onDelete: 'CASCADE' });
Inscription.belongsTo(PosteCreneau, { foreignKey: 'idCreneau' });

PosteCreneau.hasMany(Inscription, { foreignKey: 'idFestival', onDelete: 'CASCADE' });
Inscription.belongsTo(PosteCreneau, { foreignKey: 'idFestival' });


//sequelize.sync({alter: false}).then(()=>{
//    console.log("All tables synced")
//})

module.exports = { Festival , Creneau, Jeu, JeuEspace,Poste,PosteCreneau,Inscription,Supervision, User}