const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    baseUrl: "https://demo.1crmcloud.com",
    watchForFileChanges: false,
    scrollBehavior: "center",
    setupNodeEvents(on) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
  env: {
    login: "admin",
    password: "admin",
  },
  video: false,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "reports",
    overwrite: false,
    html: false,
    json: true,
  },
});
