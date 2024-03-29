import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueApexCharts from "vue3-apexcharts";
import { VueClipboard } from "@soerenmartius/vue3-clipboard";
import GlobalAlert from './components/Alert.vue';

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(VueApexCharts)
  .use(pinia)
  .use(VueClipboard)
  .mount("#app");
  app.component('global-alert', GlobalAlert);

  app.mount('#app');