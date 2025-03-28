# Aperçu du Projet
Ce projet est une application web construite avec les technologies suivantes :

- TypeScript
- JavaScript
- React
- Next.js
- Tailwind CSS
- NextAuth.js pour l'authentification

## Structure du Projet
Le projet est organisé comme suit :

- `app/` : Contient les pages principales de l'application et les composants.
- `components/` : Composants React réutilisables.
- `styles/` : Styles CSS globaux.
- `app/api/auth/` : Routes API et types liés à l'authentification.

## Fonctionnalités
- Authentification avec NextAuth.js
- Création de compte
- Connexion
- Déconnexion
- Accès à une API protégée

## API
### Routes API

- **POST /api/auth/register** : Inscription d'un nouvel utilisateur.
- **POST /api/auth/login** : Connexion d'un utilisateur existant.
- **GET /api/auth/session** : Récupération de la session utilisateur actuelle.
- **POST /api/auth/signout** : Déconnexion de l'utilisateur.

Ces routes sont gérées par NextAuth.js pour l'authentification et la gestion des sessions.

- **GET /api/movies** : Récupération de la liste des films.
- **GET /api/movies/\[id\]** : Récupération des informations d'un film spécifique.
- **POST /api/movies** : Ajout d'un nouveau film.
- **PUT /api/movies/\[id\]** : Mise à jour des informations d'un film spécifique.
- **DELETE /api/movies/\[id\]** : Suppression d'un film spécifique.
- **GET /api/theaters** : Récupération de la liste des cinémas.
- **GET /api/theaters/\[id\]** : Récupération des informations d'un cinéma spécifique.
- **POST /api/theaters** : Ajout d'un nouveau cinéma.
- **PUT /api/theaters/\[id\]** : Mise à jour des informations d'un cinéma spécifique.
- **DELETE /api/theaters/\[id\]** : Suppression d'un cinéma spécifique.
- **GET /api/movies/comments** : Récupération de la liste des commentaires.
- **GET /api/movies/comments/\[id\]** : Récupération des informations d'un commentaire spécifique.
- **POST /api/movies/comments/\[id\]** : Ajout d'un nouveau commentaire.
- **PUT /api/movies/comments/\[id\]** : Mise à jour des informations d'un commentaire spécifique.
- **DELETE /api/movies/comments/\[id\]** : Suppression d'un commentaire spécifique.

Ces routes sont gérées par Next.js et permettent de gérer les données de l'application.

## Installation
Clonez le dépôt :
```sh
git clone <URL_DU_DEPOT>

cd <NOM_DU_DOSSIER>
```

Installez les dépendances :
```sh
npm install
```

## Configuration
Créez un fichier `.env.local` à la racine du projet et ajoutez les variables d'environnement suivantes :
```sh
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=secret
NEXTAUTH_URL=http://localhost:3000
```

## Démarrage
Pour démarrer l'application en mode développement :
```sh
npm run dev
```

L'application sera accessible à l'adresse suivante : [http://localhost:3000](http://localhost:3000)

## Déploiement

Pour déployer l'application, vous pouvez utiliser Vercel ou un autre service de déploiement.

