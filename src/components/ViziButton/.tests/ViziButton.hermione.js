describe('ViziButton', function() {
  it('vizibutton--social-telegram', function() {
    return this.browser
      .url('/iframe.html?id=vizibutton--social-telegram')
      .assertView('plain', '.ViziButton');
  });

  it('vizibutton--social-whatsapp', function() {
    return this.browser
      .url('/iframe.html?id=vizibutton--social-whats-app')
      .assertView('plain', '.ViziButton');
  });
});
