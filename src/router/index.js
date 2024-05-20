import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
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
import Billing from "@/pages/Billing.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing,
    },
    {
      path: "/dashboard",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/Competitors",
      name: "Competitors",
      component: Marketing,
      meta: { requiresAuth: true },
    },
    {
      path: "/content-generator",
      name: "contentgenerator",
      component: ContentGenerator,
      meta: { requiresAuth: true },
    },
    {
      path: "/community-tools",
      name: "communitytools",
      component: CommunityTools,
      meta: { requiresAuth: true },
    },
    {
      path: "/competition",
      name: "competition",
      component: Competition,
      meta: { requiresAuth: true },
    },
    {
      path: "/pricing-plans",
      name: "pricingplans",
      component: PricingPlans,
      meta: { requiresAuth: true },
    },
    {
      path: "/keyword-research",
      name: "keywordresearch",
      component: KeywordResearch,
      meta: { requiresAuth: true },
    },
    {
      path: "/optimization",
      name: "optimization",
      component: Optimzation,
      meta: { requiresAuth: true },
    },
    {
      path: "/history",
      name: "history",
      component: History,
      meta: { requiresAuth: true },
    },
    {
      path: "/account-Settings",
      name: "accountsettings",
      component: AccountSettings,
      meta: { requiresAuth: true },
    },
    {
      path: "/Progress",
      name: "pro",
      component: Progress,
      meta: { requiresAuth: true },
    },
    {
      path: "/Admindashboard",
      name: "AdminDashboard",
      component: AdminDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/Adminsettings",
      name: "AdminSettings",
      component: AdminSettings,
      meta: { requiresAuth: true },
    },
    {
      path: "/Admintransaction",
      name: "AdminTransaction",
      component: AdminTransaction,
      meta: { requiresAuth: true },
    },
    {
      path: "/Adminusers",
      name: "AdminUsers",
      component: AdminUsers,
      meta: { requiresAuth: true },
    },
    {
      path: "/Adminmail",
      name: "AdminMail",
      component: AdminMail,
      meta: { requiresAuth: true },
    },
    {
      path: "/billing",
      name: "billing",
      component: Billing,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
export default router;
