<template>
  <div class="TextInput">
    <input
      v-if="mode === 'oneline'"
      class="TextInput-Input TextInput-Input_Mode_Oneline"
      :placeholder="`${placeholder ? placeholder : ''}`"
      v-model="inputValue"
      @input="onInput"
    >
    <textarea-autosize
      class="TextInput-Input TextInput-Input_Mode_Multiline"
      v-if="mode === 'multiline'"
      :rows="rows ? rows : 1"
      :placeholder="`${placeholder ? placeholder : ''}`"
      v-model="inputValue"
      @input="onInput"
    />
  </div>
</template>

<script>
import './TextInput.styl';
import Vue from 'vue'
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueTextareaAutosize)


export default {
  name: 'TextInput',
  props: {
    mode: String,
    placeholder: String,
    rows: Number,
    value: String
  },
  data() {
    return {
      inputValue: this.value || ''
    }
  },
  methods: {
    onInput() {
      this.$emit('input', this.inputValue);
    }
  }
}
</script>
