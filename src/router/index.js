import {createRouter, createWebHistory} from "vue-router";
import Home from "@/pages/Home.vue";
import purchase from "@/pages/purchase.vue";
import Marketing from "@/pages/Marketing.vue";
import History from "@/pages/History.vue";
import ContentGenerator from "@/pages/ContentGenerator.vue";
import CommunityTools from "@/pages/CommunityTools.vue";
import PricingPlans from "@/pages/PricingPlans.vue";
import AccountSettings from "@/pages/AccountSettings.vue";
import Progress from "@/pages/Progress.vue";
import Competition from "@/pages/Competition.vue";
import KeywordResearch from "@/pages/KeywordResearch.vue";
import Optimzation from "@/pages/Optimization.vue";
import Landing from "@/pages/landingPage.vue";
import AdminDashboard from "@/pages/AdminPanel/AdminDashboard.vue";
import AdminSettings from "@/pages/AdminPanel/AdminSettings.vue";
import AdminTransaction from "@/pages/AdminPanel/AdminTransaction.vue";
import AdminUsers from "@/pages/AdminPanel/AdminUsers.vue";
import AdminMail from "@/pages/AdminPanel/AdminMail.vue";
import {getUserDetail} from "../helper/api";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "landing",
            component: Landing,
        },
        {
            path: "/plan/:slug",
            name: "purchase",
            props: true,
            component: purchase,
        },
        {
            path: "/dashboard",
            name: "home",
            component: Home,
            meta: {requiresAuth: true, isAdmin: false}
        },
        {
            path: "/Competitors",
            name: "Competitors",
            component: Marketing,
            meta: {requiresAuth: true, isAdmin: false}

        },
        {
            path: "/content-generator",
            name: "contentgenerator",
            component: ContentGenerator,
            meta: {requiresAuth: true, isAdmin: false}

        },
        {
            path: "/community-tools",
            name: "communitytools",
            component: CommunityTools,
            meta: {requiresAuth: true, isAdmin: false}

        },
        {
            path: "/competition",
            name: "competition",
            component: Competition,
            meta: {requiresAuth: true, isAdmin: false}

        },
        {
            path: "/pricing-plans",
            name: "pricingplans",
            component: PricingPlans,
            meta: {requiresAuth: true, isAdmin: false}

        },
        {
            path: "/keyword-research",
            name: "keywordresearch",
            component: KeywordResearch,
            meta: {requiresAuth: true, isAdmin: false}

        },
        {
            path: "/optimization",
            name: "optimization",
            component: Optimzation,
            meta: {requiresAuth: true, isAdmin: false}

        },
        {
            path: "/history",
            name: "history",
            component: History,
            meta: {requiresAuth: true, isAdmin: false}

        },
        {
            path: "/account-Settings",
            name: "accountsettings",
            component: AccountSettings,
            meta: {requiresAuth: true, isAdmin: false}

        },
        {
            path: "/Progress",
            name: "pro",
            component: Progress,
            meta: {requiresAuth: true, isAdmin: true}

        },
        {
            path: "/Admindashboard",
            name: "AdminDashboard",
            component: AdminDashboard,
            meta: {requiresAuth: true, isAdmin: true}
        },
        {
            path: "/Adminsettings",
            name: "AdminSettings",
            component: AdminSettings,
            meta: {requiresAuth: true, isAdmin: true}
        },
        {
            path: "/Admintransaction",
            name: "AdminTransaction",
            component: AdminTransaction,
            meta: {requiresAuth: true, isAdmin: true}
        },
        {
            path: "/Adminusers",
            name: "AdminUsers",
            component: AdminUsers,
            meta: {requiresAuth: true, isAdmin: true}
        },
        {
            path: "/Adminmail",
            name: "AdminMail",
            component: AdminMail,
            meta: {requiresAuth: true, isAdmin: true}
        },
    ],
});
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/');
    } else {
      getUserDetail().then(data => {
        console.log(data.is_admin)
        if (to.meta.isAdmin && data.is_admin == 0 ) {
          next('/');
        } else {
          next();
        }
      })
    }
});
export default router;
