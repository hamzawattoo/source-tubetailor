<template>
    <MainLayout>
      <table-layout class="!px-4 md:!px-8">
        <div class="flex items-center justify-between py-6">
          <div class="max-w-[100%] lg:max-w-[50%] w-full">
            <h1 class="text-xl font-semibold">My Account</h1>
          </div>
          <div class="hidden lg:flex justify-between text-left max-w-[100%] lg:max-w-[50%] w-full lg:pl-4 xl:pl-12">
            <h1 class="text-xl font-semibold">Manage Plan</h1>
            <button class="text-sm font-medium text-gray-500 px-6 py-2 rounded-full bg-[#EFF4FD] hover:bg-white">
              View your receipts
            </button>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-start w-full justify-between">
          <div class="lg:border-r-2 border-gray-300 lg:pr-4 xl:pr-12 max-w-full lg:max-w-[50%] w-full py-5">
            <form class="space-y-5" @submit.prevent="updateProfile">
              <div class="flex flex-col items-start justify-between gap-4">
                <label class="text-lg font-semibold" for="email">Email:</label>
                <input
                  id="email"
                  class="text-opacity-50 filter drop-shadow-sm rounded-xl border border-gray-300 w-full lg:max-w-lg py-4 px-4 text-sm font-medium"
                  v-model="user.email"
                  type="email"
                  disabled
                />
              </div>
              <div class="flex flex-col items-start justify-between gap-4">
                <label class="text-lg font-semibold" for="firstname">First name:</label>
                <input
                  id="firstname"
                  class="text-opacity-50 filter drop-shadow-sm rounded-xl border border-gray-300 w-full lg:max-w-lg py-4 px-4 text-sm font-medium"
                  v-model="user.firstname"
                  type="text"
                />
              </div>
              <div class="flex flex-col items-start justify-between gap-4">
                <label class="text-lg font-semibold" for="lastname">Last name:</label>
                <input
                  id="lastname"
                  class="text-opacity-50 filter drop-shadow-sm rounded-xl border border-gray-300 w-full lg:max-w-lg py-4 px-4 text-sm font-medium"
                  v-model="user.lastname"
                  type="text"
                />
              </div>
              <div class="text-end">
                <button class="bg-youtube hover:bg-opacity-75 px-12 text-white font-bold py-3 rounded-full" type="submit">
                  <span v-if="!loading">Save</span>
                  <span v-if="loading" class="flex items-center gap-2">Saving <div class="w-4 h-4 border-2 border-white border-t-gray-300 border-r-gray-300 rounded-full animate-spin"></div></span>
                </button>
              </div>
            </form>
          </div>
          <div class="max-w-full lg:max-w-[50%] w-full lg:pl-4 xl:pl-12 space-y-4 py-5">
            <div class="flex lg:hidden justify-between text-left max-w-[100%] lg:max-w-[50%] w-full lg:pl-12">
              <h1 class="text-xl font-semibold">Manage Plan</h1>
              <button class="text-sm font-medium text-gray-500 px-6 py-2 rounded-full bg-[#EFF4FD] hover:bg-white">
                View your receipts
              </button>
            </div>
            <div class="flex h-6 items-center">
              <input
                id="person-2"
                name="person-2"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label class="font-medium text-lg ml-3 text-gray-900 tracking-wide" for="person-2">
                Active Plan
              </label>
            </div>
            <div class="space-y-4">
              <label class="relative block cursor-pointer rounded-lg border border-[#FE4442] bg-white px-6 py-5 shadow-sm focus:outline-none sm:flex sm:justify-between" v-if="purchasePlan?.name">
                <input
                  type="radio"
                  name="server-size"
                  value="Hobby"
                  class="sr-only"
                  aria-labelledby="server-size-0-label"
                  aria-describedby="server-size-0-description-0 server-size-0-description-1"
                />
                <span class="flex flex-row justify-between w-full text-sm">
                  <span id="server-size-0-label" class="font-bold text-lg text-black">
                    {{ purchasePlan?.name }}
                    <router-link to="/pricing-plans">
                      <span class="bg-[#EFF4FD] hover:bg-white text-[#004EB9] font-semibold text-sm px-5 py-1 rounded-full">
                        View Plan
                      </span>
                    </router-link>
                    <span @click="cancelPlan()" v-if="!user.on_grace_period">
                      <span class="bg-youtube hover:bg-opacity-75 px-5 py-1 text-white text-sm font-semibold rounded-full">
                        Unsubscribe
                      </span>
                    </span>
                    <span v-if="user.on_grace_period" @click="resumePlan()">
                      <span class="bg-youtube hover:bg-opacity-75 px-5 py-1 text-white text-sm font-semibold rounded-full">
                        Resume
                      </span>
                    </span>
                  </span>
                  <span class="font-bold text-lg text-black">${{ parseFloat(purchasePlan?.price).toFixed(2) }}</span>
                </span>
              </label>
              <label class="relative block cursor-pointer rounded-lg border border-[#FE4442] bg-white px-6 py-5 shadow-sm focus:outline-none sm:flex sm:justify-between" v-else>
                <input
                  type="radio"
                  name="server-size"
                  value="Hobby"
                  class="sr-only"
                  aria-labelledby="server-size-0-label"
                  aria-describedby="server-size-0-description-0 server-size-0-description-1"
                />
                <span class="flex flex-row justify-between w-full text-sm">
                  <span id="server-size-0-label" class="font-bold text-lg text-black">
                    Basic
                  </span>
                  <span class="font-bold text-lg text-black">FREE</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </table-layout>
    </MainLayout>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import MainLayout from "@/layouts/MainLayout.vue";
  import TableLayout from "@/layouts/TableLayout.vue";
  import useToastHook from "../hooks/ToastMessage";
  import { getRequestApi, putRequest } from "../helper/api";
  import { getUserDetail } from "../helper/api.js";
  import { eventBus } from '../store/eventBus.js';
  const { showSuccessToast, showErrorToast } = useToastHook();
  const loading = ref(false);
  const planData = ref(null);
  const user = ref({});
  const purchasePlan = ref(null);
  function triggerReRender() {
  eventBus.$emit('reRenderComponentB');
}
  const profile = async () => {
    try {
      const userData = await getRequestApi('profile');
      user.value = userData;
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  
  const fetchPlan = async () => {
    if (user.value?.subscribed) {
      try {
        const response = await getRequestApi('plan');
        planData.value = response;
        if (planData.value?.current_plan) {
          const planResponse = await getRequestApi(`/plan/${planData.value?.current_plan}`);
          purchasePlan.value = planResponse.plan;
        }
      } catch (error) {
        showErrorToast('Error fetching plan:', error);
      }
    }
  };
  
  const cancelPlan = async () => {
    if (confirm("Are you sure?")) {
      try {
        const response = await putRequest('/plan/cancel');
        planData.value = response;
        user.value.on_grace_period = true; // Update user state
        showSuccessToast(planData.value.message);
        await profile();
      } catch (error) {
        showErrorToast('Error cancelling plan:', error);
      }
    }
  };
  
  const resumePlan = async () => {
    if (confirm("Are you sure?")) {
      try {
        const response = await putRequest('/plan/resume');
        planData.value = response;
        user.value.on_grace_period = false; // Update user state
        showSuccessToast(planData.value.message);
        await fetchPlan();
        await profile();
      } catch (error) {
        showErrorToast('Error resuming plan:', error);
      }
    }
  };
  
  const updateProfile = async () => {
    try {
      loading.value = true;
      const payload = {};
      if (user.value.firstname) {
        payload.firstname = user.value.firstname;
      }
      if (user.value.lastname) {
        payload.lastname = user.value.lastname;
      }
      if (Object.keys(payload).length === 0) {
        showSuccessToast("Please Fill all fields.");
        return;
      }
      await putRequest('/profile', payload);  
        try {
          const userDetail = await getUserDetail();
          localStorage.setItem('user', JSON.stringify(userDetail));
          triggerReRender();
        } catch (error) {
          console.error('Error fetching user:', error);
        }
        // window.location.reload();
        loading.value = false;
      showSuccessToast("Profile Updated Successfully");
    } catch (error) {
      loading.value = false;
      console.error('Error updating profile:', error);
    }
  };
  
  onMounted(async () => {
    await profile();
    fetchPlan();
  });
  </script>
  
  <style scoped>
    .font {
        color: black;
        opacity: 0.5;
    }
  </style>
  