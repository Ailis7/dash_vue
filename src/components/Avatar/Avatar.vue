<template>
  <div
    :class="`
      Avatar
      Avatar_Rounded_${rounded}
      Avatar_Size_${size || 'm'}
      Avatar_Theme_${theme}
    `"
  >
    <div class="Avatar-Image" :style="`background-image: url('${avatar}')`"></div>
  </div>
</template>

<script>
import './Avatar.styl';

export default {
  name: 'Avatar',
  props: {
    avatar: String,
    rounded: String,
    size: String,
    theme: String
  }
}
</script>
