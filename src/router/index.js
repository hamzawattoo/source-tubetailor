import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Mainlayout from "@/layouts/Mainlayout.vue";
import Purchase from "@/pages/purchase.vue";
import Marketing from "@/pages/Marketing.vue";
import History from "@/pages/History.vue";
import ContentGenerator from "@/pages/ContentGenerator.vue";
import CommunityTools from "@/pages/CommunityTools.vue";
import PricingPlans from "@/pages/PricingPlans.vue";
import AccountSettings from "@/pages/AccountSettings.vue";
import Progress from "@/pages/Progress.vue";
import Competition from "@/pages/Competition.vue";
import KeywordResearch from "@/pages/KeywordResearch.vue";
import Optimization from "@/pages/Optimization.vue";
import Landing from "@/pages/landingPage.vue";
import AdminDashboard from "@/pages/AdminPanel/AdminDashboard.vue";
import AdminSettings from "@/pages/AdminPanel/AdminSettings.vue";
import AdminTransaction from "@/pages/AdminPanel/AdminTransaction.vue";
import AdminUsers from "@/pages/AdminPanel/AdminUsers.vue";
import AdminMail from "@/pages/AdminPanel/AdminMail.vue";
import { getUserDetail } from "../helper/api";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "landing", component: Landing },
    { path: "/plan/:slug", name: "purchase", props: true, component: Purchase },
    { path: "/dashboard", name: "home", component: Home, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/Competitors", name: "Competitors", component: Marketing, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/content-generator", name: "contentgenerator", component: ContentGenerator, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/community-tools", name: "communitytools", component: CommunityTools, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/competition", name: "competition", component: Competition, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/pricing-plans", name: "pricingplans", component: PricingPlans, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/keyword-research", name: "keywordresearch", component: KeywordResearch, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/optimization", name: "optimization", component: Optimization, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/history", name: "history", component: History, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/account-settings", name: "accountsettings", component: AccountSettings, meta: { requiresAuth: true, isAdmin: false } },
    { path: "/progress", name: "progress", component: Progress, meta: { requiresAuth: true, isAdmin: true } },
    { path: "/admindashboard", name: "admindashboard", component: AdminDashboard, meta: { requiresAuth: true, isAdmin: true } },
    { path: "/adminsettings", name: "adminsettings", component: AdminSettings, meta: { requiresAuth: true, isAdmin: true } },
    { path: "/admintransaction", name: "admintransaction", component: AdminTransaction, meta: { requiresAuth: true, isAdmin: true } },
    { path: "/adminusers", name: "adminusers", component: AdminUsers, meta: { requiresAuth: true, isAdmin: true } },
    { path: "/adminmail", name: "adminmail", component: AdminMail, meta: { requiresAuth: true, isAdmin: true } },
    { path: "/Mainlayout", name: "Mainlayout", component: Mainlayout },
  ],

});


router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  const userFromStorage = JSON.parse(localStorage.getItem('user'));

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/');
      return;
    }

    // Fetch user details if not present or expired
    if (!userFromStorage) {
      try {
        const userDetail = await getUserDetail();
        localStorage.setItem('user', JSON.stringify(userDetail));
      } catch (error) {
        console.error('Error fetching user detail:', error);
        next('/');
        return;
      }
    }

    const updatedUserFromStorage = JSON.parse(localStorage.getItem('user'));

    if (to.meta.isAdmin && (!updatedUserFromStorage || updatedUserFromStorage.is_admin == 0)) {
      next('/');
      return;
    }
  }

  next();
});

export default router;
