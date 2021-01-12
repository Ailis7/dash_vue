<template>
  <p :class="`
    Paragraph
    ${centered ? 'Paragraph_Centered' : ''}
    Typo_Size_${size}
    `.trim()"
  >
    <slot></slot>
  </p>
</template>

<script>
import './Paragraph.styl';
import '../Typo/Typo.styl';

export default {
  name: 'Paragraph',
  props: {
    centered: Boolean,
    size: String
  }
}
</script>
