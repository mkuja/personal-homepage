import { createApp } from 'vue';
import { Vue3Mq } from 'vue3-mq';

import App from './App.vue';

const app = createApp(App);
app.use(Vue3Mq, {
   breakpoints: {
      mobile: 0,
      desktop: 900
   }
});
app.mount('#app');
