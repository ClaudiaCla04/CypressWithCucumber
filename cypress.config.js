const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const fs = require("fs-extra");
const path = require("path");

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-test-output-[hash].xml',
    toConsole: true,
  },
  e2e: {
      setupNodeEvents(on, config) {
       on('before:run', () => {
        const folderPath = './results';
          return new Promise((resolve, reject) => {
            fs.readdir(folderPath, (err, files) => {
              if (err) return reject(`Failed to read folder: ${err}`);
                const xmlFiles = files.filter((file) =>
                  file.endsWith(".xml"));
              if (xmlFiles.length === 0) {
                  return resolve("No xmlFiles found to delete.");}
                xmlFiles.forEach((file) => {
                  const filePath = path.join(folderPath, file);
                  fs.unlinkSync(filePath);
                });
                resolve(`Deleted ${xmlFiles.length} xmlFiles.`);
              });
            });
        }),
       addCucumberPreprocessorPlugin(on, config);
       on("file:preprocessor", createBundler({plugins: [createEsbuildPlugin(config)],
    })
   );
    return config;
      },  
    specPattern: "**/*.feature",
    env: {
      prestashop_url: "http://10.115.8.126:3002/en/",
      streamo_url: "http://10.115.8.126:5555/",
      api_test_url: "https://conduit.bondaracademy.com/",
      iframe_url: "https://webdriveruniversity.com/IFrame/index.html",
      uiPlayground_url: "http://uitestingplayground.com/"
    },
    viewportWidth: 1800,
    viewportHeight: 1200
  },
});
