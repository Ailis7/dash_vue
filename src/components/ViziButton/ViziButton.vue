<template>
  <button :class="`
    ViziButton
    ViziButton_Size_${size || 'm'}
    ${social ? 'ViziButton_Social_' + social : ''}
  `"
  >
    <span class="ViziButton-Content">
      <span v-if="Boolean(social)" class="ViziButton-Before">
        <icon class="ViziButton-Icon" :icon="social"/>
      </span>
      <span class="ViziButton-Text">
        <slot></slot>
      </span>
    </span>
  </button>
</template>

<script>
import Icon from '../Icon/Icon.vue';

import './ViziButton.styl'

export default {
  name: 'ViziButton',
  props: {
    size: String,
    social: String
  },
  components: {
    Icon
  }
}
</script>
