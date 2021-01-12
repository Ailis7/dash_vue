import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta'
import App from './App.vue';

import Card from './components/Card/Card.vue';
import Page from './components/Page/Page.vue';
import JsonEditor from './components/JsonEditor/JsonEditor.vue';

import CardHeader from './components/CardHeader/CardHeader.vue';
import SignUpPage from './components/SignUpPage/SignUpPage.vue';
import RegisterPage from './components/RegisterPage/RegisterPage.vue';
import RestorePasswordPage from './components/RestorePasswordPage/RestorePasswordPage.vue';
import ViziCallout from './components/ViziCallout/ViziCallout.vue';
import ViziSocialSet from './components/ViziSocialSet/ViziSocialSet.vue';

import store from './store';

Vue.use(VueRouter);
Vue.use(VueMeta);

Vue.component(Card.name, Card);
Vue.component(CardHeader.name, CardHeader);
Vue.component(ViziCallout.name, ViziCallout);
Vue.component(ViziSocialSet.name, ViziSocialSet);

Vue.config.productionTip = false;

const routes = [
  { path: '/card/:theme', component: Card, props: true },
  { path: '/example', component: Page },
  { path: '/register/:step', component: RegisterPage, props: true },
  { path: '/restore-password', component: RestorePasswordPage },
  { path: '/json-editor', component: JsonEditor },
  { path: '/start/:mode', component: SignUpPage, props: true }
];

const router = new VueRouter({ routes });

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
