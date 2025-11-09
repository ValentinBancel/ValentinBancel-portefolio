#!/usr/bin/env node

/**
 * Script d'audit Lighthouse très précis pour le portfolio
 * Génère des rapports détaillés HTML et JSON
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Configuration de Lighthouse pour un audit très précis
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    // Paramètres pour un audit très précis
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
    throttlingMethod: 'simulate',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    // Plusieurs runs pour la précision
    runs: 3,
    // Résolution d'écran
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false,
    },
    // User agent desktop
    emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
};

// Configuration mobile
const mobileConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
    throttlingMethod: 'simulate',
    throttling: {
      rttMs: 150,
      throughputKbps: 1.6 * 1024,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    runs: 3,
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
  },
};

async function runLighthouseAudit(url, config, reportName) {
  console.log(`\n🔍 Démarrage de l'audit Lighthouse pour ${reportName}...`);
  console.log(`URL: ${url}`);

  // Lancer Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
  });

  const options = {
    logLevel: 'info',
    output: ['html', 'json'],
    port: chrome.port,
  };

  try {
    // Exécuter Lighthouse plusieurs fois pour plus de précision
    const runs = [];
    const numRuns = 3;

    for (let i = 0; i < numRuns; i++) {
      console.log(`\n📊 Run ${i + 1}/${numRuns}...`);
      const runnerResult = await lighthouse(url, options, config);
      runs.push(runnerResult);

      // Attendre un peu entre les runs
      if (i < numRuns - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Calculer les moyennes
    const avgScores = calculateAverageScores(runs);

    // Utiliser le meilleur run pour le rapport
    const bestRun = runs.reduce((best, current) => {
      const bestScore = best.lhr.categories.performance.score;
      const currentScore = current.lhr.categories.performance.score;
      return currentScore > bestScore ? current : best;
    });

    // Créer le répertoire de sortie
    const reportsDir = path.join(__dirname, '../lighthouse-reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Timestamp pour les fichiers
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

    // Sauvegarder le rapport HTML
    const htmlReport = bestRun.report[0];
    const htmlPath = path.join(reportsDir, `${reportName}-${timestamp}.html`);
    fs.writeFileSync(htmlPath, htmlReport);
    console.log(`\n📄 Rapport HTML sauvegardé: ${htmlPath}`);

    // Sauvegarder le rapport JSON
    const jsonReport = bestRun.report[1];
    const jsonPath = path.join(reportsDir, `${reportName}-${timestamp}.json`);
    fs.writeFileSync(jsonPath, jsonReport);
    console.log(`📄 Rapport JSON sauvegardé: ${jsonPath}`);

    // Sauvegarder un résumé avec les moyennes
    const summaryPath = path.join(reportsDir, `${reportName}-${timestamp}-summary.json`);
    const summary = {
      url,
      timestamp: new Date().toISOString(),
      device: reportName,
      numberOfRuns: numRuns,
      averageScores: avgScores,
      bestRunScores: {
        performance: Math.round(bestRun.lhr.categories.performance.score * 100),
        accessibility: Math.round(bestRun.lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(bestRun.lhr.categories['best-practices'].score * 100),
        seo: Math.round(bestRun.lhr.categories.seo.score * 100),
        pwa: Math.round(bestRun.lhr.categories.pwa.score * 100),
      },
      metrics: {
        firstContentfulPaint: bestRun.lhr.audits['first-contentful-paint'].displayValue,
        largestContentfulPaint: bestRun.lhr.audits['largest-contentful-paint'].displayValue,
        totalBlockingTime: bestRun.lhr.audits['total-blocking-time'].displayValue,
        cumulativeLayoutShift: bestRun.lhr.audits['cumulative-layout-shift'].displayValue,
        speedIndex: bestRun.lhr.audits['speed-index'].displayValue,
      },
    };
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📄 Résumé sauvegardé: ${summaryPath}`);

    // Afficher les résultats
    console.log('\n' + '='.repeat(60));
    console.log(`📊 RÉSULTATS DE L'AUDIT - ${reportName.toUpperCase()}`);
    console.log('='.repeat(60));
    console.log('\n📈 Scores moyens (sur 3 runs):');
    console.log(`  Performance:      ${avgScores.performance}/100`);
    console.log(`  Accessibility:    ${avgScores.accessibility}/100`);
    console.log(`  Best Practices:   ${avgScores.bestPractices}/100`);
    console.log(`  SEO:              ${avgScores.seo}/100`);
    console.log(`  PWA:              ${avgScores.pwa}/100`);

    console.log('\n⚡ Métriques clés (meilleur run):');
    console.log(`  First Contentful Paint:    ${summary.metrics.firstContentfulPaint}`);
    console.log(`  Largest Contentful Paint:  ${summary.metrics.largestContentfulPaint}`);
    console.log(`  Total Blocking Time:       ${summary.metrics.totalBlockingTime}`);
    console.log(`  Cumulative Layout Shift:   ${summary.metrics.cumulativeLayoutShift}`);
    console.log(`  Speed Index:               ${summary.metrics.speedIndex}`);
    console.log('='.repeat(60) + '\n');

    return bestRun;
  } catch (error) {
    console.error(`❌ Erreur lors de l'audit: ${error.message}`);
    throw error;
  } finally {
    await chrome.kill();
  }
}

function calculateAverageScores(runs) {
  const scores = {
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
    pwa: 0,
  };

  runs.forEach(run => {
    scores.performance += run.lhr.categories.performance.score * 100;
    scores.accessibility += run.lhr.categories.accessibility.score * 100;
    scores.bestPractices += run.lhr.categories['best-practices'].score * 100;
    scores.seo += run.lhr.categories.seo.score * 100;
    scores.pwa += run.lhr.categories.pwa.score * 100;
  });

  const numRuns = runs.length;
  return {
    performance: Math.round(scores.performance / numRuns),
    accessibility: Math.round(scores.accessibility / numRuns),
    bestPractices: Math.round(scores.bestPractices / numRuns),
    seo: Math.round(scores.seo / numRuns),
    pwa: Math.round(scores.pwa / numRuns),
  };
}

async function main() {
  const url = process.argv[2] || 'http://localhost:4200';

  console.log('\n🚀 Audit Lighthouse Complet du Portfolio');
  console.log('==========================================\n');

  try {
    // Audit desktop
    await runLighthouseAudit(url, lighthouseConfig, 'desktop');

    // Audit mobile
    await runLighthouseAudit(url, mobileConfig, 'mobile');

    console.log('\n✅ Audits terminés avec succès!');
    console.log('📁 Consultez les rapports dans le dossier lighthouse-reports/\n');
  } catch (error) {
    console.error('\n❌ Erreur lors des audits:', error);
    process.exit(1);
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = { runLighthouseAudit };
