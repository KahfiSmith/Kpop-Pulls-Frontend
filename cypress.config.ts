import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    // Optimasi untuk performa
    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 10000,
    // Matikan auto-scroll untuk performa
    scrollBehavior: false,
    // Nonaktifkan fitur yang tidak diperlukan
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Folder untuk test files
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Folder untuk support files
    supportFile: 'cypress/support/e2e.ts',
  },
  // Hapus component testing jika tidak digunakan
  // component: {
  //   devServer: {
  //     framework: 'next',
  //     bundler: 'webpack',
  //   },
  //   // Folder untuk component tests
  //   specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  //   supportFile: 'cypress/support/component.ts',
  // },
})
