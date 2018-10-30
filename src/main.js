// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import * as FastClick from 'fastclick';
import { Field, FieldItem, InputItem, Button, Toast, Swiper, SwiperItem, Picker, ActionSheet } from 'mand-mobile';
import Header from '@/components/header';
import actionBar from '@/components/actionBar';
import loadmore from '@/components/loadmore';

import axios from './axios';
import './assets/theme.custom.styl';
import App from './App';
import router from './router';
import store from './store/index'
Vue.component(Header.name, Header);
Vue.component(actionBar.name, actionBar);
Vue.component(loadmore.name, loadmore);

Vue.component(Field.name, Field);
Vue.component(FieldItem.name, FieldItem);
Vue.component(InputItem.name, InputItem);
Vue.component(Button.name, Button);
Vue.component(Toast.name, Toast);
Vue.component(Swiper.name, Swiper);
Vue.component(SwiperItem.name, SwiperItem);
Vue.component(Picker.name, Picker);
Vue.component(ActionSheet.name, ActionSheet);
Vue.config.productionTip = false;

Vue.prototype.axios = axios;
Vue.prototype.$Toast = Toast;
Vue.prototype.$baseUrl = 'http://60.255.48.150:9018';
FastClick.attach(document.body);

/* eslint-disable no-new */
window.$app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
