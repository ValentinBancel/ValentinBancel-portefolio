// karma.conf.js
const puppeteer = require('puppeteer');

module.exports = function(config) {
  config.set({
    // ... other Karma configuration options
    browsers: ['Puppeteer'],
    customLaunchers: {
      Puppeteer: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--disable-software-rasterizer',
          '--disable-dev-shm-usage',
          '--headless',
          '--remote-debugging-port=9222',
        ],
      },
    },
    // ... other configuration options
  });
};
