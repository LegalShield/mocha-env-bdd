# Mocha Environment Driven B.D.D.

---
## Installation

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
