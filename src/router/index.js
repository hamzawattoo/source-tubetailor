import { createRouter, createWebHistory } from "vue-router";
import { ref } from "vue"; // Import ref from Vue
import Home from "@/pages/Home.vue";
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
import { getUserDetail, getRequestApi } from "../helper/api";

const user = ref(null); // Define user as a reactive variable

const profile = async () => {
  try {
    const userData = await getRequestApi('profile');
    user.value = userData;
    if (user.value?.subscribed) {
      localStorage.setItem('isSubscribed', JSON.stringify(user.value.subscribed));
    }
    return user.value; // Return user data
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

// Function to check subscription status and update local storage
const checkSubscriptionStatus = async () => {
  try {
    const userData = await profile();
    if (!userData?.subscribed) {
      localStorage.removeItem('isSubscribed');
    }
  } catch (error) {
    console.error('Error checking subscription status:', error);
  }
};

// Call checkSubscriptionStatus every 24 hours
setInterval(checkSubscriptionStatus, 24 * 60 * 60 * 1000);

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
  ],
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else if (to.meta.requiresAuth) {
    try {
      const userData = await profile();
      if (!userData) {
        next('/');
      } else if (to.meta.isAdmin && userData.is_admin === 0) {
        next('/');
      } else {
        next();
      }
    } catch (error) {
      console.error('Error during route guard:', error);
      next('/');
    }
  } else {
    next();
  }
});

export default router;
