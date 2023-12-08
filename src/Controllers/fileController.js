const Jeu=require("../Models/Jeu")
const Espace=require("../Models/Espace")
const JeuEspace=require("../Models/JeuEspace")
const Poste=require("../Models/Poste")

exports.importFileToDB = async (req, res) => {
 const{rows}=req.body
try{
 for (let i = 2; i < rows.length; i++) {
  const row = rows[i];
  await extractJeuEspace(row);
 }
 res.status(200).json({success:true, message:"Importation réussie"});
}catch (error){
 res.status(500).json({success:false, message:error});
}
 console.log("Lecture du fichier XLSX terminée.");
}

async function extractJeuEspace(row) {
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
 
   const [newZoneBenevole, newZoneBenevoleCreated] = await Espace.findOrCreate({
       where: { nom:zoneBenevole },
       defaults:{
         idposte : idPoste
       }
   });
   const idZoneBenevole = newZoneBenevole.idzonebenevole

   const [jeuEspace, JeuEspaceCreated] = await JeuEspace.findOrCreate({
       where: {
       idjeu: idJeu,
       idzonebenevole: idZoneBenevole,}
   });
     
     //si c'est une nouvelle zone, on vérifie si sa zone plan correspondante a été créée aussi
     //s'il s'agit d'une zone sans sous-zones (zoneBenevole==zonePlan) ou une zone avec des sous-zones 
   if(newZoneBenevoleCreated){
       if(zoneBenevole==zonePlan){
           await Espace.update(
           { idzoneplan: idZoneBenevole },
           { where: { idzonebenevole: idZoneBenevole } }
           );
       }
       else{
           const [newZonePlan, newZonePlanCreated] = await Espace.findOrCreate({
           where: { nom:zonePlan },
           defaults:{
               idposte : idPoste
           }
           })

           const idZonePlan=newZonePlan.idzonebenevole

           if(newZonePlanCreated){
               const updatedZonePlan = await Espace.update(
                   { idzoneplan: idZonePlan },
                   { where: { idzonebenevole: idZonePlan } }
               );  
           }

           const updatedZoneBenevole=await Espace.update(
           { idzoneplan: idZonePlan },
           { where: { idzonebenevole: idZoneBenevole } }
           );
       }
   }
   
    
}catch (error){ //TODO

}
}
 