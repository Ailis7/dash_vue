<template>
  <router-link :class="`
    InterfaceLink
    InterfaceLink_Theme_${theme}
    Typo_Size_m
  `.trim()" :to="url">
    <slot></slot>
  </router-link>
</template>

<script>
import './InterfaceLink.styl';

export default {
  name: 'InterfaceLink',
  props: {
    theme: String,
    url: String
  }
}
</script>
