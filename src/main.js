import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import './assets/style/_overrides.sass'
import 'bootstrap/scss/bootstrap.scss';
import './assets/style/main.sass';
import "ggtu-map/dist/main.css"

Vue.prototype.$http = axios;

Vue.config.productionTip = false;
Vue.filter('buildingType', type => {
  switch (type) {
    case 'study': return 'Учебный корпус';
    case 'live': return 'Общежитие';
    default: return 'Строение';
  }
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
