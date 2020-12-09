'use strict';

const Mocha = require('mocha');
const Suite = require('mocha/lib/suite');
const Test = require('mocha/lib/test');

module.exports = Mocha.interfaces['env-bdd'] = function (suite) {
  let suites = [suite];

  suite.on('pre-require', function (context, file, mocha) {
    let common = require('mocha/lib/interfaces/common')(suites, context, mocha);

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

    context.describe.only = function(title, fn) {
      if (process.env.ENVIRONMENT && (
          process.env.ENVIRONMENT.toLowerCase() === 'prod' ||
          process.env.ENVIRONMENT.toLowerCase() === 'production')) {
        suite.pending = true;

        return common.suite.only({
          title: title,
          file: file,
          fn: fn
        });
      } else {
        return common.suite.only({
          title: title,
          file: file,
          fn: fn
        });
      }
    };

    context.describe.include_prod = function (title, fn) {
      let suite = Suite.create(suites[0], title);

      suites.unshift(suite);
      fn();
      suites.shift();
    }

    context.describe.include_prod.only = function (title, fn) {
      return common.suite.only({
        title: title,
        file: file,
        fn: fn
      });
    }

    context.describe.only.include_prod = function (title, fn) {
      return context.describe.include_prod.only(title, fn);
    }

    context.it = function (title, fn) {
      let test;

      if (process.env.ENVIRONMENT && (
          process.env.ENVIRONMENT.toLowerCase() === 'prod' ||
          process.env.ENVIRONMENT.toLowerCase() === 'production')) {
        test = new Test(title, undefined);

        suites[0].addTest(test);
      } else {
        test = new Test(title, fn);

        suites[0].addTest(test);
      }

      return test;
    }

    context.it.only = function(title, fn) {
      return common.test.only(mocha, context.it(title, fn));
    };

    context.it.include_prod = function (title, fn) {
      const test = new Test(title, fn);

      suites[0].addTest(test);

      return test;
    };

    context.it.include_prod.only = function(title, fn) {
      return common.test.only(mocha, context.it.include_prod(title, fn));
    };

    context.it.only.include_prod = function(title, fn) {
      return it.include_prod.only(title, fn);
    };
  });
}
