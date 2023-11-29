// karma.conf.js
const puppeteer = require('puppeteer');

module.exports = function(config) {
  config.set({
    // ... other Karma configuration options
    browsers: ['CustomChromeHeadless'],
    customLaunchers: {
      CustomChromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    },
    // ... other configuration options
  });
};