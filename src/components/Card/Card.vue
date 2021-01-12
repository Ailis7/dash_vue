<template>
  <main :class="`Card Card_Theme_${theme}`">
    <slot></slot>
  </main>
</template>

<script>
import '../Theme/Theme.styl';
import './Card.styl';

export default {
  name: 'Card',
  props: {
    theme: String
  }
}
</script>
