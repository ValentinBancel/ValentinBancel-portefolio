# Guide Analytics - Tracking des Statistiques du Portfolio

Ce guide explique comment fonctionne le système de tracking analytics intégré dans le portfolio.

## 📊 Vue d'Ensemble

Le système analytics track automatiquement :
- 📄 **Vues de pages** : Chaque page visitée
- 🖱️ **Clics** : Interactions des utilisateurs
- 🎯 **Vues de projets** : Consultations de projets spécifiques
- 💼 **Vues de services** : Consultations de services spécifiques
- 📥 **Téléchargements CV** : Téléchargements du CV

## 🚀 Activation

Le tracking est **automatiquement activé** au démarrage de l'application Angular. Le service `AnalyticsService` s'initialise dans `app.config.ts`.

## 🎯 Événements Trackés

### 1. Page Views (Automatique)
Chaque navigation est automatiquement trackée :

```typescript
// Automatique via le Router
this.router.events.subscribe((event: NavigationEnd) => {
  this.analyticsService.trackPageView(event.urlAfterRedirects);
});
```

### 2. Project Views
Pour tracker la consultation d'un projet :

```typescript
import { AnalyticsService } from '../services/analytics.service';

constructor(private analyticsService: AnalyticsService) {}

viewProject(projectId: number) {
  this.analyticsService.trackProjectView(projectId);
}
```

### 3. Service Views
Pour tracker la consultation d'un service :

```typescript
viewService(serviceId: number) {
  this.analyticsService.trackServiceView(serviceId);
}
```

### 4. Clicks Personnalisés
Pour tracker des clics spécifiques :

```typescript
// Click simple
this.analyticsService.trackClick();

// Click avec cible
this.analyticsService.trackClick('button', 123);
```

### 5. CV Downloads
Pour tracker les téléchargements de CV :

```typescript
downloadCV() {
  this.analyticsService.trackCVDownload();
  // ... logique de téléchargement
}
```

## 📈 Consulter les Statistiques

### 1. Django Admin

Accédez à l'admin Django :
```
http://localhost:8000/admin/portfolio/analytics/
```

Les statistiques sont affichées avec :
- 📊 Résumé des dernières 24h
- 📊 Résumé des 7 derniers jours
- 📊 Résumé des 30 derniers jours

### 2. API Endpoints

#### Obtenir toutes les statistiques
```bash
GET /api/analytics/
```

#### Filtrer par période
```bash
GET /api/analytics/?period=today
GET /api/analytics/?period=week
GET /api/analytics/?period=month
GET /api/analytics/?period=year
```

#### Filtrer par type d'événement
```bash
GET /api/analytics/?event_type=page_view
GET /api/analytics/?event_type=click
GET /api/analytics/?event_type=project_view
```

#### Résumé des statistiques
```bash
GET /api/analytics/summary/
GET /api/analytics/summary/?period=week
```

**Réponse** :
```json
{
  "period": "week",
  "summary": {
    "total_page_views": 1523,
    "total_clicks": 342,
    "unique_sessions": 287
  },
  "events_by_type": [
    { "event_type": "page_view", "count": 1523 },
    { "event_type": "click", "count": 342 }
  ],
  "top_pages": [
    { "page_url": "/", "views": 523 },
    { "page_url": "/project", "views": 412 }
  ],
  "top_projects": [
    { "target_id": 1, "views": 156 },
    { "target_id": 3, "views": 98 }
  ],
  "top_services": [
    { "target_id": 2, "views": 87 },
    { "target_id": 1, "views": 65 }
  ],
  "daily_stats": [
    { "day": "2024-11-09", "views": 234, "clicks": 45 }
  ]
}
```

## 🔧 Configuration

### Modifier l'URL de l'API

Dans `analytics.service.ts` :

```typescript
private apiUrl = 'http://localhost:8000/api';
// Changez en :
private apiUrl = 'https://votre-api.com/api';
```

### Désactiver le Tracking

Pour désactiver temporairement le tracking, commentez l'initialisation dans `app.config.ts` :

```typescript
// {
//   provide: APP_INITIALIZER,
//   useFactory: initializeAnalytics,
//   deps: [AnalyticsService],
//   multi: true
// }
```

## 🔒 Confidentialité et RGPD

### Données Collectées
- ✅ URL de la page
- ✅ Referrer
- ✅ Session ID (généré côté client)
- ✅ User Agent
- ✅ Adresse IP (pour les statistiques géographiques)

### Données NON Collectées
- ❌ Informations personnelles identifiables
- ❌ Cookies tiers
- ❌ Données sensibles

### Session ID
Un ID de session anonyme est généré et stocké dans `sessionStorage`. Il est supprimé à la fermeture du navigateur.

## 📊 Statistiques Disponibles dans l'Admin

### Vue d'Ensemble
- Total d'événements (24h, 7j, 30j)
- Vues de pages
- Clics
- Sessions uniques

### Filtres
- Par type d'événement
- Par type de cible
- Par date

### Recherche
- Par URL
- Par session ID
- Par adresse IP

## 🎨 Personnalisation

### Ajouter un Nouveau Type d'Événement

1. **Backend** : Ajoutez le type dans `models.py`
```python
EVENT_TYPES = [
    ('page_view', 'Page View'),
    ('click', 'Click'),
    ('custom_event', 'Custom Event'),  # Nouveau
]
```

2. **Frontend** : Ajoutez une méthode dans `analytics.service.ts`
```typescript
trackCustomEvent(data: any): void {
  const event: AnalyticsEvent = {
    event_type: 'custom_event',
    page_url: this.router.url,
    session_id: this.sessionId,
    user_agent: navigator.userAgent,
  };
  this.sendEvent(event);
}
```

3. **Migration** : Créez et appliquez une migration
```bash
cd portfolio_api
uv run python manage.py makemigrations
uv run python manage.py migrate
```

## 📈 Exemples d'Utilisation

### Tracker un Click sur un Bouton
```html
<button (click)="onContactClick()">Contact</button>
```

```typescript
onContactClick() {
  this.analyticsService.trackClick('contact-button');
  // ... logique du contact
}
```

### Tracker la Vue d'un Projet
```typescript
ngOnInit() {
  const projectId = this.route.snapshot.params['id'];
  this.analyticsService.trackProjectView(projectId);
}
```

### Tracker une Action Personnalisée
```typescript
onNewsletterSubscribe() {
  this.analyticsService.trackClick('newsletter-subscribe');
  // ... logique d'abonnement
}
```

## 🚨 Résolution de Problèmes

### Les événements ne sont pas enregistrés

1. Vérifiez que l'API est accessible :
   ```bash
   curl http://localhost:8000/api/analytics/
   ```

2. Vérifiez la console du navigateur pour les erreurs

3. Vérifiez que les migrations sont appliquées :
   ```bash
   cd portfolio_api
   uv run python manage.py showmigrations portfolio
   ```

### Session ID non généré

Le session ID nécessite `sessionStorage`. Vérifiez que :
- Le code s'exécute côté client (pas en SSR)
- `sessionStorage` est disponible dans le navigateur

## 📚 API Reference

### AnalyticsService

```typescript
class AnalyticsService {
  // Track page view
  trackPageView(pageUrl: string): void

  // Track generic click
  trackClick(targetType?: string, targetId?: number): void

  // Track project view
  trackProjectView(projectId: number): void

  // Track service view
  trackServiceView(serviceId: number): void

  // Track CV download
  trackCVDownload(): void
}
```

## 🔐 Sécurité

### Protection CSRF
L'API Django utilise la protection CSRF. Pour les requêtes POST, incluez le token CSRF.

### Rate Limiting
Considérez d'ajouter du rate limiting dans Django pour éviter les abus :

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_RATES': {
        'analytics': '1000/hour'
    }
}
```

## 📊 Export des Données

### Export JSON
```bash
curl http://localhost:8000/api/analytics/summary/ > stats.json
```

### Export CSV (via Django Admin)
1. Allez dans l'admin
2. Sélectionnez les entrées
3. Choisissez "Export to CSV"

## 🎯 Bonnes Pratiques

1. ✅ **Ne pas tracker de données sensibles**
2. ✅ **Respecter le RGPD** : Informez les utilisateurs
3. ✅ **Nettoyer les anciennes données** : Créez une tâche périodique
4. ✅ **Monitorer les performances** : Le tracking ne doit pas ralentir le site
5. ✅ **Tester en local** : Vérifiez que tout fonctionne avant le déploiement
