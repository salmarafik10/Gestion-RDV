# 🏥 Système de Gestion de Rendez-vous Médicaux

Une application web complète de gestion de rendez-vous pour un cabinet de physiothérapie, développée avec React.js et Node.js.

## 📋 Table des matières

- [Aperçu du projet]
- [Fonctionnalités]
- [Technologies utilisées]
- [Installation]
- [Configuration]
- [Structure du projet]
- [API Endpoints]
- [Contribution]
- [Licence]

## 🎯 Aperçu du projet

Cette application permet aux patients de prendre des rendez-vous en ligne pour des services de physiothérapie, tout en offrant aux administrateurs un tableau de bord complet pour gérer l'établissement. L'application inclut un chatbot intelligent alimenté par l'API Gemini pour l'assistance client.

## ✨ Fonctionnalités

### 👥 **Interface Utilisateur**
- **Authentification sécurisée** avec JWT (connexion, inscription, réinitialisation mot de passe)
- **Page d'accueil** avec présentation des services et équipe
- **Catalogue des services** détaillé avec tarifs et descriptions
- **Système de réservation** en 4 étapes intuitives
- **Upload de prescriptions** médicales
- **Profil utilisateur** avec historique des rendez-vous
- **Chatbot intelligent** pour l'assistance patient

### 🛠️ **Panneau d'Administration**
- **Tableau de bord** avec statistiques en temps réel
- **Gestion des services** (CRUD complet)
- **Gestion des clients** et leurs informations
- **Gestion des rendez-vous** (planning, validation, annulation)
- **Modération des avis** clients
- **Graphiques de performance** (Chart.js)

### 🤖 **Chatbot Intelligent**
- **Assistant virtuel** alimenté par l'API Gemini
- **Réponses contextuelles** sur les services et horaires
- **Interface de chat** moderne et intuitive
- **Gestion des conversations** avec mémoire de session

## 🛠️ Technologies utilisées

### **Frontend**
- **React.js 19.1.0** - Interface utilisateur
- **React Router DOM 7.6.3** - Navigation
- **Axios 1.10.0** - Requêtes HTTP
- **Chart.js 4.5.0** - Graphiques et statistiques
- **React Icons 5.5.0** - Icônes
- **Bootstrap 5.3.7** - Framework CSS
- **CSS3** - Styles personnalisés

### **Backend**
- **Node.js** - Runtime JavaScript
- **Express.js 5.1.0** - Framework web
- **MySQL2 3.14.2** - Base de données
- **JWT 9.0.2** - Authentification
- **Bcryptjs 3.0.2** - Hachage des mots de passe
- **Multer 2.0.2** - Upload de fichiers
- **Nodemailer 7.0.5** - Envoi d'emails
- **CORS 2.8.5** - Gestion CORS

### **Services Externes**
- **API Gemini** - Intelligence artificielle pour le chatbot
- **MySQL** - Base de données relationnelle

## 🚀 Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- MySQL (version 8.0 ou supérieure)
- npm ou yarn

### 1. Cloner le repository
```bash
git clone https://github.com/votre-username/gestionrdv.git
cd gestionrdv
```

### 2. Installation des dépendances

#### Backend
```bash
cd Backend
npm install
```

#### Frontend
```bash
cd Frontend
npm install
```

### 3. Configuration de la base de données
```sql
CREATE DATABASE gestionrdv;
USE gestionrdv;

-- Tables principales
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('client', 'admin') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration INT NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    prescription_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id)
);
```

### 4. Configuration des variables d'environnement

Créer un fichier `.env` dans le dossier `Backend` :
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=gestionrdv
JWT_SECRET=votre_secret_jwt
GEMINI_API_KEY=votre_cle_api_gemini
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_email
```

### 5. Démarrage de l'application

#### Terminal 1 - Backend
```bash
cd Backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd Frontend
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
gestionrdv/
├── Backend/
│   ├── routes/           # Routes API
│   │   ├── auth.js       # Authentification
│   │   ├── appointments.js # Rendez-vous
│   │   ├── services.js   # Services
│   │   ├── feedback.js   # Avis
│   │   └── admin*.js     # Routes admin
│   ├── uploads/          # Fichiers uploadés
│   │   └── prescriptions/
│   ├── db.js            # Configuration DB
│   ├── index.js         # Serveur principal
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/   # Composants React
│   │   │   ├── admin/    # Composants admin
│   │   │   ├── chatbot/  # Chatbot
│   │   │   └── rdv/      # Réservation
│   │   ├── assets/       # Images et ressources
│   │   ├── App.js        # Composant principal
│   │   └── index.js      # Point d'entrée
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur
- `POST /api/auth/forgot-password` - Mot de passe oublié
- `POST /api/auth/reset-password` - Réinitialisation

### Rendez-vous
- `GET /api/appointments` - Liste des RDV
- `POST /api/appointments` - Créer un RDV
- `PUT /api/appointments/:id` - Modifier un RDV
- `DELETE /api/appointments/:id` - Supprimer un RDV

### Services
- `GET /api/services` - Liste des services
- `POST /api/services` - Créer un service (admin)
- `PUT /api/services/:id` - Modifier un service (admin)
- `DELETE /api/services/:id` - Supprimer un service (admin)

### Administration
- `GET /api/admin/stats/*` - Statistiques
- `GET /api/admin/clients` - Liste des clients
- `GET /api/admin/feedback` - Avis clients


### Upload de fichiers
- Gestion des prescriptions médicales avec Multer
- Validation des types de fichiers
- Stockage sécurisé dans le dossier uploads/

### Système de notifications
- Confirmations par email
- Rappels de rendez-vous
- Notifications de statut

### Responsive Design
- Interface adaptée mobile/tablette/desktop
- Navigation intuitive
- Optimisation des performances

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request


## 👨‍💻 Auteur

**Rafik Salma**
- LinkedIn: https://www.linkedin.com/in/salma-rafik-7655992b5

## 🙏 Remerciements

- API Gemini pour l'intelligence artificielle
- React.js et Node.js communautés
- Tous les contributeurs open source

---

⭐ N'hésitez pas à donner une étoile si ce projet vous a aidé !

