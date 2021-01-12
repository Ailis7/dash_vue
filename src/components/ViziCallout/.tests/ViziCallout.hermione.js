describe('ViziCallout', function() {
  it('vizicallout--default-theme', function() {
    return this.browser
      .url('/iframe.html?id=vizicallout--default-theme')
      .assertView('plain', '.ViziCallout');
  });

  [
    'beige',
    'blue',
    'green',
    'light-blue',
    'lime',
    'orange',
    'peach',
    'pink',
    'purple',
    'red'
  ].forEach(color => {
    it(`vizicallout--${color}-theme`, function() {
      return this.browser
        .url(`/iframe.html?id=vizicallout--${color}-theme`)
        .assertView('plain', '.ViziCallout');
    });
  });

  it(`vizicallout--with-arrow`, function() {
    return this.browser
      .url(`/iframe.html?id=vizicallout--with-arrow`)
      .assertView('plain', '.ViziCallout');
  });

  it(`vizicallout--with-white-arrow`, function() {
    return this.browser
      .url(`/iframe.html?id=vizicallout--with-white-arrow`)
      .assertView('plain', '.ViziCallout');
  });

  [
    'facebook',
    'ok',
    'twitter',
    'instagram'
  ].forEach(social => {
    it(`vizicallout--icon-${social}`, function() {
      return this.browser
        .url(`/iframe.html?id=vizicallout--icon-${social}`)
        .assertView('plain', '.ViziCallout');
    });
  });
});
