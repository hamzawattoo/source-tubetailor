<template>
  <MainLayout></MainLayout>
</template>
<script>
import MainLayout from "@/layouts/MainLayout.vue";
import axios from "axios";

export default {
  onMounted() {},

  setup() {
    const api_baseURL = "https://backend.tubetailor.ai/api/";
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = api_baseURL;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    // You will need to make sure from frontend that already subscribed user could not see or submit this stripe checkout form
    // You can find user is subscribed or not: from hitting '/plan' API.

    // Conflicting Scenario (Described):
    // Currently if already subscribed user is fulfilling stripe checkout form, and after successfully submit payment when sending user's payment token through '/plan/{plan_slug}' API,
    // our internal API is responding that user are already subscribed rather than creating new subscription on our project. So in this case user's submitted amount on Stripe will be lost, (or additionally need to refund).
    // So that's why you need to check subscription status before submitting Stripe checkout form.

    async function fetchPlans() {
      try {
        const response = await axios.get("plans");
        console.log("response >> ", response);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    }
    fetchPlans();
  },
};
</script>
