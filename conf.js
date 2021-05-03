exports.config = {

  directConnect: true,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      './googleMap.js',
      './env.js'
    ],
    format: 'json:HTML-REPORT/results.json',
  },

  specs: [
    './googleMap.feature'
  ],

  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      // read the options part for more options
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
    }
  }],

  onPrepare: function () {
    browser.driver.manage().window().maximize();
    browser.waitForAngularEnabled(false);
  }

}