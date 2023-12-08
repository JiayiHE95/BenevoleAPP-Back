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


CREATE TABLE festival (
    idFestival SERIAL PRIMARY KEY ,
    annee INTEGER NOT NULL,
    nom VARCHAR(255) UNIQUE,
    date_debut DATE,
    date_fin DATE
    -- Ajoutez d'autres colonnes selon vos besoins
);

CREATE TABLE creneau (
    idCreneau SERIAL PRIMARY KEY ,
    jour DATE NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL
);

-- Créneaux pour le 18 novembre
INSERT INTO creneau (jour, heure_debut, heure_fin) VALUES 
    ('2023-11-18', '09:00:00', '11:00:00'),
    ('2023-11-18', '11:00:00', '14:00:00'),
    ('2023-11-18', '14:00:00', '17:00:00'),
    ('2023-11-18', '17:00:00', '20:00:00'),
    ('2023-11-18', '20:00:00', '22:00:00');

-- Créneaux pour le 19 novembre
INSERT INTO creneau (jour, heure_debut, heure_fin) VALUES 
    ('2023-11-19', '09:00:00', '11:00:00'),
    ('2023-11-19', '11:00:00', '14:00:00'),
    ('2023-11-19', '14:00:00', '17:00:00'),
    ('2023-11-19', '17:00:00', '20:00:00');

CREATE TABLE jeu (
    idJeu SERIAL PRIMARY KEY ,
    nom VARCHAR(255) NOT NULL,
    editeur VARCHAR(255),
    type VARCHAR(255),
    recu BOOLEAN,
    aAnimer BOOLEAN,
    notice VARCHAR(255),
    video VARCHAR(255)
);

CREATE TABLE poste (
    idPoste SERIAL PRIMARY KEY ,
    nom VARCHAR(255) NOT NULL
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
    idPoste INTEGER,
    idCreneau INTEGER,
    idFestival INTEGER,
    capacite INTEGER,
    capacite_restante INTEGER,
    PRIMARY KEY (idPoste, idCreneau, idFestival),
    FOREIGN KEY (idPoste) REFERENCES poste(idPoste),
    FOREIGN KEY (idCreneau) REFERENCES creneau(idCreneau),
    FOREIGN KEY (idFestival) REFERENCES festival(idFestival)
);

CREATE TABLE inscription (
   idPoste INTEGER,
   idCreneau INTEGER,
   idUser INTEGER,
   idFestival INTEGER,
   PRIMARY KEY (idPoste, idCreneau, idUser, idFestival),
   FOREIGN KEY (idPoste) REFERENCES poste(idPoste),
   FOREIGN KEY (idCreneau) REFERENCES creneau(idCreneau),
   FOREIGN KEY (idUser) REFERENCES "user"(idUser),
   FOREIGN KEY (idFestival) REFERENCES festival(idFestival)
);

CREATE TABLE supervision (
    idUser INTEGER,
    idZoneBenevole INTEGER,
    PRIMARY KEY (idZoneBenevole, idUser),
    FOREIGN KEY (idUser) REFERENCES "user"(idUser),
    FOREIGN KEY (idZoneBenevole) REFERENCES espace(idZoneBenevole)
);

CREATE TABLE jeu_espace (
    idJeu INTEGER,
    idZoneBenevole INTEGER,
    PRIMARY KEY (idZoneBenevole, idJeu),
    FOREIGN KEY (idJeu) REFERENCES jeu(idJeu),
    FOREIGN KEY (idZoneBenevole) REFERENCES espace(idZoneBenevole)
)
