const Jeu=require("../Models/Jeu")
const Espace=require("../Models/Espace")
const JeuEspace=require("../Models/JeuEspace")
const Poste=require("../Models/Poste")
const PosteCreneau=require("../Models/PosteCreneau")
const Creneau=require("../Models/Creneau")
const {Sequelize} = require('sequelize');
const Inscription=require("../Models/Inscription")

exports.importFileToDB = async (req, res) => {
  const{rows, lastRow ,idfestival}=req.body

  try{
    await extractJeuEspace(rows, idfestival);
    if(lastRow){
      await creerEspaceForPoste()
      await updatePosteCreneauForJeu(idfestival)
    }
 //console.log("Lecture du fichier XLSX terminée2.");
  res.status(200).json({success:true, message:"Importation réussie"});
  }catch (error){
  res.status(500).json({success:false, message:error});
  }
}

async function updatePosteCreneauForJeu(idfestival) {
  const postCreneau = await PosteCreneau.findOne({
    where: {idposte: 1},
  })
  
  const capacite = postCreneau? postCreneau.toJSON().capacite:2
  
  let creneaux = await Creneau.findAll({
    where: {idfestival: idfestival},
  })
  
  
  await PosteCreneau.destroy({
    where: {idposte: 1},
    include: [
      {
        model: Creneau,
        where: {idfestival: idfestival,},
      },
    ]
  });
  
  let jeuxEspaces = await JeuEspace.findAll({
    attributes: ['idzonebenevole'],
    group: ['idzonebenevole'],
  });
  
  
  for (let jeuEspace of jeuxEspaces) {
    for (let creneau of creneaux) {
      creneau=creneau.toJSON()

      const idzonebenevole = jeuEspace.idzonebenevole;
      const pc = await PosteCreneau.create({
        idposte: 1,
        idcreneau: creneau.idcreneau,
        idzonebenevole: idzonebenevole,
        capacite: capacite,
        capacite_restante: capacite,
        idfestival : idfestival
      });
      console.log("creer pour : ", jeuEspace.idzonebenevole, creneau.idcreneau)
      let inscriptions = await Inscription.findAll({
        where: {   
          idposte: 1,
          idzonebenevole: idzonebenevole, 
          idcreneau: creneau.idcreneau
        },
      })

      if(inscriptions.length>0){
        let capacite_restante = capacite - inscriptions.length
        if(capacite_restante<0){
          capacite_restante=0
        }
        PosteCreneau.update(
          { capacite_restante: capacite_restante,
          },
          {where: {
            idposte: 1,
            idzonebenevole: idzonebenevole, 
            idcreneau: creneau.idcreneau
          }
        }
        )
      }
    }
  }

}

async function creerEspaceForPoste() {

  //Creer zoneBenevole pour d'autres postes
   const postes = await Poste.findAll({
     where: {
       nom: {
         [Sequelize.Op.ne]: "Animation jeux",
       },
     },
   });

   let idZoneBenevole = 20000;
   
   for (const poste of postes) {
    console.log(idZoneBenevole+poste.idposte)
    await Espace.findOrCreate({
      where: { nom: poste.nom },
      defaults: {
        idzonebenevole: idZoneBenevole+poste.idposte,
        idposte: poste.idposte,
      },
    });

    await PosteCreneau.update(
      { idzonebenevole: idZoneBenevole+poste.idposte },
      { where: { idposte: poste.idposte } }
    );

    //idZoneBenevole = idZoneBenevole + 1;
    
  }
}

async function extractJeuEspace(row, festival) {
/* ************************Recuperation donnes*************************** */
  const id_Jeu = row[0];
  const nom = row[1];
  const auteur = row[2];
  const editeur = row[3];
  const nbJoueurs = row[4];
  const ageMin = row[5];
  const duree = row[6];
  const type = row[7];
  const notice = row[8];
  const aAnimer = row[12];
  const recu = row[13];
  const mecanismes = row[14];
  const themes = row[15];
  const tags = row[16];
  const description = row[17];
  const image = row[18];
  const logo = row[19];
  const video = row[20];
  
  const nomZonePlan = row[9];
  const nomZoneBenevole = row[10];
  const idzone = row[11];

  const idfestival=festival

 try {
   /* ************************ Creer ou update Jeu*************************** */
   const defaultJeuData = {
    idjeu: id_Jeu,
    nom: nom,
    auteur: auteur,
    editeur: editeur,
    nbjoueurs: nbJoueurs,
    agemin: ageMin,
    duree: duree,
    type: type,
    notice: notice,
    aanimer: aAnimer.toLowerCase() === "oui",
    recu: recu.toLowerCase() === "oui",
    mecanismes: mecanismes,
    themes: themes,
    tags: tags,
    description: description,
    image: image,
    logo: logo,
    video: video
  };
  
  let jeu = await Jeu.findOne({ where: { idjeu: id_Jeu } });
  if (jeu) {
    jeu=jeu.toJSON()
    await Jeu.update(defaultJeuData, { where: { idjeu: id_Jeu } });
    console.log("jeu existe, update")
  } else {
    [jeu, jeuCreated] = await Jeu.findOrCreate({
      where: { idjeu: id_Jeu },
      defaults: defaultJeuData,
    });
    console.log("jeu statut", jeuCreated, jeu.idjeu)
  }

   const idJeu=jeu.idjeu
  
    /* ************************ Recupere Poste pour creation de Espace *************************** */
   const poste = await Poste.findOne({
     where: {
       nom: "Animation jeux",
     },
   });
   
   const idPoste = poste.idposte

    /* ************************ Creer ou update ZoneBenevole  *************************** */
   let idzoneplan
   let zoneBenevole

   if(nomZoneBenevole==null){
      idzoneplan=idzone
    }else{
      idzoneplan=idzone+10000

      zoneBenevole = await Espace.findOne({where: { idzonebenevole:idzone }})
      
      if(zoneBenevole){
          zoneBenevole=zoneBenevole.toJSON()
          await Espace.update(
              { nom: nomZoneBenevole },
              { where: { idzonebenevole: idzone } }
          );
          console.log("zoneBenevole existe, update")
      }else{
            [zoneBenevole, zoneBenevoleCreated] = await Espace.findOrCreate({
                where: { idzonebenevole:idzone },
                defaults:{
                  nom: nomZoneBenevole,
                  idposte : idPoste,
                  idzonebenevole:idzone
                }
            });
            console.log("zoneBenevole statut", zoneBenevoleCreated,zoneBenevole.idzonebenevole)
      }
  }
  /* ************************ Creer ou update ZonePlan  *************************** */
  let zonePlan = await Espace.findOne({where: { nom:nomZonePlan }})
  
  if(!zonePlan){
        [zonePlan, zonePlanCreated] = await Espace.findOrCreate({
            where: { idzonebenevole:idzoneplan },
            defaults:{
              nom: nomZonePlan,
              idposte : idPoste,
              idzoneplan:null,
              idzonebenevole:idzoneplan
            }
        });
      console.log("zonePlan statut : ", zonePlanCreated,zonePlan.idzonebenevole)
  }

  /* ************************ update ZoneBenevole avec ZonePlan si besoin  *************************** */

  if(zoneBenevole){
    await Espace.update(
        { idzoneplan: zonePlan.idzonebenevole },
        { where: { idzonebenevole: idzone } }
    );
  }

  /* ************************ Creer ou update JeuEspace  *************************** */

  let jeuEspace= await JeuEspace.findOne({where: { idjeu: idJeu, idfestival: idfestival  }})
  
  if(jeuEspace){
    jeuEspace=jeuEspace.toJSON()
    await JeuEspace.update(
        { idzonebenevole: idzone },
        { where: { idjeu: idJeu } }
    );
    console.log("jeuEspace existe, update")
  }else{
    [jeuEspace, jeuEspaceCreated] = await JeuEspace.findOrCreate({
        where: { idjeu: idJeu },
        defaults:{
          idzonebenevole : idzone,
          idfestival : idfestival
        }
    });
    console.log("jeuEspace statut", jeuEspaceCreated,jeuEspace.idjeuespace)
  }

}catch (error){ 
  console.log(error)
}
}
 