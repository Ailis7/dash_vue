import '../../../.storybook/assets/preview.styl';
import '../Theme/Theme.styl';

import ViziButton from '../ViziButton/ViziButton.vue';

export default { title: 'ViziButton' };

export const socialTelegram = () => ({
  components: { ViziButton },
  template: '<vizi-button social="telegram">Telegram</vizi-button>'
});

export const socialWhatsApp = () => ({
  components: { ViziButton },
  template: '<vizi-button social="whatsapp">WhatsApp</vizi-button>'
});
