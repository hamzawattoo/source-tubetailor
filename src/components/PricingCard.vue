<template>
    <div class="grid grid-cols-3 justify-between gap-x-6" v-if="plans?.plans">
        <div class="col-lg-4" v-for="(plan, index) in plans.plans" :key="index">
            <TableLayout class="!p-1">
            <div class="pricing-table style-two price-two wow pixFadeLeft flex flex-col justify-between" data-wow-delay="0.5s">
                <div class="pricing-header pricing-amount">
                    <div class="annual_price">
                        <h2 class="price">$0.00</h2>
                    </div>
                    <div class="monthly_price">
                        <h2 class="price">${{ parseFloat(plan.price).toFixed(2) }}</h2>
                    </div>
                    <h3 class="price-title">{{ plan.name }}</h3>
                </div>
                <!-- /.pricing-header -->
                <ul class="price-feture !list-disc">
                    <li v-for="(basicPlan, index1) in planDescription[index]" :key="index1">
                        <div class="flex items-start">
                            <span class="max-w-[50%] text-sm">{{ basicPlan.title }}
                            </span>
                            <span :class="basicPlan.customClass"
                                class="max-w-[50%] ml-auto whitespace-wrap text-right text-xs">{{ basicPlan.description }}</span>
                        </div>
                    </li>
                </ul>
                <div class="action text-left">
                    <router-link  :to="'/Upgradeplan/' + plan.slug" v-if="isAuthenticated && isSubscribed.subscribed">
                        <span class="pix-btn btn-outline-two">Get Started</span>
                    </router-link>
                    <router-link  :to="'/plan/' + plan.slug" v-else-if="isAuthenticated && !isSubscribed.subscribed">
                        <span class="pix-btn btn-outline-two">Get Started</span>
                    </router-link>
                    <button @click="login" v-else><span class="pix-btn btn-outline-two">Get Started</span></button>
                                    </div>
            </div>
            </TableLayout>
            <!-- /.pricing-table -->
        </div>
        <!-- /.col-lg-4 -->
    </div>
</template>
<script setup>
import Logo from "@/assets/Logo.png";
import TopShape from "@/assets/top-shape.png";
import Tweet from "@/assets/tweet.png";
import Icon1 from "@/assets/icon1.png";
import Icon2 from "@/assets/icon2.png";
import Icon3 from "@/assets/icon3.png";
import Icon4 from "@/assets/icon4.png";
import Icon5 from "@/assets/icon5.png";
import Icon6 from "@/assets/icon6.png";
import Dashboard from "@/assets/Dashboard.png";
import Optimization from "@/assets/Optimization.png";
import videoSource from "@/assets/hosting.mp4";
import bottom from "@/assets/bottom.png";
import readyLeft from "@/assets/ready-left.png";
import readyRight from "@/assets/ready-right.png";
import top from "@/assets/top.png";
import { postRequest } from "../helper/api.js";
import basicPlans from "../helper/basic.json";
import proPlans from "../helper/pro.json";
import useToastHook from "../hooks/ToastMessage";
import TableLayout from "@/layouts/TableLayout.vue";
const { showSuccessToast, showErrorToast } = useToastHook();
import { ref } from "vue";
import axios from 'axios';
import { getRequestApi, getRequestApiWithoutAuth, logout } from "../helper/api";

const isSubscribed  = JSON.parse(localStorage.getItem('user'));

const isPlaying = ref(false);
const isAuthenticated = ref(false);
const togglePlay = () => {
    const video = this.$ref.videoPlayer;
    const videoEl = document.getElementById("videoEl");
    if (isPlaying.value) {
        videoEl.pause();
    } else {
        videoEl.play();
    }
    isPlaying.value = !isPlaying.value;
};
isAuthenticated.value = localStorage.getItem('token');
const api_baseURL = 'https://backend.tubetailor.ai/api/';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = api_baseURL;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('token')) {
    localStorage.setItem('token', urlParams.get('token'));
    urlParams.delete('token'); // Remove token from URL
    const newUrl = `${window.location.pathname}?${urlParams.toString()}${window.location.hash}`;
    history.replaceState(null, '', newUrl); // Update URL without reloading
    isAuthenticated.value = localStorage.getItem('token');
}
function login() {
    window.location.href = `${api_baseURL}login`;
}
const user = ref();
async function profile() {
    let { data } = await axios.get('profile');
    user.value = data;
}
async function signout() {
    await logout()
    isAuthenticated.value = false
    localStorage.removeItem('isSubscribed');
    window.location.href = "/";
}
const plans = ref();
const planDescription = [
    basicPlans,
    proPlans,
    proPlans
];
getPlans()
async function getPlans() {
    try {
        plans.value = await getRequestApiWithoutAuth("plans");
    } catch (error) {
    }
}

const tabs = ref([
    { name: 'DashBoard', image: Dashboard, isActive: true },
    { name: 'Optimization', image: Optimization, isActive: false },
    { name: 'Keyword Research', image: Dashboard, isActive: false },
    { name: 'Marketing', image: Dashboard, isActive: false },
    { name: 'Competition', image: Dashboard, isActive: false },
    { name: 'Content Generator', image: Dashboard, isActive: false },
    { name: 'Community tools', image: Dashboard, isActive: false }
])

function selectTab(selectedTab) {
    tabs.value.forEach(tab => (tab.isActive = tab === selectedTab))
}

</script>