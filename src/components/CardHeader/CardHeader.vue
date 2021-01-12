<template>
  <header class="CardHeader">
    <div class="CardHeader-Top">
      <avatar
        :avatar="avatar"
        rounded="xl"
        theme="white"
      />
      <div class="CardHeader-Username">
        <text-tile
          theme="white"
          size="xxxl"
          :centered=true
        >{{ name }}</text-tile>
      </div>
    </div>
    <footer class="CardHeader-Footer">
      <div class="CardHeader-Slogan">
        <text-tile
          theme="white"
        >{{ slogan }}</text-tile>
      </div>
      <div class="CardHeader-SocialButtons">
        <vizi-button
          class="CardHeader-SocialButton"
          v-for="socialNetwork of socialNetworks"
          :key="socialNetwork.title"
          :social="socialNetwork.title.toLowerCase()"
        >{{ socialNetwork.title }}</vizi-button>
      </div>
    </footer>
  </header>
</template>

<script>
import Avatar from '../Avatar/Avatar.vue';
import TextTile from '../TextTile/TextTile.vue';
import ViziButton from '../ViziButton/ViziButton.vue';

import './CardHeader.styl';

export default {
  name: 'CardHeader',
  props: {
    avatar: String,
    name: String,
    slogan: String,
    socialNetworks: Array
  },
  components: {
    Avatar,
    TextTile,
    ViziButton
  }
}
</script>
