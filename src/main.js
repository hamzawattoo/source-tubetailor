import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueApexCharts from "vue3-apexcharts";
import { VueClipboard } from "@soerenmartius/vue3-clipboard";
import GlobalAlert from './components/Alert.vue';

const pinia = createPinia();

const app = createApp(App);

app.use(router)
  .use(VueApexCharts)
  .use(pinia)
  .use(VueClipboard)
  .component('global-alert', GlobalAlert)
  .mount("#app");
