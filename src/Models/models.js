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
Poste.hasMany(Espace,{ foreignKey: { name: 'idposte', allowNull: false }, onDelete: 'CASCADE' })
Espace.belongsTo(Poste,{ foreignKey: { name: 'idposte', allowNull: false }})
// Comment faire le Espace Espace ??
Espace.belongsTo(Espace, { foreignKey: 'idzoneplan', onDelete: 'CASCADE' });


//Relation PosteCreneau Poste
Poste.hasMany(PosteCreneau, {foreignKey: { name: 'idposte', allowNull: false }, onDelete: 'CASCADE' })
PosteCreneau.belongsTo(Poste,{foreignKey: {name: 'idposte', allowNull: false}})

// Relation PosteCreneau Creneau
Creneau.hasMany(PosteCreneau, {foreignKey: { name: 'idcreneau', allowNull: false }, onDelete: 'CASCADE' })
PosteCreneau.belongsTo(Creneau,{foreignKey: {name: 'idcreneau', allowNull: false}})

// Relation PosteCreneau Festival
Festival.hasMany(PosteCreneau, {foreignKey: { name: 'idfestival', allowNull: false }, onDelete: 'CASCADE' })
PosteCreneau.belongsTo(Festival,{foreignKey: {name: 'idfestival', allowNull: false}})

// Relation Espace Supervision
Espace.hasMany(Supervision,{foreignKey: { name: 'idzonebenevole', allowNull: false }, onDelete: 'CASCADE' })
Supervision.belongsTo(Espace,{foreignKey:{name: 'idzonebenevole', allowNull: false}})

// Relation User Supervision
User.hasMany(Supervision,{foreignKey: { name: 'iduser', allowNull: false }, onDelete: 'CASCADE' })
Supervision.belongsTo(User,{foreignKey:{name: 'iduser', allowNull: false}})

// Relation Espace JeuEspace
Espace.hasMany(JeuEspace,{foreignKey: { name: 'idzonebenevole', allowNull: false }, onDelete: 'CASCADE' })
JeuEspace.belongsTo(Espace,{foreignKey:{name: 'idzonebenevole',allowNull: false}})

// Relation Jeu JeuEspace
Jeu.hasMany(JeuEspace,{foreignKey: { name: 'idjeu', allowNull: false }, onDelete: 'CASCADE' })
JeuEspace.belongsTo(Jeu,{foreignKey:{name: 'idjeu', allowNull: false}})

// Relation User Inscription
User.hasMany(Inscription,{foreignKey: { name: 'iduser', allowNull: false }, onDelete: 'CASCADE' })
Inscription.belongsTo(User,{foreignKey:{name: 'iduser', allowNull: false}})

// Relation User Inscription
User.hasMany(Inscription,{foreignKey: { name: 'iduser', allowNull: false }, onDelete: 'CASCADE' })
Inscription.belongsTo(User,{foreignKey:{name: 'iduser', allowNull: false}})


// Relation PosteCreneau Inscription

PosteCreneau.hasMany(Inscription, { foreignKey: 'idposte', onDelete: 'CASCADE' });
Inscription.belongsTo(PosteCreneau, { foreignKey: 'idposte' });

PosteCreneau.hasMany(Inscription, { foreignKey: 'idcreneau', onDelete: 'CASCADE' });
Inscription.belongsTo(PosteCreneau, { foreignKey: 'idcreneau' });

PosteCreneau.hasMany(Inscription, { foreignKey: 'idfestival', onDelete: 'CASCADE' });
Inscription.belongsTo(PosteCreneau, { foreignKey: 'idfestival' });




module.exports = { Festival , Creneau, Jeu, JeuEspace,Poste,PosteCreneau,Inscription,Supervision, User}