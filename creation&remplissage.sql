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
VALUES ('chachou', 'Morchipont', 'Charlene', '$2b$10$zX2yTtTu4twCKG8ru5uXIefsr5de6YeqCMef4qUZs5LLLhARHKKxW', '123', 'charlene.morchipont@etu.umontpellier.fr','M', 'ADMIN');

INSERT INTO public."user" (pseudo, nom, prenom, mdp, tel, mail,taille_tshirt, role)
VALUES ('jiayi', 'He', 'Jiayi', '$2b$10$zX2yTtTu4twCKG8ru5uXIefsr5de6YeqCMef4qUZs5LLLhARHKKxW', '123', 'jiayi.he@etu.umontpellier.fr','XS', 'BENEVOLE');


INSERT INTO public."user" (pseudo, nom, prenom, mdp, tel, mail,taille_tshirt, role)
VALUES ('benevole1', 'He', 'Jiayi', '$2b$10$zX2yTtTu4twCKG8ru5uXIefsr5de6YeqCMef4qUZs5LLLhARHKKxW', '123', 'test@etu.umontpellier.fr','XS', 'BENEVOLE');



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

INSERT INTO poste (nom) VALUES
  ('Animation jeux'),
  ('Accueil'),
  ('Vente restauration'),
  ('Cuisine'),
  ('Tombola'),
  ('Forum associations');

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