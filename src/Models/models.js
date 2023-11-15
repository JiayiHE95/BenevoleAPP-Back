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
Espace.hasMany(Espace,{ foreignKey: { name: 'idzoneplan'}, onDelete: 'CASCADE' })
Espace.belongsTo(Espace, { foreignKey: { name: 'idzoneplan'}, onDelete: 'CASCADE' });


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


/*
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');

async function readFile(filePath) {
  const fileExtension = filePath.split('.').pop().toLowerCase();

  if (fileExtension === 'csv') {
    // Pour les fichiers CSV
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        await processRow(row);
      })
      .on('end', () => {
        console.log('Lecture du fichier CSV terminée.');
      });
  } else if (fileExtension === 'xlsx') {
    // Pour les fichiers XLSX
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Ignorer l'en-tête
    data.shift();
    data.shift();

    for (const row of data) {
      await processRow(row);
    }

    console.log('Lecture du fichier XLSX terminée.');
  } else {
    console.error('Format de fichier non pris en charge.');
  }
}

// Fonction pour traiter chaque ligne du fichier
async function processRow(row) {
  const nomJeu = row[0];
  const editeur = row[1];
  const type=row[2];
  const notice = row[3];
  const zonePlan = row[4];
  const zoneBenevole = row[5];
  const aAnimer = row[6] === 'oui';
  const recu = row[7] === 'oui';
  const video = row[8];

  try {
    //on regarde si un jeu a été créé, 
    //si c'est pas le cas on le crée en récupérant son id
    const [jeu, jeuCreated] = await Jeu.findOrCreate({
      where: { nom: nomJeu }, // Ajoutez les conditions de recherche ici
      defaults: {
        editeur: editeur,
        type: type,
        notice: notice,
        aanimer: aAnimer,
        recu: recu,
        video: video,
      },
    });

    const idJeu=jeu.idjeu

    //on récupère l'id du poste animation jeu
    const poste = await Poste.findOne({
      where: {
        nom: "Animation jeux",
      },
    });
    
    const idPoste = poste.idposte
    //on regarde si une zone bénévole a été créée, 
    //si c'est pas le cas on la crée en récupérant son id
    console.log(zoneBenevole)
    console.log(zonePlan)
    console.log(zonePlan==zoneBenevole)
    const [newZoneBenevole, newZoneBenevoleCreated] = await Espace.findOrCreate({
        where: { nom:zoneBenevole },
        defaults:{
          idposte : idPoste
        }
    });
    const idZoneBenevole = newZoneBenevole.idzonebenevole

    const [jeuEspace, JeuEspaceCreated] = await JeuEspace.findOrCreate({
        where: {idjeu: idJeu,
        idzonebenevole: idZoneBenevole,}
    });
    
    console.log("voila " +jeuEspace.idjeu, jeuEspace.idzonebenevole);
      
      //si c'est une nouvelle zone, on vérifie si sa zone plan correspondante a été créée aussi
      //s'il s'agit d'une zone sans sous-zones (zoneBenevole==zonePlan) ou une zone avec des sous-zones 
    if(newZoneBenevoleCreated){
        if(zoneBenevole==zonePlan){
            console.log("c'est egal")
            await Espace.update(
            { idzoneplan: idZoneBenevole },
            { where: { idzonebenevole: idZoneBenevole } }
            );
        }
        else{
            console.log("c'est pas egal")
            const [newZonePlan, newZonePlanCreated] = await Espace.findOrCreate({
            where: { nom:zonePlan },
            defaults:{
                idposte : idPoste
            }
            })
            const idZonePlan=newZonePlan.idzonebenevole
            console.log(newZonePlan.nom)
            console.log(newZonePlanCreated)

            if(newZonePlanCreated){
                const updatedZonePlan = await Espace.update(
                    { idzoneplan: idZonePlan },
                    { where: { idzonebenevole: idZonePlan } }
                );  
                console.log(updatedZonePlan.idzonebenevole, updatedZonePlan.nom,updatedZonePlan.idzoneplan)
            }

            const updatedZoneBenevole=await Espace.update(
            { idzoneplan: idZonePlan },
            { where: { idzonebenevole: idZoneBenevole } }
            );
            console.log(updatedZoneBenevole.idzonebenevole, updatedZoneBenevole.nom,updatedZoneBenevole.idzoneplan)
        }
    }
  
  
    
}catch{

}
}


readFile('C:\\Users\\he_ji\\Desktop\\AWI\\Projet\\awi_csv.xlsx');
*/

module.exports = { Festival , Creneau, Jeu, JeuEspace,Poste,PosteCreneau,Inscription,Supervision, User}