<template>
  <main class="RestorePasswordPage">
    <header class="RestorePasswordPage-Header">
      <div class="RestorePasswordPage-Back" @click="onBackClick">
        <img class="RestorePasswordPage-BackIcon" src="../../assets/back-black.svg"/>
        <span class="RestorePasswordPage-BackText Typo Typo_Size_xxxl">Назад</span>
      </div>
      <interface-link theme="blue" url="/start/signin">Войти</interface-link>
    </header>
    <h1 class="RestorePasswordPage-Title Typo Typo_Size_super-l">
      Забыли пароль?
    </h1>
    <h2 class="RestorePasswordPage-Subtitle Typo Typo_Size_xxxl">
      {{ {
        restore: 'Введите почту для сброса пароля',
        success: 'На Ваш e-mail отправлена ссылка для восстановления пароля. Следуйте инструкциям в письме.'
      }[mode] }}
    </h2>
    <form class="RestorePasswordPage-Form">
      <form-field
        v-show="mode === 'restore'"
        class="RestorePasswordPage-FormField"
        :centered=true
        placeholder="Email"
        v-on:input="onEmailInput"
      />
      <form-button
        v-show="mode === 'restore'"
        class="RestorePasswordPage-SubmitButton"
        :disabled="!email"
        theme="blue"
        v-on:click="onSubmit"
      >
        Сбросить пароль
      </form-button>
      <form-button
        v-show="mode === 'success'"
        class="RestorePasswordPage-SubmitButton"
        theme="blue"
        v-on:click="onReady"
      >
        Готово
      </form-button>
    </form>
  </main>
</template>

<script>
import InterfaceLink from '../InterfaceLink/InterfaceLink.vue';
import FormField from '../FormField/FormField.vue';
import FormButton from '../FormButton/FormButton.vue';

import '../Theme/_SignUp/Theme_SignUp.styl';
import '../Typo/Typo.styl';
import './RestorePasswordPage.styl';

export default {
  name: 'RestorePasswordPage',
  components: {
    InterfaceLink,
    FormField,
    FormButton
  },
  data() {
    return {
      email: undefined,
      mode: 'restore'
    };
  },
  methods: {
    onEmailInput(value) {
      this.email = value;
    },
    onSubmit() {
      this.mode = 'success'
    },
    onReady() {
      this.$router.push('/start/signin');
    },
    onBackClick() {
      this.$router.go(-1);
    }
  }
}
</script>
