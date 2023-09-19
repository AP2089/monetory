import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import App from "./App.vue";
import "@/styles/main";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Toast);

app.mount("#app");
