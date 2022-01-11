import {ApiClient} from 'ggtu-map';
import router from '../router';
const user = JSON.parse(localStorage.getItem('user'));
/**
 *
 * @type {ApiClient}
 */
const api = ApiClient.getInstance({
  user,
  apiUrl: process.env.VUE_APP_API_URL
});
api.getTransport().interceptors.response.use(response => response, error => {
  console.log(error.response.config.url);
  if (!error.response.config.url.match(/\/auth$/)) {
    if (error.response && error.response.status === 401) {
      console.log('redirect');
      router.push('/login')
    }
  }

});
export {api};
