<template>
    <MainLayout>
        <table-layout class="!px-4 md:!px-8">
            <div class="flex items-center justify-between py-6">
                <div class="max-w-[100%] lg:max-w-[50%] w-full">
                    <h1 class="text-xl font-semibold">My Account</h1>
                </div>
                <div
                        class="hidden lg:flex justify-between text-left max-w-[100%] lg:max-w-[50%] w-full lg:pl-4 xl:pl-12"
                >
                    <h1 class="text-xl font-semibold">Manage Plan</h1>
                    <button
                            class="text-sm font-medium text-gray-500 px-6 py-2 rounded-full bg-[#EFF4FD] hover:bg-white"
                    >
                        View your receipts
                    </button>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row items-start w-full justify-between">
                <div
                        class="lg:border-r-2 border-gray-300 lg:pr-4 xl:pr-12 max-w-full lg:max-w-[50%] w-full py-5"
                >
                    <form class="space-y-5" action="">
                        <div
                                class="flex flex-col xl:flex-row xl:items-center justify-between gap-4"
                        >
                            <label class="text-lg font-semibold" for="">Email:</label>
                            <input
                                    class="text-opacity-50 filter drop-shadow-sm rounded-xl border border-gray-300 w-full lg:max-w-lg py-4 px-4 text-sm font-medium"
                                    placeholder="johnsmith@gmail.com"
                                    type="email"
                            />
                        </div>
                        <div
                                class="flex flex-col xl:flex-row xl:items-center justify-between gap-4"
                        >
                            <label class="text-lg font-semibold" for="">First name:</label>
                            <input
                                    class="text-opacity-50 filter drop-shadow-sm rounded-xl border border-gray-300 w-full lg:max-w-lg py-4 px-4 text-sm font-medium"
                                    placeholder="john"
                                    type="email"
                            />
                        </div>
                        <div
                                class="flex flex-col xl:flex-row xl:items-center justify-between gap-4"
                        >
                            <label class="text-lg font-semibold" for="">Last name:</label>
                            <input
                                    class="text-opacity-50 filter drop-shadow-sm rounded-xl border border-gray-300 w-full lg:max-w-lg py-4 px-4 text-sm font-medium"
                                    placeholder="john"
                                    type="email"
                            />
                        </div>
                        <div class="text-end">
                            <button
                                    class="bg-youtube hover:bg-opacity-75 px-12 text-white font-bold py-3 rounded-full"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div
                        class="max-w-full lg:max-w-[50%] w-full lg:pl-4 xl:pl-12 space-y-4 py-5"
                >
                    <div
                            class="flex lg:hidden justify-between text-left max-w-[100%] lg:max-w-[50%] w-full lg:pl-12"
                    >
                        <h1 class="text-xl font-semibold">Manage Plan</h1>
                        <button
                                class="text-sm font-medium text-gray-500 px-6 py-2 rounded-full bg-[#EFF4FD] hover:bg-white"
                        >
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
                        <label
                                class="font-medium text-lg ml-3 text-gray-900 tracking-wide"
                                for=""
                        >Active Plan</label
                        >
                    </div>
                    <div class="space-y-4">

                        <label
                                class="relative block cursor-pointer rounded-lg border border-[#FE4442] bg-white px-6 py-5 shadow-sm focus:outline-none sm:flex sm:justify-between"
                                v-if="this.purchasePlan?.name"
                        >
                            <input
                                    type="radio"
                                    name="server-size"
                                    value="Hobby"
                                    class="sr-only"
                                    aria-labelledby="server-size-0-label"
                                    aria-describedby="server-size-0-description-0 server-size-0-description-1"
                            />
                            <span class="flex flex-row justify-between w-full text-sm">
                <span
                        id="server-size-0-label"
                        class="font-bold text-lg text-black"
                >Basic
                <router-link to="/pricing-plans"
                ><span
                        class="bg-[#EFF4FD] hover:bg-white text-[#004EB9] font-semibold text-sm px-5 py-1 rounded-full"
                >View Plan</span
                ></router-link
                >
                  <span  @click="cancelPlan()" v-if="!this.user.on_grace_period"
                  ><span class="bg-youtube hover:bg-opacity-75 px-5 py-1 text-white text-sm font-semibold rounded-full"
                  >Unsubscribe</span
                  ></span
                  >
                  <span v-if="this.user.on_grace_period" @click="resumePlan()"
                  ><span class="bg-youtube hover:bg-opacity-75 px-5 py-1 text-white text-sm font-semibold rounded-full"
                  >Resume</span
                  ></span
                  >
                </span
                >
                <span class="font-bold text-lg text-black">${{parseFloat(this.purchasePlan?.price).toFixed(2)}}</span>
              </span>
                        </label>
                        <label
                                class="relative block cursor-pointer rounded-lg border border-[#FE4442] bg-white px-6 py-5 shadow-sm focus:outline-none sm:flex sm:justify-between"
                                v-else
                        >
                            <input
                                    type="radio"
                                    name="server-size"
                                    value="Hobby"
                                    class="sr-only"
                                    aria-labelledby="server-size-0-label"
                                    aria-describedby="server-size-0-description-0 server-size-0-description-1"
                            />
                            <span class="flex flex-row justify-between w-full text-sm">
                <span
                        id="server-size-0-label"
                        class="font-bold text-lg text-black"
                >Basic</span
                >
                <span class="font-bold text-lg text-black">FREE</span>
              </span>
                        </label>
                    </div>
                </div>
            </div>
        </table-layout>
    </MainLayout>
</template>

<script>
  import MainLayout from "@/layouts/MainLayout.vue";
  import TableLayout from "@/layouts/TableLayout.vue";

  import {ref, computed} from "vue";
  import {getRequestApi, putRequest} from "../helper/api";

  export default {
    components:{
      MainLayout,
      TableLayout
    },
    onMounted() {
    },
    data() {
      return {
        planData: ref(null),
        user: ref(null),
        purchasePlan: ref(null)
      }
    },
    async mounted() {
      await this.profile()
      this.fetchPlan();


    },
    methods: {
      async profile() {
        let user = await getRequestApi('profile');
        this.user = user;
      },
      async fetchPlan() {
        try {
          const response = await getRequestApi('plan');
          this.planData = response;
          console.log(response.current_plan)
          if (this.planData?.current_plan) {
            const response = await getRequestApi(`/plan/${this.planData?.current_plan}`);
            this.purchasePlan = response.plan
          }

        } catch (error) {
          console.error('Error fetching plan:', error);
        }
      },
      async cancelPlan() {
        if (confirm("Are you sure?")) {
          try {
            const response = await putRequest('/plan/cancel');
            this.planData = response;
            alert(this.planData.message)
            await this.profile()
          } catch (error) {
            console.error('Error fetching plan:', error);
          }
        }
      },
      async resumePlan() {
        if (confirm("Are you sure?")) {
          try {
            const response = await putRequest('/plan/resume');
            this.planData = response;
            alert(this.planData.message)
            this.fetchPlan()
          } catch (error) {
            console.error('Error fetching plan:', error);
          }
        }
      }
    },
  };
</script>

<style scoped>
    .font {
        color: black;
        opacity: 0.5;
    }
</style>
