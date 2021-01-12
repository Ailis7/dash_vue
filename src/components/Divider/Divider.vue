<template>
  <div class="Divider">
    <hr class="Divider-Hr"/>
    <div
      v-if="Boolean(text)"
      class="Divider-Text Typo Typo_Size_xs"
    >{{ text }}</div>
  </div>
</template>

<script>
import './Divider.styl';
import '../Typo/Typo.styl';

export default {
  name: 'Divider',
  props: {
    text: String
  }
}
</script>
