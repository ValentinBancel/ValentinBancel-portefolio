#!/usr/bin/env node

/**
 * Script pour générer le fichier environment.ts à partir du .env
 * Usage: node scripts/set-env.js
 */

const fs = require('fs');
const path = require('path');

// Chemin vers le fichier .env
const envPath = path.join(__dirname, '../.env');
const envExamplePath = path.join(__dirname, '../.env.example');

// Chemin vers le fichier environment.ts
const targetPath = path.join(__dirname, '../src/environments/environment.ts');

// Fonction pour lire le fichier .env
function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const envContent = fs.readFileSync(filePath, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    // Ignorer les commentaires et les lignes vides
    if (line.trim() && !line.trim().startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        envVars[key.trim()] = value;
      }
    }
  });

  return envVars;
}

// Lire les variables d'environnement
let envVars = {};
let apiUrl;

// Priorité 1: Variables d'environnement système (Heroku, etc.)
if (process.env.API_URL) {
  console.log('📍 Utilisation des variables d\'environnement système');
  apiUrl = process.env.API_URL;
} else {
  // Priorité 2: Fichier .env local
  console.log('📍 Recherche du fichier .env local...');
  envVars = parseEnvFile(envPath);

  if (envVars && envVars.API_URL) {
    apiUrl = envVars.API_URL;
  } else {
    console.error('❌ Variable API_URL non trouvée');
    console.log('💡 Pour le développement local, créez un fichier .env:');
    console.log('   cp .env.example .env');
    console.log('💡 Pour Heroku, définissez la config var:');
    console.log('   heroku config:set API_URL=https://your-api-url.com');
    process.exit(1);
  }
}

// Vérifier que API_URL existe
if (!apiUrl) {
  console.error('❌ Variable API_URL non définie');
  process.exit(1);
}

// Générer le contenu du fichier environment.ts
const environmentContent = `// Ce fichier est généré automatiquement par scripts/set-env.js
// Ne pas modifier manuellement - Modifier le fichier .env à la place

export const environment = {
  production: false,
  apiUrl: '${apiUrl}/api',
};
`;

// Écrire le fichier environment.ts
try {
  fs.writeFileSync(targetPath, environmentContent, 'utf8');
  console.log('✅ Fichier environment.ts généré avec succès !');
  console.log(`📍 API URL: ${apiUrl}/api`);
} catch (error) {
  console.error('❌ Erreur lors de la génération du fichier environment.ts:', error);
  process.exit(1);
}
