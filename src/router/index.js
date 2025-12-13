import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import SignUp from "@/views/SignUp.vue";
import LogIn from "@/views/LogIn.vue";
import APost from "@/views/APost.vue";
import auth from "@/auth";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        beforeEnter: async (to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next("/login");
            } else {
                next();
            }
        },
    },
    {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    },
    {
    path: '/login',
    name: 'LoginPage',
    component: LogIn,
    },
    {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
    },
    {
    path: '/apost/:id',
    name: 'APost',
    component: APost,
    beforeEnter: async (to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next("/login");
            } else {
                next();
            }
        },
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
