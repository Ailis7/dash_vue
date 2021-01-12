<template>
  <div>
    <textarea style="width: 100%" rows="30"></textarea>
    <button @click="onSubmit">Сохранить</button>
    <br/>
    <router-link to="/example">Результат</router-link>
  </div>
</template>

<script>
export default {
  name: 'JsonEditor',
  methods: {
    onSubmit() {
      this.$store.commit('change', this.$el.querySelector('textarea').value);
    }
  },
  mounted() {
    this.$el.querySelector('textarea').value = JSON.stringify(this.$store.state.json);
  }
}
</script>
