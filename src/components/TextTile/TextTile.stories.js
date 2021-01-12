import '../../../.storybook/assets/preview.styl';
import '../Theme/Theme.styl';

import TextTile from '../TextTile/TextTile.vue';

export default { title: 'TextTile' };

export const defaultTheme = () => ({
  components: { TextTile },
  template: '<text-tile theme="white">default</text-tile>'
});

export const sizeL = () => ({
  components: { TextTile },
  template: '<text-tile theme="white" size="l">size L</text-tile>'
});

export const sizeXXXL = () => ({
  components: { TextTile },
  template: '<text-tile theme="white" size="xxxl">size XXXL</text-tile>'
});

export const centered = () => ({
  components: { TextTile },
  template: '<text-tile theme="white" :centered=true>size XXXL</text-tile>'
});

export const withSmallText = () => ({
  components: { TextTile },
  template: '<text-tile theme="white" size="l" smallText="Subtitle">Title</text-tile>'
});
