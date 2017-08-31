const browserIndex = process.argv.indexOf('--browser')
const browserArg = browserIndex>=0 ? process.argv[browserIndex+1] : ''

const setup = {
  basePath: 'src',
  frameworks: ['jasmine', '@angular/cli'],
  plugins: [
    require('karma-jasmine'),
    require('karma-chrome-launcher')
  ],
  browsers: ['Chrome'], /* add PhatomJS here */
  singleRun: false,
  browserDisconnectTolerance : 2,
  browserNoActivityTimeout : 20000,
  browserDisconnectTimeout : 5000
}

if(!browserArg){
  setup.customLaunchers = require('./test/sauce-browsers').customLaunchers()
}else{
  setup.browsers.push('PhantomJS')
  setup.plugins.push( require('karma-phantomjs-launcher') )
  setup.plugins.push( require('karma-jasmine-html-reporter') )
  setup.plugins.push( require('karma-coverage-istanbul-reporter') )
}

setup.files = [
  {pattern: 'src/*.spec.ts'}
]
/*setup.files = [
  {pattern: './scripts/test.ts', watched: false}
]
setup.preprocessors = {
  './scripts/test.ts': ['@angular/cli']
}*/

setup.plugins.push( require('@angular/cli/plugins/karma') )

module.exports = function (config) {
  config.set(setup);
};