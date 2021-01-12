describe('TextTile', function() {
  it('texttile--default-theme', function() {
    return this.browser
      .url('/iframe.html?id=texttile--default-theme')
      .assertView('plain', '.TextTile');
  });

  it('texttile--size-l', function() {
    return this.browser
      .url('/iframe.html?id=texttile--size-l')
      .assertView('plain', '.TextTile');
  });

  it('texttile--size-xxxl', function() {
    return this.browser
      .url('/iframe.html?id=texttile--size-xxxl')
      .assertView('plain', '.TextTile');
  });

  it('texttile--centered', function() {
    return this.browser
      .url('/iframe.html?id=texttile--centered')
      .assertView('plain', '.TextTile');
  });

  it('texttile--with-small-text', function() {
    return this.browser
      .url('/iframe.html?id=texttile--with-small-text')
      .assertView('plain', '.TextTile');
  });
});
