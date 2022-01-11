import Vue from 'vue'
import Router from 'vue-router'
import buildings from './buildings';
import locations from './locations';
import UserBoard from "../components/UserBoard";
import Login from "../components/Login";
import {api} from '../utils/api';
import Dashboard from "../components/Dashboard";
import UserRegistrationPage from "../components/UserRegistrationPage";

Vue.use(Router);

const authGuard = async (from , to, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    next({name: 'login'});
  } else {
    api.checkToken(api.userInfo.user.token)
      .then((ok) => {
        if (ok) {
          if (to.name === 'login') {
            next({name: 'dashboard'});
          } else {
            next()
          }
        } else {
          localStorage.removeItem('user');
          next({name: 'login'});
        }

      });

  }
};

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Dashboard,
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      name: 'register',
      path: '/register',
      component: UserRegistrationPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: UserBoard,
      meta: {
        requiresAuth: true
      }
    },
    ...buildings,
    ...locations
  ]
});
router.beforeEach(async (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (to.name === 'login') {
    if (!user) {
      next();
    } else {
      await authGuard(from, to, next);
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    await authGuard(from, to, next);
  } else {
    next();
  }
});

export default router;
