import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";

import Constatnt from "../components/Constatnt";
import Dept from "../components/Dept";
import Scheduling from "../components/Scheduling";
import Register from "../components/Register";
import DiseCategory from "../components/DiseCategory";
import Fmeditem from "../components/Fmeditem";
import Registlevel from "../components/Registlevel";
import User from "../components/User";



Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
      hidden:true,
  },
  {
    path: '/',
    name: 'login',
    component: Login,
      hidden:true,
  },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta:{
            title:'挂号收费'
        },
        children:[
            {
                path: '/Register',
                name: 'Register',
                component: Register,
                meta:{
                    title:'现场挂号'
                },
            },
        ]
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta:{
            title:'系统信息'
        },
        children:[
            {
                path: '/Constatnt',
                name: 'Constatnt',
                component: Constatnt,
                meta:{
                    title:'常数类别管理'
                },
            },
            {
                path: '/Dept',
                name: 'Dept',
                component: Dept,
                meta:{
                    title:'科室管理'
                },
            },
            {
                path: '/User',
                name: 'User',
                component: User,
                meta:{
                    title:'用户管理'
                },
            },
            {
                path: '/Registlevel',
                name: 'Registlevel',
                component: Registlevel,
                meta:{
                    title:'挂号级别管理'
                },
            },
            {
                path: '/DiseCategory',
                name: 'DiseCategory',
                component: DiseCategory,
                meta:{
                    title:'诊断目录管理'
                },
            },
            {
                path: '/Fmeditem',
                name: 'Fmeditem',
                component: Fmeditem,
                meta:{
                    title:'非药品收费项目表'
                },
            },
            {
                path: '/Scheduling',
                name: 'Scheduling',
                component: Scheduling,
                meta:{
                    title:'医生排班管理'
                },
            },
        ]
    },
]

const router = new VueRouter({
  routes
})

export default router
