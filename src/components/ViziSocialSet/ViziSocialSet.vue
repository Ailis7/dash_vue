<template>
  <section class="ViziSocialSet">
    <vizi-callout
      class="ViziSocialSet-Item"
      v-for="socialNetwork of socialNetworks"
      :key="socialNetwork.title"
      :icon="socialNetwork.title.toLowerCase()"
      :theme="theme"
      :url="socialNetwork.url"
    />
  </section>
</template>

<script>
import ViziCallout from '../ViziCallout/ViziCallout.vue'

import './ViziSocialSet.styl';

export default {
  name: 'ViziSocialSet',
  props: {
    socialNetworks: Array,
    theme: String
  },
  components: {
    ViziCallout
  }
}
</script>

