import '../../../.storybook/assets/preview.styl';
import '../Theme/Theme.styl';

import ViziCallout from '../ViziCallout/ViziCallout.vue';

export default { title: 'ViziCallout' };

export const defaultTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="white" title="Theme White" />'
});

export const beigeTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="beige" title="Theme Beige" />'
});

export const blueTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="blue" title="Theme Blue" />'
});

export const greenTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="green" title="Theme Green" />'
});

export const lightBlueTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="light-blue" title="Theme Light Blue" />'
});

export const limeTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="lime" title="Theme Lime" />'
});

export const orangeTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="orange" title="Theme Orange" />'
});

export const peachTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="peach" title="Theme Peach" />'
});

export const pinkTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="pink" title="Theme Pink" />'
});

export const purpleTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="purple" title="Theme Purple" />'
});

export const redTheme = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="red" title="Theme Red" />'
});

export const withArrow = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="white" :filledArrow=true title="With Arrow" />'
});

export const withWhiteArrow = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="red" :filledArrow=true title="With White Arrow" />'
});

export const iconFacebook = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="white" icon="facebook" />'
});

export const iconTwitter = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="white" icon="twitter" />'
});

export const iconOk = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="white" icon="ok" />'
});

export const iconInstagram = () => ({
  components: { ViziCallout },
  template: '<vizi-callout theme="white" icon="instagram" />'
});
