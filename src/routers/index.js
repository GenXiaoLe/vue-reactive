import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import example from './model/example';

const layout = () => import(/* webpackChunkName: "about" */ '../example/index');

export const routerMap = [
    {
        path: '/index',
        component: layout,
    },
    {
        path: '/layout',
        component: layout,
        redirect: 'index',
        children: [
            ...example
        ]
    }
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: routerMap
})