const QmateService = require("@sap_oss/wdio-qmate-service");

exports.config = {

    runner: 'local',
    specs: [
        [
            "./specs/01_createNewPO.spec.js",
            "./specs/02_checkListReport.spec.js",
        ],
    ],

    params: {
        qmateCustomTimeout: 700000,
        import: {
            data: "./data/",
            purchaseOrder: "./data/purchaseOrder.json"
        },
        export: {
            purchaseOrder: "./data/purchaseOrder.json"
        }
    },

    maxInstances: 3,

    capabilities: [{
        // capabilities for local browser web tests
        browserName: "chrome", // or "firefox", "microsoftedge", "safari",
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                "--output=/dev/null",
                "--log-level=3",
                "--no-sandbox",
                "--incognito",
                "--ignore-certificate-errors",
                "--window-size=1920,1200",
                "--whitelisted-ips",
                "--disable-dev-shm-usage",
                //"--headless",
                "--disable-gpu",
                "--disable-web-security",
                "--disable-infobars",
                "--disable-extensions",
                "--disable-logging",
                "--lang=en-US"
            ]
        }
    }],

    logLevel: 'warn',

    baseUrl: 'https://us4.leverx.local:44302/sap/bc/ui2/flp',

    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    waitForUI5Timeout: 90000,

    services: [[QmateService],['chromedriver']],

    framework: 'mocha',
    mochaOpts: {
        timeout: 60000
    },

    reporters: ['spec'],
    
};