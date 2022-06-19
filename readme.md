# Projet 7 Openclassrooms
__Créez un réseau social d’entreprise__

------

[Lien du projet déployé](https://seb-etc-groupomania.herokuapp.com)

## Mise en place du backend:

1. Installation des dépendances:  
Depuis le `répertoire racine` éxécuter la commande
```
npm install
```
2. Mise en place des variables d'environnement:  
Depuis le `répertoire racine` créer un fichier .env en suivant le modèle de .env.example. 

3. Lancement du serveur backend:  
Depuis le `répertoire racine` éxécuter la commande
```
npm start
```
------

## Mise en place de la base de donnée:

La base de donnée sera automatiquement synchronisée avec les modèles Sequelize au lancement du serveur backend.  
Pour forcer la synchronisation et effacer les tables existantes modifier  (server.js - ligne: 28)
```
db.sequelize.sync({ force: false })
``` 
en
```
db.sequelize.sync({ force: true })
```
**Attention! Cette action peut être destructive et n'est pas conseillée dans un contexte de production.**

------

## Mise en place du frontend:

1. Installation des dépendances:  
Depuis le dossier `client` éxécuter la commande
```
npm install
```
2. Lancement du serveur backend:  
Depuis le dossier `client` éxécuter la commande
```
npm start
```

------

## Scénario:

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

------

## Compétences évaluées:

* Authentifier un utilisateur et maintenir sa session
* Implémenter un stockage de données sécurisé en utilisant une base de données
* Développer l’interface d’un site web grâce à un framework front-end

----------

ETCHETO Sébastien


