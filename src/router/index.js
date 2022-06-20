import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// import { mapActions   } from 'vuex'
import store from '../store'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    beforeEnter: islogged,
    component: () => import('@/layouts/login/Index.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import( /* webpackChunkName: "login" */ '@/views/login/Login.vue'),
      },
    ]
  },
  {
    path: '/admin',
    beforeEnter: auth,
    component: () => import('@/layouts/admin/Index.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import( /* webpackChunkName: "admin" */ '@/views/admin/Index.vue'),
      },
      {
        path: '/persons',
        component: () => import( /* webpackChunkName: "Person" */ '@/views/admin/persons/Index.vue'),
        children: [
          {
            path: '',
            name: 'Person',
            component: () => import( /* webpackChunkName: "Person" */ '@/views/admin/persons/Person.vue'),
          },
          {
            path: '/persons/new',
            name: 'NewPerson',
            component: () => import( /* webpackChunkName: "Person" */ '@/views/admin/persons/New.vue'),
          },
          {
            path: ':idPerson',
            name: 'PersonUpdate',
            component: () => import( /* webpackChunkName: "Person" */ '@/views/admin/persons/Edit.vue'),
          }
        ]
      },
      {
        path: '/cars',
        component: () => import( /* webpackChunkName: "Car" */ '@/views/admin/cars/Index.vue'),
        children: [
          {
            path: '',
            name: 'Car',
            component: () => import( /* webpackChunkName: "Car" */ '@/views/admin/cars/Car.vue'),
          },
          {
            path: '/cars/new',
            name: 'NewCar',
            component: () => import( /* webpackChunkName: "Car" */ '@/views/admin/cars/New.vue'),
          },
          {
            path: ':idCar',
            name: 'CarUpdate',
            component: () => import( /* webpackChunkName: "Car" */ '@/views/admin/cars/Edit.vue'),
          }
        ]
      },
      {
        path: '/rents',
        component: () => import( /* webpackChunkName: "Rent" */ '@/views/admin/rents/Index.vue'),
        children: [
          {
            path: '',
            name: 'Rent',
            component: () => import( /* webpackChunkName: "Rent" */ '@/views/admin/rents/Rents.vue'),
          },
        ]
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import( /* webpackChunkName: "admin" */ '@/views/admin/Users.vue'),
      },
    ]
  },
  {
    path: '*',
    beforeEnter: auth,
    redirect: '/'
  },

]


function auth(to, from, next){
  if(localStorage.getItem('token') != undefined){
    validate(next, 'auth');
  } else{
    next("/");
  }
}
function islogged(to, from, next){
  if(localStorage.getItem('token') != undefined){
    validate(next, 'islogged');
  } else{
    next();
  }
}

async function validate(next, operation){
  await axios.post('/validate',{},{
    headers:{
      'x-access-token': localStorage.getItem('token')
    }
  }).then(res => {
      // console.log(res);
      if(res.data.permission){
        store.dispatch('addUser', res.data);
        if(operation === "islogged"){
          next('/admin');
        } else{
          next();
        }
      } 
  }).catch((err) => {
      if(operation === "auth"){
        next("/");
      }
      if(operation === "islogged"){
        localStorage.removeItem('token');
        next("/");
      }
  });
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
