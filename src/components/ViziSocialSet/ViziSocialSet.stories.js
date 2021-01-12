import '../../../.storybook/assets/preview.styl';
import '../Theme/Theme.styl';

import ViziSocialSet from '../ViziSocialSet/ViziSocialSet.vue';

export default { title: 'ViziSocialSet' };

export const defaultSet = () => ({
  components: { ViziSocialSet },
  template: `<vizi-social-set :socialNetworks="[{
    title: 'Facebook',
    url: 'https://www.facebook.com/'
  }, {
    title: 'Twitter',
    url: 'https://www.twitter.com/'
  }, {
    title: 'Instagram',
    url: 'https://www.instagram.com/'
  }]"/>`
});

