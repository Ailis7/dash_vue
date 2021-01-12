<template>
  <main class="SignUpPage">
    <header class="SignUpPage-Header">
      <div v-if="['signup', 'signin'].includes(mode)" class="SignUpPage-Logo">
      </div>
      <interface-link v-if="mode === 'signin'" theme="blue" url="/start/signup">Регистрация</interface-link>
      <interface-link v-if="mode === 'signup'" theme="blue" url="/start/signin">Войти</interface-link>
    </header>
    <h1 class="SignUpPage-Title Typo Typo_Size_super-l">{{
      { signin: 'Авторизация', signup: 'Регистрация' }[mode]
    }}</h1>
    <form class="SignUpPage-Form">
      <form-field class="SignUpPage-FormField" :centered=true placeholder="Email"/>
      <form-field
        class="SignUpPage-FormField"
        :afterLink="mode === 'signin' && {
          text: 'Забыли пароль?',
          url: '/restore-password'
        }"
        :centered=true
        type="password"
        placeholder="Пароль"
      />
      <form-button class="SignUpPage-SubmitButton" icon="arrow-white" theme="blue" v-on:click="onSubmit">{{
        { signin: 'Войти', signup: 'Зарегистрироваться' }[mode]
      }}</form-button>
    </form>
    <divider class="SignUpPage-Divider" text="ИЛИ"></divider>
    <paragraph size="s" :centered=true>{{
        {
          signin: 'Авторизуйтесь через социальные сети',
          signup: 'Зарегистрируйтесь через социальные сети'
        }[mode]
      }}</paragraph>
    <social-sign-in
      class="SignUpPage-Social"
      :networks="['facebook', 'googleplus', 'instagram']"
    />
  </main>
</template>

<script>
import InterfaceLink from '../InterfaceLink/InterfaceLink.vue';
import FormField from '../FormField/FormField.vue';
import FormButton from '../FormButton/FormButton.vue';
import Divider from '../Divider/Divider.vue';
import Paragraph from '../Paragraph/Paragraph.vue';
import SocialSignIn from '../SocialSignIn/SocialSignIn.vue'

import '../Theme/_SignUp/Theme_SignUp.styl';
import '../Typo/Typo.styl';
import './SignUpPage.styl';

export default {
  name: 'SignUpPage',
  props: {
    mode: String
  },
  components: {
    InterfaceLink,
    FormField,
    FormButton,
    Divider,
    Paragraph,
    SocialSignIn
  },
  methods: {
    onSubmit() {
      if (this.mode === 'signup') {
        this.$router.push('/register/1');
      }
    }
  }
}
</script>
