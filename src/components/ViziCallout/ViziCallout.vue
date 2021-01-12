<template>
  <button :class="`
    ViziCallout
    ${filledArrow ? 'ViziCallout_WithFilledAfter' : ''}
    ViziCallout_Circle_${Boolean(icon) && !Boolean(title) ? 'yes' : 'no'}
    ${Boolean(icon) ? 'ViziCallout_WithIcon ViziCallout_Icon_' + icon : ''}
    ViziCallout_Size_${size || 'm'}
    ViziCallout_Theme_${theme}
  `.trim()"
  >
    <span class="ViziCallout-Inner">
      <text-tile
        v-if="Boolean(title)"
        size="l"
        :smallText="subtitle"
        theme="white"
      >{{ title }}</text-tile>
    </span>
  </button>
</template>

<script>
import TextTile from '../TextTile/TextTile.vue';

import './ViziCallout.styl'

export default {
  name: 'ViziCallout',
  props: {
    filledArrow: Boolean,
    icon: String,
    size: String,
    subtitle: String,
    title: String,
    theme: String,
    url: String
  },
  components: {
    TextTile
  }
}
</script>
