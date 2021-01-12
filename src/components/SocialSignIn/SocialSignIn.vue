<template>
  <div class="SocialSignIn">
    <div class="SocialSignIn-Gallery">
      <div
        v-for="social of socialNetworks"
        :key="social.id"
        :class="`SocialSignIn-Item SocialSignIn-Item_Social_${social.title}`"
      >
      </div>
    </div>
  </div>
</template>

<script>
import './SocialSignIn.styl';

export default {
  name: 'SocialSignIn',
  props: {
    networks: Array
  },
  data() {
    return {
      socialNetworks: this.networks.map((title, i) => {
        return {
          id: i,
          title
        };
      })
    }
  }
}
</script>
