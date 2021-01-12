import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    json: localStorage.getItem('cardJson') ? JSON.parse(localStorage.getItem('cardJson')) : {
      block: 'Card',
      props: {
        theme: 'black'
      },
      content: [
        {
          block: 'CardHeader',
          props: {
            avatar: 'https://i.imgur.com/IwhKo8S.jpg',
            name: 'Тимофей Фалдин',
            slogan: 'Пмогаю в создании личного бренда и построении заработка на нем за 3 мес.',
            socialNetworks: [{
              title: 'Telegram'
            }, {
              title: 'WhatsApp'
            }]
          }
        },
        {
          block: 'ViziCallout',
          props: {
            theme: 'white',
            title: 'Мой официальный сайт'
          }
        },
        {
          block: 'ViziCallout',
          props: {
            filledArrow: true,
            theme: 'white',
            subtitle: 'Превед медвед',
            title: 'Онлайн запись'
          }
        },
        {
          block: 'ViziSocialSet',
          props: {
            socialNetworks: [{
              title: 'Facebook',
              url: 'https://www.facebook.com/'
            }, {
              title: 'Twitter',
              url: 'https://www.twitter.com/'
            }, {
              title: 'Instagram',
              url: 'https://www.instagram.com/'
            }],
            theme: 'white'
          }
        }
      ]
    }
  },
  mutations: {
    change(state, newJson) {
      let json;
      try {
        json = JSON.parse(newJson);
      } catch (e) {
        alert('Это не JSON');
        return;
      }

      delete state.json;

      localStorage.setItem('cardJson', newJson);

      state.json = json;
    }
  },
  actions: {}
});
