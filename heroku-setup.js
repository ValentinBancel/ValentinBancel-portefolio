// heroku-setup.js
const puppeteer = require('puppeteer');

(async () => {
  try {
    await puppeteer.launch();
    console.log('Puppeteer setup successful.');
  } catch (error) {
    console.error('Error setting up Puppeteer:', error);
    process.exit(1);  // Exit with an error code
  }
})();