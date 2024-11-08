import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    experimentalStudio: true,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'cypress/results/TEST-integration.xml',
      toConsole: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
