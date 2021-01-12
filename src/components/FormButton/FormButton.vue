<template>
  <button :class="`
    FormButton
    ${disabled ? 'FormButton_Disabled' : ''}
    ${slim ? 'FormButton_Slim' : ''}
    FormButton_Theme_${theme}
    ${Boolean(icon) ? 'FormButton_Icon_' + icon : ''}
    Typo Typo_Size_${slim ? 'xxl' : 'super'}
  `.trim()"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
import './FormButton.styl';
import '../Typo/Typo.styl';

export default {
  name: 'FormButton',
  props: {
    disabled: Boolean,
    icon: String,
    slim: Boolean,
    theme: String
  },
  methods: {
    onClick() {
      if (!this.disabled) this.$emit('click');
    }
  }
}
</script>
