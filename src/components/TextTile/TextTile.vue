<template>
  <div :class="`
    TextTile
    ${centered ? 'TextTile_Centered' : ''}
    TextTile_Size_${size ? size : 'm'}
    TextTile_Theme_${theme}
  `">
    <slot></slot>
    <small v-if="smallText" class="TextTile-SmallText">{{ smallText }}</small>
  </div>
</template>

<script>
import './TextTile.styl';

export default {
  name: 'TextTile',
  props: {
    centered: Boolean,
    size: String,
    smallText: String,
    theme: String
  }
}
</script>
