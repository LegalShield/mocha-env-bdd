require('../index');

describe('My Describe Block', () => {
  it('My It Block', () => {
  });

  it.skip_prod('My Skip Prod It Block', () => {
  });

  describe.skip_prod('My Skip Prod Describe Block', () => {
    it('My It Block', () => {
    });
  });
});
