<template>
  <span :class="`Icon Icon_Type_${icon} Icon_Size_${size || 'm'}`"></span>
</template>

<script>
import './Icon.styl'

export default {
  name: 'Icon',
  props: {
    icon: String,
    size: String
  }
}
</script>
