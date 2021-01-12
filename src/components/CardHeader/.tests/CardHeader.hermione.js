describe('CardHeader', function() {
  it('cardheader--default-header', function() {
    return this.browser
      .url('/iframe.html?id=cardheader--default-header')
      .assertView('plain', '.CardHeader');
  });
});
