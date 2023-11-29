// karma.conf.js
const puppeteer = require('puppeteer');

process.env.CHROME_BIN  =  require('puppeteer').executablePath();
console.log(require('puppeteer').executablePath());


module.exports = function(config) {
    config.set({
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json",
            bundlerOptions: {
                exclude: [
                    "react/addons",
                    "react/lib/ExecutionEnvironment",
                    "react/lib/ReactContext",
                ]
            },
            coverageOptions: {
                instrumentation: true,
                exclude: /\.(d|spec|test)\.(ts|tsx)/i
            },
            reports: {
                "cobertura": {
                    "directory": "build_reports/coverage",
                    "filename": "coverage.xml",
                    "subdirectory": "cobertura"
                },
                "html": "build_reports/coverage",
                "text-summary": ""
            }
        },
        frameworks: ['mocha', 'karma-typescript'],
        files: [
            { pattern: '!(node_modules|Server|dist)/**/*.+(ts|tsx)' }
        ],
        "exclude": [
            "**/*.d.ts"
        ],
        preprocessors: {
            '!(node_modules|Server|dist)/**/*.+(ts|tsx)': 'karma-typescript',
        },
        reporters: ['progress', 'junit', 'mocha', 'karma-typescript'],

        junitReporter: {
            outputDir: 'build_reports/test-results',
            outputFile: 'test-results.xml'
        },

        browsers: ['ChromeHeadless'],
        plugins: [
            'karma-chrome-launcher',
            'karma-typescript',
            'karma-mocha',
            'karma-junit-reporter',
            'karma-mocha-reporter'
        ],
        singleRun: false,

        colors: true,

        logLevel: config.LOG_INFO,
    });
};




// module.exports = function(config) {
//   config.set({
//     // ... other Karma configuration options
//     browsers: ['Puppeteer'],
//     customLaunchers: {
//       Puppeteer: {
//         base: 'ChromeHeadless',
//         flags: [
//           '--no-sandbox',
//           '--disable-setuid-sandbox',
//           '--disable-gpu',
//           '--disable-software-rasterizer',
//           '--disable-dev-shm-usage',
//           '--headless',
//           '--remote-debugging-port=9222',
//         ],
//       },
//     },
//     // ... other configuration options
//   });
// };
