'use strict';

const Mocha = require('mocha');
const Suite = require('mocha/lib/suite');
const Test = require('mocha/lib/test');

module.exports = Mocha.interfaces['env-bdd'] = function (suite) {
  let suites = [suite];

  suite.on('pre-require', function (context, file, mocha) {
    let common = require('mocha/lib/interfaces/common')(suites, context);

    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);

    context.describe = function (title, fn) {
      let suite = Suite.create(suites[0], title);

      if (process.env.ENVIRONMENT && (
          process.env.ENVIRONMENT.toLowerCase() === 'prod' ||
          process.env.ENVIRONMENT.toLowerCase() === 'production')) {
        suite.pending = true;
        suites.unshift(suite);
        fn.call(suite);
        suites.shift();
      } else {
        suites.unshift(suite);
        fn();
        suites.shift();
      }
    }

    context.describe.include_prod = function (title, fn) {
      let suite = Suite.create(suites[0], title);

      suites.unshift(suite);
      fn();
      suites.shift();
    }

    context.it = function (title, fn) {
      if (process.env.ENVIRONMENT && (
          process.env.ENVIRONMENT.toLowerCase() === 'prod' ||
          process.env.ENVIRONMENT.toLowerCase() === 'production')) {
        suites[0].addTest(new Test(title, undefined));
      } else {
        suites[0].addTest(new Test(title, fn));
      }
    }

    context.it.include_prod = function (title, fn) {
      suites[0].addTest(new Test(title, fn));
    };
  });
}
