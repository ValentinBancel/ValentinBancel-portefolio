# ✅ Configuration des Variables d'Environnement - Résumé

## 🎯 Ce qui a été fait

### 1. Création des Fichiers

- ✅ `.env` - Fichier de configuration (NON versionné)
- ✅ `.env.example` - Template de configuration (versionné)
- ✅ `src/environments/environment.ts` - Config dev (généré auto)
- ✅ `src/environments/environment.prod.ts` - Config production
- ✅ `scripts/set-env.js` - Script de génération automatique

### 2. Modification des Services

Tous les services utilisent maintenant `environment.apiUrl` :

- ✅ `services/project.service.ts`
- ✅ `services/service.service.ts`
- ✅ `services/analytics.service.ts`

### 3. Automatisation

Scripts NPM configurés pour régénérer automatiquement la config :

- ✅ `npm run start:dev` → Génère environment.ts puis démarre
- ✅ `npm run build` → Génère environment.ts puis build
- ✅ `npm run config:env` → Génère environment.ts manuellement

### 4. Sécurité

- ✅ `.env` ajouté au `.gitignore`
- ✅ Variables sensibles non versionnées
- ✅ Template `.env.example` versionné

---

## 🚀 Comment Utiliser

### Première Installation

```bash
# 1. Copier le template
cp .env.example .env

# 2. Modifier si nécessaire (optionnel)
# Le fichier contient déjà la config par défaut pour le dev local

# 3. Démarrer (génère automatiquement environment.ts)
npm run start:dev
```

### Changer l'URL de l'API

```bash
# 1. Modifier le fichier .env
echo "API_URL=https://api.production.com" > .env

# 2. Régénérer la config
npm run config:env

# 3. Redémarrer
npm run start:dev
```

---

## 📁 Fichier .env

```bash
# Configuration de l'API Backend
API_URL=http://localhost:8000
```

**Important :**
- ❌ Ne mettez PAS `/api` à la fin (ajouté automatiquement)
- ❌ Ne mettez PAS de slash `/` final
- ✅ Format : `http://domain:port` ou `https://domain`

---

## 🔄 Flux de Génération

```
.env
  ↓
scripts/set-env.js  (lit .env)
  ↓
environment.ts      (généré automatiquement)
  ↓
Services Angular    (utilisent environment.apiUrl)
  ↓
Requêtes HTTP       (vers http://localhost:8000/api)
```

---

## 🧪 Vérification

### Le fichier environment.ts est-il généré ?

```bash
cat src/environments/environment.ts
```

**Devrait afficher :**
```typescript
// Ce fichier est généré automatiquement par scripts/set-env.js
// Ne pas modifier manuellement - Modifier le fichier .env à la place

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
};
```

### Les requêtes vont-elles vers la bonne URL ?

1. Ouvrir les DevTools (F12)
2. Onglet Network
3. Visiter `/project` ou `/services`
4. Vérifier les requêtes :
   ```
   GET http://localhost:8000/api/projects/
   GET http://localhost:8000/api/services/
   ```

---

## 📊 Avant / Après

### Avant (URL hardcodée)

```typescript
// project.service.ts
private apiUrl = 'http://localhost:8000/api';  // ❌ Hardcodé
```

**Problèmes :**
- URL identique partout
- Difficile de changer
- Impossible d'avoir des configs différentes

### Après (Variable d'environnement)

```typescript
// project.service.ts
import { environment } from '../../environments/environment';
private apiUrl = environment.apiUrl;  // ✅ Configurable
```

**Avantages :**
- ✅ URL centralisée dans `.env`
- ✅ Facile à changer
- ✅ Configs dev/prod séparées
- ✅ Sécurisé (pas de commit de secrets)

---

## 🎯 Cas d'Usage

### Développement Local

```bash
# .env
API_URL=http://localhost:8000
```

### Production

```bash
# .env
API_URL=https://api.votre-domaine.com
```

### Docker

```bash
# .env
API_URL=http://api:8000
```

### Staging

```bash
# .env
API_URL=https://api-staging.votre-domaine.com
```

---

## 🐛 Dépannage

### Erreur : "Fichier .env non trouvé"

```bash
cp .env.example .env
npm run config:env
```

### L'URL n'est pas à jour

```bash
# Forcer la régénération
npm run config:env

# Vérifier
cat src/environments/environment.ts
```

### Les requêtes vont vers la mauvaise URL

```bash
# 1. Vérifier .env
cat .env

# 2. Régénérer
npm run config:env

# 3. Redémarrer le serveur
npm run start:dev
```

---

## 📚 Documentation Complète

Pour tous les détails, consultez :
- **[ENV_CONFIGURATION.md](ENV_CONFIGURATION.md)** - Documentation complète

---

## ✅ Checklist

- [x] Fichiers .env créés
- [x] Script de génération fonctionnel
- [x] Services modifiés pour utiliser environment
- [x] .gitignore mis à jour
- [x] Scripts NPM configurés (prestart, prebuild)
- [x] Documentation créée
- [x] Testé et validé

---

**Status** : ✅ Configuration des variables d'environnement terminée !
**Date** : 2024-11-09
**Version** : 1.2.0
