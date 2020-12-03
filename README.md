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

## Notes
Production is determined as the environment if an environment variable named `ENVIRONMENT` is found and set to either `prod` or `production`. (The value set is case-insensitive.)
