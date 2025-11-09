# Guide Lighthouse - Audit de Performance du Portfolio

Ce guide explique comment utiliser les outils d'audit Lighthouse intégrés dans le portfolio.

## 🚀 Installation

Installez les dépendances nécessaires :

```bash
npm install
```

## 📊 Scripts d'Audit Disponibles

### 1. Audit Lighthouse Simple

Exécute un audit détaillé avec 3 runs pour desktop et mobile :

```bash
npm run lighthouse
# ou
npm run audit
```

Ce script va :
- Exécuter 3 audits pour desktop
- Exécuter 3 audits pour mobile
- Calculer les scores moyens
- Générer des rapports HTML et JSON détaillés
- Afficher les métriques clés dans le terminal

**Sortie** : `lighthouse-reports/desktop-*.html`, `lighthouse-reports/mobile-*.html`

### 2. Audit Lighthouse CI Complet

Exécute un audit de toutes les pages du portfolio :

```bash
npm run lighthouse:ci
# ou
npm run audit:full
```

Ce script va :
- Auditer toutes les pages (Home, Projects, Services, CV)
- Exécuter 3 runs par page
- Générer des rapports comparatifs
- Créer un résumé avec les scores moyens

**Sortie** : `lighthouse-reports/ci-reports/`

## 📈 Métriques Surveillées

### Scores de Performance
- **Performance** : Vitesse et optimisation générale (>80%)
- **Accessibility** : Accessibilité pour tous les utilisateurs (>90%)
- **Best Practices** : Respect des bonnes pratiques web (>90%)
- **SEO** : Optimisation pour les moteurs de recherche (>90%)
- **PWA** : Critères d'application web progressive

### Métriques Core Web Vitals
- **First Contentful Paint (FCP)** : <2s
- **Largest Contentful Paint (LCP)** : <2.5s
- **Cumulative Layout Shift (CLS)** : <0.1
- **Total Blocking Time (TBT)** : <300ms
- **Speed Index** : <3s

## 🎯 Assertions de Performance

Le fichier `lighthouserc.json` contient des assertions strictes :

```json
{
  "categories:performance": ["error", { "minScore": 0.8 }],
  "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
  "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }]
}
```

Si ces seuils ne sont pas respectés, l'audit échouera.

## 📁 Structure des Rapports

```
lighthouse-reports/
├── desktop-2024-11-09.html          # Rapport HTML desktop
├── desktop-2024-11-09.json          # Données JSON desktop
├── desktop-2024-11-09-summary.json  # Résumé avec moyennes
├── mobile-2024-11-09.html           # Rapport HTML mobile
├── mobile-2024-11-09.json           # Données JSON mobile
├── mobile-2024-11-09-summary.json   # Résumé mobile
└── ci-reports/                      # Rapports CI de toutes les pages
    ├── manifest.json
    ├── summary-*.json
    └── *.report.html
```

## 🔧 Configuration

### Modifier les URLs à Auditer

Éditez `lighthouserc.json` :

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:4200/",
        "http://localhost:4200/project",
        "http://localhost:4200/services",
        "http://localhost:4200/cv"
      ]
    }
  }
}
```

### Ajuster les Seuils de Performance

Modifiez les assertions dans `lighthouserc.json` :

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }]
      }
    }
  }
}
```

## 💡 Conseils d'Utilisation

1. **Avant l'audit** : Assurez-vous que l'application est en cours d'exécution
   ```bash
   npm run start:dev
   ```

2. **Mode Production** : Pour des résultats plus précis, buildez en production
   ```bash
   npm run build
   npm run start
   # Dans un autre terminal :
   npm run audit
   ```

3. **Environnement Stable** : Fermez les autres applications pour des résultats cohérents

4. **URL Personnalisée** : Auditez une URL spécifique
   ```bash
   node scripts/lighthouse-audit.js https://mon-site.com
   ```

## 📊 Interpréter les Résultats

### Scores Verts (90-100)
✅ Excellent ! Le site répond aux meilleures pratiques.

### Scores Orange (50-89)
⚠️ Amélioration nécessaire. Consultez les recommandations dans le rapport.

### Scores Rouges (0-49)
❌ Problèmes critiques. Priorité absolue pour l'optimisation.

## 🔍 Audits Avancés

### Desktop vs Mobile
Les deux scripts exécutent des audits séparés pour desktop et mobile avec des throttling différents :

- **Desktop** : Connexion rapide, CPU 1x
- **Mobile** : Connexion 3G lente, CPU 4x

### Nombre de Runs
Par défaut, 3 runs sont exécutés pour chaque configuration. La moyenne est calculée pour plus de précision.

## 🚨 Résolution de Problèmes

### Chrome ne se lance pas
```bash
# Installer/mettre à jour Chrome
# Ou utiliser Chromium
export CHROME_PATH=/path/to/chrome
```

### Erreur de timeout
Augmentez le timeout dans le script ou vérifiez que le serveur répond.

### Rapports non générés
Vérifiez les permissions d'écriture dans le dossier `lighthouse-reports/`.

## 📚 Ressources

- [Documentation Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [Performance Budget](https://web.dev/performance-budgets-101/)
