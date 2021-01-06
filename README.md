# Mocha Environment Driven B.D.D.

---
## Installation

### GitHub Packages Setup
In your home directory you should set your `.npmrc` to authentication with GitHub packages like [here](https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-with-a-personal-access-token).

Then in the project that is using this dependency you have to set a local, the the project, `.npmrc` that points to use GitHub packages like [here](https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#publishing-a-package-using-a-local-npmrc-file). (You could probably also use `publishConfig` in the `package.json` if you wanted.)

```
npm install @legalshield/mocha-env-bdd@<version>
```

### package.json Scripts
```json
{
  "scripts": {
    "test": "mocha --require @legalshield/mocha-env-bdd --ui env-bdd"
  }
}
```

---
## Usage

### Exclude Prod
all `describe` and `it` calls will exclude prod by default

### Include Prod
Normal run:

```js
describe.include_prod('My Include Prod Describe Block', () => {
  // This would run in production

  it('My It Block', () => {
    // This would not run in production
  });

  it.include_prod('My Include Prod It Block', () => {
    // This would run in production
  });

  describe('My Describe Block', () => {
    // This would not run in production

    it('My It Block', () => {
      // This would not run in production
    });

    it.include_prod('My Include Prod It Block', () => {
      // This would not run in production
    });
  });
});
```

### Only Prod

Likewise for `only_prod`

```js
describe.only_prod('My Only Include Prod Describe Block', () => {
  it('My It Block', () => {
    //this would never run
  });

  it.only_prod('My Only Include Prod It Block', () => {
    //this only runs on production
  });
});

```

### Focus on test (only)

Focus on an individual describe block:

```js
describe.only('My Describe Only Block', () => {
  it('My It Block', () => {
    // This would not run in production
  });

  it.include_prod('My Include Prod It Block', () => {
    // This would not run in production
  });
});

describe('My Describe Block', () => {
  it('My It Block', () => {
    // This would not run at all since the other block is focused
  });

  it.include_prod('My Include Prod It Block', () => {
    // This would not run at all since the other block is focused
  });
});
```

Focus on an individual describe include prod block:

```js
describe.include_prod.only('My Describe Include Prod Only Block', () => {
  it('My It Block', () => {
    // This would not run in production
  });

  it.include_prod('My Include Prod It Block', () => {
    // This would run in production
  });
});

describe('My Describe Block', () => {
  it('My It Block', () => {
    // This would not run at all since the other block is focused
  });

  it.include_prod('My Include Prod It Block', () => {
    // This would not run at all since the other block is focused
  });
});
```

Focus on an individual it block:

```js
describe('My Describe Block', () => {
  it.only('My It Only Block', () => {
    // This would not run in production
  });

  it.include_prod('My Include Prod It Block', () => {
    // This would not run at all since the other block is focused
  });
});

describe('My Describe Block', () => {
  it('My It Block', () => {
    // This would not run at all since the other block is focused
  });

  it.include_prod('My Include Prod It Block', () => {
    // This would not run at all since the other block is focused
  });
});
```

Focus on an individual it include prod block:

```js
describe('My Describe Only Block', () => {
  it('My It Block', () => {
    // This would not run at all since the other block is focused
  });

  it.include_prod.only('My Include Prod It Only Block', () => {
    // This would run in production
  });
});

describe('My Describe Block', () => {
  it('My It Block', () => {
    // This would not run at all since the other block is focused
  });

  it.include_prod('My Include Prod It Block', () => {
    // This would not run at all since the other block is focused
  });
});
```

---
## Notes
* Production is determined as the environment if an environment variable named `ENVIRONMENT` is found and set to either `prod` or `production`. (The value set is case-insensitive.)
* For the focus tests when including prod you can mix the order like so:
  * `describe.only.include_prod` or `describe.include_prod.only`
  * `it.only.include_prod` or `it.include_prod.only`
