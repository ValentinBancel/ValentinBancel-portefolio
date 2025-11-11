# 🔧 Configuration des Variables d'Environnement

Ce guide explique comment configurer l'URL de l'API via des variables d'environnement.

---

## 📋 Vue d'Ensemble

Le projet utilise un système de variables d'environnement pour configurer l'URL de l'API backend. Cela permet de :

✅ **Séparer** les configurations dev/prod
✅ **Sécuriser** les URLs sensibles (ne pas les commiter)
✅ **Faciliter** le déploiement sur différents environnements
✅ **Centraliser** la configuration

---

## 🚀 Démarrage Rapide

### Première Installation

```bash
# 1. Copier le fichier d'exemple
cp .env.example .env

# 2. Modifier l'URL de l'API si nécessaire
# Le fichier .env contient déjà la config par défaut pour le dev local

# 3. Générer le fichier environment.ts
npm run config:env

# 4. Démarrer l'application
npm run start:dev
```

**C'est tout !** Le fichier `environment.ts` est automatiquement régénéré avant chaque démarrage.

---

## 📁 Structure des Fichiers

```
ValentinBancel-portefolio/
├── .env                          # ⚠️ NON versionné (dans .gitignore)
├── .env.example                  # ✅ Template versionné
├── src/
│   └── environments/
│       ├── environment.ts        # 🔄 Généré automatiquement
│       └── environment.prod.ts   # 🏭 Configuration production
└── scripts/
    └── set-env.js                # 🛠️ Script de génération
```

---

## 🔐 Fichier .env

### Format

```bash
# Configuration de l'API Backend
API_URL=http://localhost:8000
```

### Valeurs Courantes

| Environnement | API_URL |
|---------------|---------|
| **Développement Local** | `http://localhost:8000` |
| **Production** | `https://api.votre-domaine.com` |
| **Staging** | `https://api-staging.votre-domaine.com` |
| **Docker** | `http://api:8000` |

### ⚠️ Important

- Le préfixe `/api` est **ajouté automatiquement** par les services
- Ne mettez **PAS** de slash `/` à la fin de l'URL
- Le fichier `.env` est **ignoré par Git** (sécurité)

---

## 🛠️ Scripts NPM

### config:env

Génère le fichier `environment.ts` à partir du `.env`

```bash
npm run config:env
```

**Sortie :**
```
✅ Fichier environment.ts généré avec succès !
📍 API URL: http://localhost:8000/api
```

### Hooks Automatiques

Les scripts suivants exécutent **automatiquement** `config:env` :

```bash
npm run start:dev   # prestart:dev → config:env
npm run build       # prebuild → config:env
```

Vous n'avez **jamais besoin** d'exécuter manuellement `config:env` !

---

## 📝 Fichier environment.ts

### Généré Automatiquement

```typescript
// Ce fichier est généré automatiquement par scripts/set-env.js
// Ne pas modifier manuellement - Modifier le fichier .env à la place

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
};
```

### ⚠️ Ne PAS Modifier Manuellement

Ce fichier est **régénéré** à chaque démarrage. Modifiez plutôt le fichier `.env`.

---

## 🏭 Configuration Production

Pour la production, modifiez directement `environment.prod.ts` :

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.votre-domaine.com/api',
};
```

Puis buildez avec :

```bash
npm run build  # Utilise environment.prod.ts
```

---

## 🔄 Utilisation dans le Code

Tous les services utilisent automatiquement la configuration :

### ProjectService

```typescript
import { environment } from '../../environments/environment';

private apiUrl = environment.apiUrl;

getProjects() {
  return this.http.get(`${this.apiUrl}/projects/`);
  // → http://localhost:8000/api/projects/
}
```

### ServiceService

```typescript
import { environment } from '../../environments/environment';

private apiUrl = environment.apiUrl;

getServices() {
  return this.http.get(`${this.apiUrl}/services/`);
  // → http://localhost:8000/api/services/
}
```

### AnalyticsService

```typescript
import { environment } from '../../environments/environment';

private apiUrl = environment.apiUrl;

sendEvent(event) {
  return this.http.post(`${this.apiUrl}/analytics/`, event);
  // → http://localhost:8000/api/analytics/
}
```

---

## 🧪 Tester la Configuration

### Vérifier l'URL Utilisée

1. **Ouvrir la console browser** (F12)
2. **Visiter une page** qui charge des données (ex: /project)
3. **Onglet Network**
4. **Vérifier les requêtes** vers l'API

Vous devriez voir :
```
GET http://localhost:8000/api/projects/  200 OK
```

### Changer l'URL

```bash
# 1. Modifier .env
echo "API_URL=http://api.example.com" > .env

# 2. Régénérer environment.ts
npm run config:env

# 3. Redémarrer le serveur
npm run start:dev
```

Les requêtes iront maintenant vers `http://api.example.com/api/`

---

## 🐛 Résolution de Problèmes

### Erreur : "Fichier .env non trouvé"

**Cause :** Le fichier `.env` n'existe pas

**Solution :**
```bash
cp .env.example .env
npm run config:env
```

### Erreur : "Variable API_URL non trouvée"

**Cause :** Le fichier `.env` est vide ou mal formaté

**Solution :**
```bash
# Vérifier le contenu du .env
cat .env

# Doit contenir :
API_URL=http://localhost:8000

# Si vide, restaurer depuis l'exemple
cp .env.example .env
```

### L'API ne répond pas

**Vérifications :**

1. **Le backend Django tourne ?**
   ```bash
   curl http://localhost:8000/api/projects/
   ```

2. **L'URL dans .env est correcte ?**
   ```bash
   cat .env
   # Devrait afficher : API_URL=http://localhost:8000
   ```

3. **environment.ts est à jour ?**
   ```bash
   npm run config:env
   cat src/environments/environment.ts
   ```

### CORS Errors

Si vous changez l'URL de l'API, pensez à mettre à jour les CORS dans Django :

```python
# portfolio_api/config/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "https://votre-frontend.com",
]
```

---

## 📚 Cas d'Usage Avancés

### Plusieurs Environnements

Créez plusieurs fichiers `.env` :

```bash
.env.development    # Dev local
.env.staging        # Staging
.env.production     # Production
```

Puis copiez le bon fichier :

```bash
# Pour staging
cp .env.staging .env
npm run config:env
npm run start:dev
```

### Variables Supplémentaires

Vous pouvez ajouter d'autres variables dans `.env` :

```bash
API_URL=http://localhost:8000
ANALYTICS_ENABLED=true
DEBUG_MODE=false
```

Puis modifiez `scripts/set-env.js` pour les inclure :

```javascript
const environmentContent = `
export const environment = {
  production: false,
  apiUrl: '${envVars.API_URL}/api',
  analyticsEnabled: ${envVars.ANALYTICS_ENABLED},
  debugMode: ${envVars.DEBUG_MODE},
};
`;
```

---

## 🔒 Sécurité

### ⚠️ Ne JAMAIS Commiter .env

Le fichier `.env` contient des informations sensibles et est **ignoré par Git**.

**Vérifié dans `.gitignore` :**
```gitignore
# Environment variables
.env
.env.local
.env.*.local
```

### ✅ Versionner .env.example

Le fichier `.env.example` est un **template** sans valeurs sensibles.

**À versionner :**
- ✅ `.env.example`
- ✅ `environment.prod.ts`
- ✅ `scripts/set-env.js`

**À NE PAS versionner :**
- ❌ `.env`
- ❌ `.env.local`
- ❌ `environment.ts` (généré)

---

## 📋 Checklist de Déploiement

### En Production

- [ ] Créer un fichier `.env` sur le serveur
- [ ] Définir `API_URL` avec l'URL de production
- [ ] Exécuter `npm run config:env`
- [ ] Vérifier `environment.ts` généré
- [ ] Build : `npm run build`
- [ ] Tester les appels API
- [ ] Vérifier les CORS côté Django

### En CI/CD

Ajoutez la génération de l'environment dans votre pipeline :

```yaml
# .github/workflows/deploy.yml
- name: Configure environment
  run: |
    echo "API_URL=${{ secrets.API_URL }}" > .env
    npm run config:env

- name: Build
  run: npm run build
```

---

## 💡 Bonnes Pratiques

1. ✅ **Toujours copier** `.env.example` → `.env` pour commencer
2. ✅ **Ne jamais commiter** le fichier `.env`
3. ✅ **Utiliser les scripts NPM** pour régénérer l'environment
4. ✅ **Documenter** les nouvelles variables dans `.env.example`
5. ✅ **Tester** après chaque changement d'URL

---

## 📚 Ressources

- **Guide de démarrage** : `QUICK_START.md`
- **Résolution de problèmes** : `FIXES.md`
- **Analytics** : `ANALYTICS_GUIDE.md`

---

**Date** : 2024-11-09
**Version** : 1.2.0
**Status** : ✅ Configuration automatisée
