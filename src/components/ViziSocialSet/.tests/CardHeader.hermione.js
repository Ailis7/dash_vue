describe('ViziSocialSet', function() {
  it('vizisocialset--default-set', function() {
    return this.browser
      .url('/iframe.html?id=vizisocialset--default-set')
      .assertView('plain', '.ViziSocialSet');
  });
});
