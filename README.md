# 🏋️‍♂️ PowerEvent - Application de Compétition de Powerlifting

Une application Angular moderne pour l'affichage spectateur lors de compétitions de powerlifting, optimisée pour diffusion HDMI sur TV.

## 🎯 Fonctionnalités

- **Chronomètre de 60 secondes** avec animations et effets visuels
- **Affichage du nom de l'athlète** avec transitions fluides
- **Navigation entre athlètes** avec boutons de contrôle
- **Chargement automatique** de la liste des athlètes depuis un fichier
- **Design responsive** optimisé pour grand écran TV
- **Animations modernes** avec Angular Animations

## 🚀 Installation et Configuration

### Prérequis
- Node.js 16+ 
- Angular CLI 16+

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd powerevent

# Installer les dépendances
npm install

# Lancer l'application
ng serve

# Accéder à l'application
http://localhost:4200
```

## 📝 Configuration des Athlètes

### Fichier `src/assets/athletes.txt`
Modifiez le fichier `src/assets/athletes.txt` pour ajouter vos athlètes :

```
Jean Martin
Sophie Dubois
Pierre Lefebvre
Marie Rousseau
Thomas Bernard
```

**Important** : Un nom par ligne, pas de lignes vides.

## 🎮 Utilisation

### Contrôles disponibles :
- **▶️ DÉMARRER** : Lance le chronomètre de 60 secondes
- **🔄 RESET** : Remet le chronomètre à 60 secondes
- **⏭️ SUIVANT** : Passe à l'athlète suivant (bouclé)

### États du chronomètre :
- **VERT** : Plus de 30 secondes restantes
- **JAUNE** : Entre 30 et 10 secondes
- **ROUGE** : Moins de 10 secondes (avec effet de pulsation)

## 🎨 Personnalisation

### Logo FTC
Remplacez le placeholder du logo en modifiant le code dans :
`src/app/spectator-display/spectator-display.component.html`

Changez cette section :
```html
<div class="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
  <span class="text-white font-black text-2xl tracking-wider">FTC</span>
</div>
```

Par votre image :
```html
<img src="assets/logo-ftc.png" alt="FTC Logo" class="w-20 h-20 rounded-xl shadow-2xl">
```

### Couleurs et Style
Les couleurs peuvent être modifiées dans :
- `tailwind.config.js` pour les couleurs Tailwind
- `src/app/spectator-display/spectator-display.component.css` pour les animations

### Durée du chronomètre
Modifiez la propriété `totalTime` dans :
`src/app/spectator-display/spectator-display.component.ts`

## 📱 Optimisation TV/HDMI

### Résolution recommandée :
- 1920x1080 (Full HD)
- 3840x2160 (4K)

### Configuration navigateur :
- Mode plein écran (F11)
- Masquer les barres d'outils
- Désactiver la mise en veille

### CSS pour masquer le curseur :
Ajoutez dans `src/styles.css` :
```css
* {
  cursor: none !important;
}
```

## 🛠️ Structure du Projet

```
src/
├── app/
│   ├── services/
│   │   └── athlete.service.ts          # Service de gestion des athlètes
│   ├── spectator-display/
│   │   ├── spectator-display.component.html  # Template principal
│   │   ├── spectator-display.component.ts    # Logique métier
│   │   └── spectator-display.component.css   # Styles et animations
│   ├── app.component.html              # Point d'entrée
│   └── app.module.ts                   # Configuration Angular
├── assets/
│   └── athletes.txt                    # Liste des athlètes
└── styles.css                         # Styles globaux + Tailwind
```

## 🔧 Technologies Utilisées

- **Angular 16** : Framework principal
- **TailwindCSS** : Framework CSS pour le design
- **Angular Animations** : Animations et transitions
- **RxJS** : Gestion du chronomètre et des états
- **HttpClient** : Lecture du fichier des athlètes

## 📦 Build de Production

```bash
# Build optimisé pour production
ng build --prod

# Les fichiers sont générés dans dist/
# Servir avec un serveur web (nginx, apache, etc.)
```

## 🐛 Dépannage

### Le fichier athletes.txt ne se charge pas
- Vérifiez que le fichier existe dans `src/assets/`
- Vérifiez l'encodage (UTF-8 recommandé)
- Redémarrez le serveur de développement

### Les styles Tailwind ne s'appliquent pas
- Vérifiez `tailwind.config.js`
- Vérifiez que `@tailwind` est importé dans `src/styles.css`

### Problèmes d'affichage sur TV
- Vérifiez la résolution de sortie
- Testez en mode plein écran
- Ajustez le zoom du navigateur si nécessaire

## 📄 Licence

MIT License - Libre d'utilisation pour vos compétitions de powerlifting !

---

**Développé avec ❤️ pour la communauté powerlifting** 🏋️‍♀️
