import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { Locale } from "vant";
import itIT from "vant/es/locale/lang/it-IT";

Locale.use("it-IT", itIT);
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
