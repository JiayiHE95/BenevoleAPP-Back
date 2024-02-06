DROP TABLE IF EXISTS flexible_user_creneau CASCADE;
DROP TABLE IF EXISTS poste_creneau CASCADE;
DROP TABLE IF EXISTS jeu_espace CASCADE;
DROP TABLE IF EXISTS supervision CASCADE;
DROP TABLE IF EXISTS inscription CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS festival CASCADE;
DROP TABLE IF EXISTS creneau CASCADE;
DROP TABLE IF EXISTS jeu CASCADE;
DROP TABLE IF EXISTS poste CASCADE;
DROP TABLE IF EXISTS espace CASCADE;
DROP TABLE IF EXISTS notification CASCADE;

CREATE TABLE "user" (
    idUser SERIAL PRIMARY KEY,
    pseudo VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    reset_password_token VARCHAR(255),
    tel VARCHAR(15) NOT NULL,
    mail VARCHAR(100) NOT NULL,
    association VARCHAR(50),
    taille_Tshirt VARCHAR(10)CHECK (taille_Tshirt IN ('XS', 'S', 'M', 'L', 'XL', 'XXL')) NOT NULL,
    est_vegetarien BOOLEAN,
    hebergement VARCHAR(50),
    jeu_prefere VARCHAR(50),
    role VARCHAR(20) CHECK (role IN ('ADMIN', 'BENEVOLE', 'REFERENT')) NOT NULL
);


INSERT INTO public."user" (pseudo, nom, prenom, mdp, tel, mail,taille_tshirt, role)
VALUES ('Chachou', 'Morchipont', 'Charlene', '$2b$10$zX2yTtTu4twCKG8ru5uXIefsr5de6YeqCMef4qUZs5LLLhARHKKxW', '123456789', 'charlene.morchipont@etu.umontpellier.fr','M', 'BENEVOLE');

INSERT INTO public."user" (pseudo, nom, prenom, mdp, tel, mail,taille_tshirt, role)
VALUES ('Jiayou', 'He', 'Jiayi', '$2b$10$zX2yTtTu4twCKG8ru5uXIefsr5de6YeqCMef4qUZs5LLLhARHKKxW', '123456789', 'jiayi.he@etu.umontpellier.fr','XS', 'BENEVOLE');


INSERT INTO public."user" (pseudo, nom, prenom, mdp, tel, mail,taille_tshirt, role)
VALUES ('Chef Algo', 'Fiorio', 'Christophe', '$2b$10$zX2yTtTu4twCKG8ru5uXIefsr5de6YeqCMef4qUZs5LLLhARHKKxW', '123456789', 'christophe.fiorio@umontpellier.fr','M', 'ADMIN');


CREATE TABLE festival ( 
    idFestival SERIAL PRIMARY KEY ,
    annee INTEGER NOT NULL,
    nom VARCHAR(255) NOT NULL,
    valide BOOLEAN NOT NULL DEFAULT FALSE,
    date_debut DATE,
    date_fin DATE
    -- Ajoutez d'autres colonnes selon vos besoins
);


CREATE TABLE creneau (
    idCreneau SERIAL PRIMARY KEY ,
    jour DATE NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    intervalle INTEGER NOT NULL DEFAULT 2,
    idFestival INTEGER,
    FOREIGN KEY (idFestival) REFERENCES festival(idFestival)ON DELETE CASCADE
);

CREATE TABLE jeu (
    idJeu SERIAL PRIMARY KEY ,
    nom VARCHAR(255) NOT NULL,
    auteur VARCHAR(255),
    editeur VARCHAR(255),
    nbJoueurs VARCHAR(255),
    ageMin VARCHAR(255),
    duree VARCHAR(255),
    type VARCHAR(255),
    notice VARCHAR(255),
    aAnimer BOOLEAN,
    recu BOOLEAN,
    mecanismes VARCHAR(255),
    themes VARCHAR(255),
    tags VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    Logo VARCHAR(255),
    video VARCHAR(255)
);

CREATE TABLE poste (
    idPoste SERIAL PRIMARY KEY ,
    nom VARCHAR(255) NOT NULL,
    description TEXT
);

INSERT INTO poste (nom, description) VALUES
  ('Animation jeux', 
  E'Tu as du bagout et tu aimes les jeux courts qui mettent de l’ambiance ? Tu n’as pas peur des explications longues pour les jeux experts ? Tu as gardé ton âme d’enfant ? Tu aimes expliquer les jeux en tout genre ?\n
Qui dit festival du jeu, dit jeux et donc règles de jeu. Ton rôle sera d’expliquer les règles des jeux présents dans la zone qui te sera affectée (avec 1 ou 2 autres camarades), de regarder de loin que tout se passe bien et de remettre les jeux en place pour permettre le lancement d’une nouvelle partie.\n
Le festival est divisé en espaces regroupant plusieurs jeux que l’équipe d’animation sur la zone doit connaître (voir plan interactif). Les espaces sont liés aux réservations des éditeurs, on essaie de regrouper les éditeurs de jeux enfants ensemble, de même pour les éditeurs de jeux d’ambiance, mais nombreux sont les éditeurs polyvalents on retrouve tout type de jeux (enfants, ambiance, famille, experts) un peu partout.\n
A toi, animateur de jeu en herbe ou confirmé, nous avons préparé un petit guide pour que tu te sentes à l’aise avec les explications de règles de jeu : le GIERF.\n'
  
  ),
  ('Accueil public',
  E'Tu as le contact facile, le sens de l’accueil et tu es enthousiaste ? \n
A l’entrée du festival, ton rôle est d’accueillir les visiteurs, de leur donner une étiquette avec leur nom ou pseudo et de leur présenter rapidement le festival et tout ce qu’ils pourront trouver sur place.\n

Tu seras également chargé(e) d’orienter les bénévoles vers l’accueil bénévoles, et les personnes sourdes et malentendantes vers le point accueil ou les ballons LSF.\n

Le Point info se trouve derrière l’accueil et permet de prendre un peu plus de temps pour renseigner les visiteurs. On y trouve le stand tombola (voir plus loin pour le descriptif du poste), la vente des tickets de restauration et les objets trouvés.'
  ),
  ('Accueil VIP',
  E'Tu n’aimes pas trop le contact avec le public et préfères veiller au bien-être de notre équipe de bénévoles ?\n

Un espace est réservé aux bénévoles, éditeurs et invités en dehors des espaces ouverts au public. Ils peuvent y déposer leurs affaires, se reposer (un peu) et se restaurer.\n

Ton rôle sera de gérer cet espace, de répondre aux questions et de surveiller la salle. En ton absence, si personne ne peut prendre le relais, la salle sera fermée à clé. \n

Plusieurs missions t’y attendent : \n

accueillir les bénévoles, leur distribuer badges et t-shirts (et vérifier qu’ils les rendent bien après), prendre leur commande pour leur repas, veiller à ce qu’il y ait toujours des boissons et des gâteaux/fruits à disposition de nos troupes !\n
accueillir les éditeurs, leur distribuer leurs badges, leur indiquer l’emplacement de leur espaces, vérifier les commandes des repas, etc.\n
accueillir les invités et auteurs de prototypes et les orienter vers leur personne-contact.\n'
  ),
  ('Vente restauration',
  E'Tu es réactif, énergique et ton jeu préféré est Kitchen rush ?\n

Rejoins l’équipe de l’espace restauration pour servir boissons et en-cas sucrés ou salés aux visi-joueurs affamés !\n

Le vente se fait uniquement avec des tickets en prévente à l’entrée de la buvette ou au point info. Cela permet à l’équipe de restauration de ne pas avoir à gérer d’argent pendant le service.\n

Une vente ambulante est également proposée.
  '),
  ('Cuisine',
  E'Tu n’aimes pas trop le contact avec le public et préfères agir en coulisses ?\n

Comme son nom l’indique, ce poste est essentiel pour permettre à nos visiteurs et à nos bénévoles de se nourrir.\n

Sandwichs aux recettes testées et validées par les organisateurs, croque-monsieur, crêpes au sucre ou au chocolat, voilà un aperçu de ce qui t’attend dans la cuisine.\n  '),
  ('Tombola',
  E'Tu es organisé, à l’aise avec le public et pas mauvais en calcul mental ?\n

Le stand tombola est présent au point info mais tu pourras aller proposer des billets directement dans la salle.\n

Tu organiseras plusieurs tirages pendant le festival. Les dotations sont fournies par les éditeurs et réparties équitablement entre les différents tirages.\n

Une main innocente procèdera au tirage tandis que tu annonceras les heureux gagnants au micro. Si les lots ne sont pas retirés le jour même, tu transmettras à ta référente pour contacter le vainqueur.
  '),
  ('Forum associations', 
  E'Longtemps associé au point info, cet espace présente les différentes associations ludiques de la région montpelliéraine, leurs activités, leurs lieux et horaires de rendez-vous, etc.\n

Ton rôle sera de renseigner les visi-joueurs qui souhaiteraient poursuivre une activité ludique en association et de leur fournir les informations nécessaires pour contacter les associations.
  ');

CREATE TABLE espace (
    idZoneBenevole SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    idPoste INTEGER NOT NULL,
    idZonePlan INTEGER DEFAULT NULL,
    FOREIGN KEY (idPoste) REFERENCES poste(idPoste),
    FOREIGN KEY (idZonePlan) REFERENCES espace(idZoneBenevole) ON DELETE SET NULL
);

CREATE TABLE poste_creneau (
    idPC SERIAL PRIMARY KEY,
    idPoste INTEGER,
    idCreneau INTEGER,
    idZoneBenevole INTEGER DEFAULT NULL,
    idFestival INTEGER,
    capacite INTEGER,
    capacite_restante INTEGER,
    FOREIGN KEY (idPoste) REFERENCES poste(idPoste),
    FOREIGN KEY (idCreneau) REFERENCES creneau(idCreneau),
    FOREIGN KEY (idZoneBenevole) REFERENCES espace(idZoneBenevole),
    FOREIGN KEY (idFestival) REFERENCES festival(idFestival) ON DELETE CASCADE
);

CREATE TABLE inscription (
   idinscription SERIAL PRIMARY KEY,
   idPoste INTEGER,
   idCreneau INTEGER,
   idUser INTEGER,
   idfestival INTEGER,
   idZoneBenevole INTEGER,
   valide BOOLEAN NOT NULL DEFAULT FALSE,
   FOREIGN KEY (idPoste) REFERENCES poste(idPoste),
   FOREIGN KEY (idCreneau) REFERENCES creneau(idCreneau),
   FOREIGN KEY (idUser) REFERENCES "user"(idUser),
   FOREIGN KEY (idZoneBenevole) REFERENCES espace(idZoneBenevole),
    FOREIGN KEY (idfestival) REFERENCES festival(idfestival) ON DELETE CASCADE
);

CREATE TABLE supervision (
    idUser INTEGER,
    idPoste INTEGER,
    idFestival INTEGER,
    PRIMARY KEY (idPoste, idUser, idFestival),
    FOREIGN KEY (idUser) REFERENCES "user"(idUser),
    FOREIGN KEY (idPoste) REFERENCES poste(idPoste),
    FOREIGN KEY (idFestival) REFERENCES festival(idFestival) ON DELETE CASCADE
);

CREATE TABLE jeu_espace (
    idJeu INTEGER,
    idZoneBenevole INTEGER,
    idFestival INTEGER,
    PRIMARY KEY (idZoneBenevole, idJeu, idFestival),
    FOREIGN KEY (idJeu) REFERENCES jeu(idJeu),
    FOREIGN KEY (idZoneBenevole) REFERENCES espace(idZoneBenevole),
    FOREIGN KEY (idFestival) REFERENCES festival(idFestival) ON DELETE  CASCADE
);

CREATE TABLE flexible_user_creneau (
    idUser INTEGER,
    idCreneau INTEGER,
    PRIMARY KEY (idUser, idCreneau),
    FOREIGN KEY (idUser) REFERENCES "user"(idUser),
    FOREIGN KEY (idCreneau) REFERENCES creneau(idCreneau)
);

CREATE TABLE notification (
    idNotification SERIAL PRIMARY KEY,
    idUser INTEGER,
    idFestival INTEGER,
    label TEXT,
    FOREIGN KEY (idFestival) REFERENCES festival(idFestival)ON DELETE  CASCADE,
    FOREIGN KEY (idUser) REFERENCES "user"(idUser)ON DELETE  CASCADE
);


/*
pour tester, avec petite liste
insert into inscription VALUES(1,1,1,197, false);
insert into inscription VALUES(1,1,3,197, false);
update poste_creneau set capacite_restante = capacite_restante-2 where idPoste = 1 and idCreneau = 1 and idZoneBenevole = 197;
*/