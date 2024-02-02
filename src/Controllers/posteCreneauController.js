const express = require('express');
const { Creneau,Poste,PosteCreneau,Inscription, FlexibleUserCreneau } = require('../Models/models');
const { Op } = require('sequelize');


exports.getAllPostsCreneux = async (req, res) => {
    try {
        const posts = await Poste.findAll({
            include: [
                {
                    model: PosteCreneau,
                    include: [
                        {
                            model: Creneau,
                        },
                    ],
                },
            ],
        });
        
        res.status(200).json({ posts: posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

exports.createPostCreneaux = async (req, res) => {

  try {

  const { idfestival, postes, intervalle, heure_debut, heure_fin, date_debut, date_fin } = req.body;
  console.log(idfestival);

  const jours = getDatesBetweenDates(new Date(date_debut), new Date(date_fin));
  console.log(jours);

  for (const jour of jours) {
    const heuresCreneaux = generateHeuresCreneaux(heure_debut, heure_fin, intervalle);
    console.log(heuresCreneaux)
    
    for (const heureCreneau of heuresCreneaux) {
      const creneau = await Creneau.create({
        jour: jour,
        heure_debut: heureCreneau.heure_debut,
        heure_fin: heureCreneau.heure_fin,
        idfestival: idfestival,
      })

      // Créez les postes pour le créneau
      const posteCreneaux = postes.map(async (poste) => {
       await PosteCreneau.create({
          idfestival : idfestival,
          idposte: poste.id,
          idcreneau: creneau.idcreneau,
          capacite: poste.capacite,
          capacite_restante: poste.capacite,
        });
      });
    
      //await Promise.all(posteCreneaux);
    }
  }
        res.status(201).json({ message: 'Créneau créé avec succès' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
      }

}

const getDatesBetweenDates = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
  
    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  };
  
const generateHeuresCreneaux = (heure_debut, heure_fin, intervalle) => {
    const heuresCreneaux = [];
    let currentHeure = new Date(`2023-01-01 ${heure_debut}`);
    const endHeure = new Date(`2023-01-01 ${heure_fin}`);
  
    while (currentHeure < endHeure) {
      let nextHeure = new Date(currentHeure);
      nextHeure.setMinutes(currentHeure.getMinutes() + intervalle * 60);

      // Vérifiez si nextHeure dépasse endHeure, si oui, mettez-le égal à endHeure
      if (nextHeure > endHeure) {
        nextHeure = new Date(endHeure);
      }
  
      heuresCreneaux.push({
        heure_debut: currentHeure.toLocaleTimeString('en-US', { hour12: false }),
        heure_fin: nextHeure.toLocaleTimeString('en-US', { hour12: false }),
      });
  
      // Mettez à jour la date de début pour chaque itération
      currentHeure = new Date(nextHeure);
    }
  
    return heuresCreneaux;
};


exports.getPostesCreneauxByFestival = async (req, res) => {
  const { idfestival } = req.params;
  try {
    const creneaux = await PosteCreneau.findAll({
      include: [
        {
            model: Creneau,
            where: { idfestival: idfestival },
            order: [['jour', 'ASC'], ['heure_debut', 'ASC']],
        },
        {
            model: Poste,
            order: [['idposte', 'ASC']],
        },
        {
          model: Inscription,
        }
    ],
    order: [['idcreneau', 'ASC']],
    });

    res.status(200).json({ find: true, posteCreneau: creneaux });
  } catch (error) {
    console.error(error);
    res.status(500).json({ find : false, message: 'Erreur serveur' });
  }
};

exports.getAllPostsByFestivals = async (req, res) => {
  try {
    const { idfestival } = req.params;
    // Select idposte from PosteCreneau where idfestival = idfestival
    const postesCreneaux = await PosteCreneau.findAll({ where: { idfestival: idfestival } });

    // Use a Set to ensure distinct idposte values
    const idPostesSet = new Set(postesCreneaux.map(poste => poste.idposte));

    // Convert the Set back to an array
    const idPostes = Array.from(idPostesSet);

    // Fetch individual Poste records based on idposte
    const postes = [];
    for (const id of idPostes) {
      const poste = await Poste.findOne({ where: { idposte: id } });
      postes.push(poste);
    }
    postes.sort((a, b) => a.idposte - b.idposte);

    res.status(200).json({ postes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getCreneauxByFestival = async (req, res) => {
  const { idfestival } = req.params;
  try {
    const creneaux = await Creneau.findAll({
      where: { idfestival: idfestival },
      order: [['jour', 'ASC'], ['heure_debut', 'ASC']],
    });
    if(creneaux){
      res.status(200).json({ find: true, creneaux: creneaux });
    }else{
      res.json({ find: false, message: 'Aucun créneau trouvé' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ find : false, message: 'Erreur serveur' });
  }
}


exports.updateHoraire = async (req, res) => {
  try {
    const { idfestival, jour, heure_debut, heure_fin, newHeure_debut, newHeure_fin } = req.body;
    const heure_debut_with_seconds = heure_debut + ":00";
    const heure_fin_with_seconds = heure_fin + ":00";

    const creneau = await Creneau.findOne({
      where: {
        idfestival: idfestival,
        jour:{ [Op.gte]: new Date(jour) },
        heure_debut: heure_debut_with_seconds,
        heure_fin: heure_fin_with_seconds,
      },
    });

    if (creneau) {
      
      creneau.heure_debut = newHeure_debut+":00";
      creneau.heure_fin = newHeure_fin+":00";
      await creneau.save();
      res.status(200).json({ success: true, message: 'Horaire mis à jour' });
    } else {
      res.status(404).json({ success: false, message: 'Créneau non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

exports.getPostesCreneauxByZoneFestival = async (req, res) => {
  const { idfestival, idzonebenevole, idcreneau } = req.body;
  console.log(req.body);
  try {
    const creneaux = await PosteCreneau.findOne({
      include: [
        {
            model: Creneau,
            where: { idfestival: idfestival },
            order: [['jour', 'ASC'], ['heure_debut', 'ASC']],
        },
        {
            model: Poste,
            order: [['idposte', 'ASC']],
        }
    ],
    where: { idzonebenevole: idzonebenevole, idcreneau: idcreneau },
    order: [['idcreneau', 'ASC']],
    });

    res.status(200).json({ find: true, posteCreneau: creneaux });
  } catch (error) {
    console.error(error);
    res.status(500).json({ find : false, message: 'Erreur serveur' });
  }
}
