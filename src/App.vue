<template>
  <div>
    <nav v-if="$route.path === '/'">
      <h1>Welcome to Vizi!</h1>
      <ul>
        <li>
          <router-link to="/card/black">Черная карта</router-link>
        </li>
        <li>
          <router-link to="/example">Пример</router-link>
        </li>
        <li>
          <router-link to="/json-editor">Редактор</router-link>
        </li>
        <li>
          <router-link to="/start/signin">Вход</router-link>
        </li>
        <li>
          <router-link to="/register/1">Регистрация</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  mounted() {
    console.log(this.$route.path);
  }
}
</script>

