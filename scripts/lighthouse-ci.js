#!/usr/bin/env node

/**
 * Script Lighthouse CI pour auditer toutes les pages du portfolio
 * Génère des rapports comparatifs et des tableaux de bord
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

const PAGES = [
  { url: 'http://localhost:4200/', name: 'home' },
  { url: 'http://localhost:4200/project', name: 'projects' },
  { url: 'http://localhost:4200/services', name: 'services' },
  { url: 'http://localhost:4200/cv', name: 'cv' },
];

async function runLighthouseCI() {
  console.log('\n🚀 Lighthouse CI - Audit Complet du Portfolio');
  console.log('='.repeat(60) + '\n');

  // Créer les répertoires nécessaires
  const reportsDir = path.join(__dirname, '../lighthouse-reports');
  const ciReportsDir = path.join(reportsDir, 'ci-reports');

  if (!fs.existsSync(ciReportsDir)) {
    fs.mkdirSync(ciReportsDir, { recursive: true });
  }

  try {
    console.log('📊 Exécution de Lighthouse CI...\n');

    // Exécuter Lighthouse CI
    const { stdout, stderr } = await execAsync('npx lhci autorun', {
      cwd: path.join(__dirname, '..'),
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    if (stdout) {
      console.log(stdout);
    }

    if (stderr && !stderr.includes('warn')) {
      console.error('Erreurs:', stderr);
    }

    console.log('\n✅ Audit Lighthouse CI terminé!');
    console.log(`📁 Rapports disponibles dans: ${ciReportsDir}\n`);

    // Générer un résumé
    await generateSummary(ciReportsDir);

  } catch (error) {
    console.error('❌ Erreur lors de l\'audit:', error.message);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    process.exit(1);
  }
}

async function generateSummary(reportsDir) {
  console.log('\n📝 Génération du résumé...\n');

  try {
    // Lire tous les fichiers JSON dans le répertoire
    const files = fs.readdirSync(reportsDir)
      .filter(file => file.endsWith('.json'));

    if (files.length === 0) {
      console.log('⚠️  Aucun rapport trouvé');
      return;
    }

    const summary = {
      timestamp: new Date().toISOString(),
      totalPages: PAGES.length,
      reports: [],
    };

    // Parser chaque rapport
    for (const file of files) {
      const filePath = path.join(reportsDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      if (data.categories) {
        summary.reports.push({
          url: data.finalUrl || data.requestedUrl,
          scores: {
            performance: Math.round(data.categories.performance.score * 100),
            accessibility: Math.round(data.categories.accessibility.score * 100),
            bestPractices: Math.round(data.categories['best-practices'].score * 100),
            seo: Math.round(data.categories.seo.score * 100),
            pwa: Math.round(data.categories.pwa.score * 100),
          },
        });
      }
    }

    // Calculer les moyennes
    if (summary.reports.length > 0) {
      const avgScores = {
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0,
        pwa: 0,
      };

      summary.reports.forEach(report => {
        avgScores.performance += report.scores.performance;
        avgScores.accessibility += report.scores.accessibility;
        avgScores.bestPractices += report.scores.bestPractices;
        avgScores.seo += report.scores.seo;
        avgScores.pwa += report.scores.pwa;
      });

      const count = summary.reports.length;
      summary.averageScores = {
        performance: Math.round(avgScores.performance / count),
        accessibility: Math.round(avgScores.accessibility / count),
        bestPractices: Math.round(avgScores.bestPractices / count),
        seo: Math.round(avgScores.seo / count),
        pwa: Math.round(avgScores.pwa / count),
      };

      // Sauvegarder le résumé
      const summaryPath = path.join(reportsDir, `summary-${Date.now()}.json`);
      fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

      // Afficher le résumé
      console.log('='.repeat(60));
      console.log('📊 RÉSUMÉ DES AUDITS');
      console.log('='.repeat(60));
      console.log('\n📈 Scores moyens:');
      console.log(`  Performance:      ${summary.averageScores.performance}/100`);
      console.log(`  Accessibility:    ${summary.averageScores.accessibility}/100`);
      console.log(`  Best Practices:   ${summary.averageScores.bestPractices}/100`);
      console.log(`  SEO:              ${summary.averageScores.seo}/100`);
      console.log(`  PWA:              ${summary.averageScores.pwa}/100`);

      console.log('\n📄 Scores par page:');
      summary.reports.forEach(report => {
        const url = new URL(report.url);
        console.log(`\n  ${url.pathname || '/'}`);
        console.log(`    Performance:    ${report.scores.performance}/100`);
        console.log(`    Accessibility:  ${report.scores.accessibility}/100`);
        console.log(`    Best Practices: ${report.scores.bestPractices}/100`);
        console.log(`    SEO:            ${report.scores.seo}/100`);
        console.log(`    PWA:            ${report.scores.pwa}/100`);
      });

      console.log('\n' + '='.repeat(60));
      console.log(`\n💾 Résumé sauvegardé: ${summaryPath}\n`);
    }
  } catch (error) {
    console.error('❌ Erreur lors de la génération du résumé:', error.message);
  }
}

// Exécuter le script
if (require.main === module) {
  runLighthouseCI();
}

module.exports = { runLighthouseCI };
