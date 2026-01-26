# Portfolio Photographe 3D 📸

Un site web portfolio moderne et interactif pour photographe professionnel avec des effets 3D immersifs.

## ✨ Fonctionnalités

- **Design 3D moderne** avec animations Three.js
- **Loader animé** avec icône caméra
- **Navigation responsive** avec menu hamburger
- **Portfolio filtrable** par catégories
- **Animations au scroll** avec ScrollReveal
- **Optimisé mobile** et tablette
- **Images haute qualité** d'Unsplash

## 🚀 Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Animations et design moderne
- **JavaScript ES6** - Interactivité
- **Three.js** - Effets 3D et particules
- **ScrollReveal.js** - Animations au scroll
- **Google Fonts** - Typographie Poppins
- **Font Awesome** - Icônes

## 📂 Structure du projet

```
Portfolio_photographe/
├── index.html              # Page principale
├── favicon.svg             # Icône du site
├── assets/
│   ├── css/
│   │   └── styles.css      # Styles principaux
│   ├── js/
│   │   ├── main.js         # JavaScript principal
│   │   └── scrollreveal.min.js
│   └── img/
│       └── credits.md      # Crédits des images
└── README.md               # Documentation
```

## 🎨 Sections du site

1. **Hero** - Présentation avec titre animé et effets 3D
2. **À propos** - Présentation du photographe avec compétences
3. **Portfolio** - Galerie filtrable avec 6 projets
4. **Services** - Services proposés avec cartes stylisées
5. **Contact** - Formulaire de contact professionnel
6. **Footer** - Informations de contact et liens

## 🖼️ Images

Toutes les images sont sous licence libre d'Unsplash :
- Portrait professionnel (À propos)
- 6 images de portfolio (portraits, mariages, paysages, événements)
- Crédit complet dans `assets/img/credits.md`

## 🌐 Utilisation

1. **Serveur local** :
   ```bash
   python -m http.server 8000
   ```
   Puis ouvrir http://localhost:8000

2. **Live Server** (VS Code) :
   - Clic droit sur `index.html`
   - "Open with Live Server"

## 📱 Responsive Design

- **Mobile** : < 480px
- **Tablette** : 481px - 768px
- **Desktop** : > 768px

## 🔧 Personnalisation

### Couleurs (dans `styles.css`)
```css
:root {
    --primary-color: #ff6b35;    /* Orange principal */
    --secondary-color: #1a1a1a;  /* Gris foncé */
    --accent-color: #ffd700;     /* Or */
}
```

### Images
Remplacez les URLs Unsplash par vos propres images dans `index.html`

### Contenu
Modifiez le texte dans `index.html` selon vos besoins

## 📋 TODO / Améliorations possibles

- [ ] Système de gestion de contenu (CMS)
- [ ] Formulaire de contact fonctionnel (PHP/Node.js)
- [ ] Mode sombre/clair
- [ ] Multilingue
- [ ] Optimisation SEO avancée
- [ ] PWA (Progressive Web App)

## 📄 Licence

Ce projet est sous licence libre. Les images utilisées sont sous licence Unsplash.

---

**Créé avec ❤️ pour les photographes professionnels**