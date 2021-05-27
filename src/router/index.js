import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '@/views/Login')
    },
    {
        path: '',
        name: 'Layout',
        component: () => import(/* webpackChunkName: "Layout" */ '@/components/structure/Layout'),
        meta: {
            requiresAuth: true
        },

        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard'),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/hacktivity',
                name: 'Hacktivity',
                component: () => import(/* webpackChunkName: "Hacktivity" */ '@/views/Hacktivity'),
                meta: {
                    requiresAuth: true
                },
            },

            {
                path: '/programs',
                name: 'Programs',
                component: () => import(/* webpackChunkName: "Programs" */ '@/views/Programs'),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/programs/add',
                name: 'NewProgram',
                component: () => import(/* webpackChunkName: "NewProgram" */ '@/components/NewProgram'),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/programs/:id/edit',
                name: 'EditProgram',
                component: () => import(/* webpackChunkName: "EditProgram" */ '@/components/EditProgram'),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/programs/:id',
                name: 'ProfilProgram',
                component: () => import(/* webpackChunkName: "Programs" */ '@/views/ProfilProgram'),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/programs/:id/reports',
                name: 'ProgramReports',
                component: () => import(/* webpackChunkName: "Programs" */ '@/views/ProgramReports'),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/company',
                name: 'ProfilCompany',
                component: () => import(/* webpackChunkName: "ProfilCompany" */ '@/views/ProfilCompany'),
                meta: {
                    requiresAuth: true
                },
            },

            {
                path: '/reports',
                name: 'Reports',
                component: () => import(/* webpackChunkName: "Users" */ '@/views/Reports'),
                meta: {
                    requiresAuth: true
                },
            },
        ]
    }


]

const router = new VueRouter({
    routes,
    mode:'history'
})

const DEFAULT_TITLE = 'DBounty';
router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = DEFAULT_TITLE +' - '+to.name ;
    });
});
export default router