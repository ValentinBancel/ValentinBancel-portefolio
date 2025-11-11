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
    console.error(`❌ Fichier .env non trouvé à ${filePath}`);
    console.log(`💡 Créez un fichier .env à partir de .env.example`);
    console.log(`   cp .env.example .env`);
    process.exit(1);
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
const envVars = parseEnvFile(envPath);

// Vérifier que API_URL existe
if (!envVars.API_URL) {
  console.error('❌ Variable API_URL non trouvée dans le fichier .env');
  process.exit(1);
}

// Générer le contenu du fichier environment.ts
const environmentContent = `// Ce fichier est généré automatiquement par scripts/set-env.js
// Ne pas modifier manuellement - Modifier le fichier .env à la place

export const environment = {
  production: false,
  apiUrl: '${envVars.API_URL}/api',
};
`;

// Écrire le fichier environment.ts
try {
  fs.writeFileSync(targetPath, environmentContent, 'utf8');
  console.log('✅ Fichier environment.ts généré avec succès !');
  console.log(`📍 API URL: ${envVars.API_URL}/api`);
} catch (error) {
  console.error('❌ Erreur lors de la génération du fichier environment.ts:', error);
  process.exit(1);
}
