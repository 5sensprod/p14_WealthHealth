# HRnet - WealthHealth 🚀

WealthHealth est une importante société financière utilisant une application interne, HRnet, pour gérer les dossiers de ses employés. L'objectif principal de ce projet est de moderniser HRnet en le convertissant entièrement en React, en remplaçant l'ancienne version qui utilisait principalement jQuery.

## Objectifs du Projet 🎯

- Convertir entièrement l'application HRnet en React.
- Remplacer les plugins jQuery par des composants React modernes.
- Introduire un système de gestion d'état.
- Effectuer des tests de performance et comparer l'ancienne et la nouvelle version.

## Remplacement des Plugins jQuery 🔄

Voici la liste des plugins jQuery originaux et leurs remplacements en React :

- **Sélecteur de date :**
  - _Original_ : Plugin jQuery de sélection de date
  - _Remplacement_ : DatePicker personnalisé développé spécifiquement pour ce projet.
- **Fenêtre modale :**
  - _Original_ : jQuery.modal.js
  - _Remplacement_ : React Modal
- **Menus déroulants :**
  - _Original_ : Plugin jQuery pour les menus déroulants
  - _Remplacement_ : React Select
- **Tables de données :**
  - _Original_ : Plugin jQuery pour les tables de données
  - _Remplacement_ : React Table

## Prérequis 🚨

Pour faire fonctionner l'application HRnet, assurez-vous d'avoir les technologies suivantes installées :

- **Node.js** : version recommandée (la version mentionnée dans votre package.json)
- **Git**

## Installation et Lancement 🚀

1. **Clonage du dépôt :**

```bash
git clone https://github.com/5sensprod/p14_WealthHealt
cd p14_WealthHealth
npm install
```

2. **Lancement de l'application :**

```bash
npm start
```

Votre application devrait maintenant s'exécuter localement à l'adresse http://localhost:3000/
