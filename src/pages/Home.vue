<template>
  <MainLayout>
    <!-- Youtube -->
    <GlobalAlert :messages="message" />
    <div v-if="store.currentTab === 0">
      <table-layout>
        <div class="pb-5 sm:flex sm:items-center sm:justify-between">
          <h3 class="text-[20px] font-[800] leading-6 text-gray-900">
            Total uploads: {{ overview?.total_uploads }} videos
          </h3>
          <div class="mt-3 sm:ml-4 sm:mt-0">
            <button v-if="!overview.channel_title" type="button"
              class="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white rounded-full shadow-sm bg-youtube focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              @click="youtubeConnect">
              <div class="flex items-center justify-center w-4 h-4 bg-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="#FE4442" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </div>
              <span>Add your channel</span>
            </button>
          </div>
        </div>
        <Loader :showLoader="showLoader" />
        <div v-if="!overview.channel_title" class="text-center">Please log in to view this data</div>
        <div class="py-6">
          <div v-if="overview.channel_title">
            <dl
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:flex items-center justify-between 2xl:divide-x gap-6 lg:gap-2 rounded-2xl text-center">
              <div class="flex items-center gap-3 sm:col-span-2 lg:col-span-4 2xl:flex-1">
                <div class="!border-2 !border-youtubes rounded-full">
                  <img :src="overview.thumbnail" class="h-14 w-14 rounded-full" alt="" />
                </div>
                <h1 class="font-semibold underline text-2xl">{{ overview.channel_title }}</h1>
              </div>
              <div class="space-y-2 flex-1 text-center">
                <dt class="flex items-center justify-start sm:justify-center gap-2 text-sm font-medium leading-6 text-black text-left sm:text-center">
                  Channel Worth
                  <button title="the lorem" class="text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z">
                      </path>
                    </svg>
                  </button>
                </dt>
                <dt class="order-first text-2xl font-bold tracking-tight text-[#FE4442] text-left sm:text-center">
                  {{ overview?.channel_worth?.worth }}
                </dt>
              </div>
              <div class="relative space-y-2 flex-1">
                <dt class="text-sm font-medium leading-6 text-black text-left sm:text-center">Views</dt>
                <dt class="order-first text-2xl font-bold tracking-tight text-[#FE4442] text-left sm:text-center">
                  {{ overview?.views }}
                </dt>
              </div>
              <div class="relative space-y-2 flex-1">
                <dt class="text-sm font-medium leading-6 text-black text-left sm:text-center">Subscribers</dt>
                <dt class="order-first text-2xl font-bold tracking-tight text-[#FE4442] text-left sm:text-center">
                  {{ overview?.subscribers }}
                </dt>
              </div>
              <div class="relative space-y-2 flex-1">
                <dt class="flex items-center justify-start sm:justify-center gap-2 text-sm font-medium leading-6 text-black text-left sm:text-center">
                  Niche
                  <button title="the lorem" class="text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z">
                      </path>
                    </svg>
                  </button>
                </dt>
                <dt class="order-first text-2xl font-bold tracking-tight text-[#FE4442] text-left sm:text-center">
                  {{ overview?.niche }}
                </dt>
              </div>
            </dl>
            <dl
              class="grid grid-cols-1 lg:divide-x gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-5">
              <div class="relative space-y-2" v-for="stat in stats" :key="stat?.id">
                <button v-if="stat.infoIcon" class="absolute top-0 right-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </button>
                <dt class="text-sm font-medium leading-6 text-black">{{ stat.title }}</dt>
                <dt class="order-first text-3xl font-semibold tracking-tight text-[#FE4442]">{{ stat.value }}</dt>
                <dt class="text-xs leading-6 text-gray-600">{{ stat.name }}</dt>
              </div>
            </dl>
          </div>
        </div>
      </table-layout>
      <Analytics v-if="overview.channel_title" />
      <TopicIdeas v-if="overview.channel_title" />
    </div>
    <!-- Instagram -->
    <div v-if="store.currentTab === 1">
      <InstaAddAccount />
      <InstaAnalytics />
      <InstaTopicIdeas />
    </div>
    <!-- TikTok -->
    <div v-if="store.currentTab === 2">
      <AddTiktokAccount />
      <TiktokAnalytics />
      <TiktokTopicIdeas />
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import TableLayout from "@/layouts/TableLayout.vue";
import Tabs from "@/components/Tabs.vue";
import { onMounted, ref } from "vue";
import Analytics from "../components/Analytics.vue";
import TopicIdeas from "../components/TopicIdeas.vue";
import { useTab } from "@/store/counter";
import InstaAnalytics from "@/components/Instagram/Home/InstaAnalytics.vue";
import InstaTopicIdeas from "@/components/Instagram/Home/InstaTopicIdeas.vue";
import InstaAddAccount from "@/components/Instagram/Home/InstaAddAccount.vue";
import AddTiktokAccount from "../components/TikTok/Home/TiktokAddAccount.vue";
import TiktokAnalytics from "../components/TikTok/Home/TiktokAnalytics.vue";
import TiktokTopicIdeas from "../components/TikTok/Home/TiktokTopicIdeas.vue";
import Loader from "../components/Loader.vue";
import GlobalAlert from "@/components/Alert.vue";
import axios from "axios";

const apiErrors = ref([]);
const store = useTab();
const user = ref(null);
const overview = ref([]);
const tabKey = "currentTab";
const overviewKeyPrefix = "youtubeOverview_";
const isAccountAdded = ref(false);
const showLoader = ref(false);
const message = ref('');

onMounted(() => {
  localStorage.removeItem('topic');
  youtubeOverview();
  user.value = JSON.parse(localStorage.getItem('user'));
  ifAlreadyConnected();
  removeMessageFromUrl();
});

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://backend.tubetailor.ai/api/";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

const ifAlreadyConnected = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  message.value = params.get('message');
  params.delete('message');
}

const removeMessageFromUrl = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (params.has('message')) {
    params.delete('message');
    window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`);
  }
}

const youtubeConnect = async () => {
  try {
    showLoader.value = true;
    const { data } = await axios.get("youtube/auth", {
      headers: {
        "Returned-To": window.location.href,
      },
    });
    showLoader.value = false;
    window.location.href = data.target_url;
  } catch (error) {
    showLoader.value = false;
  } finally {
    showLoader.value = false;
  }
};

const checkAccountStatus = () => {
  const accountData = localStorage.getItem('youtube');
  isAccountAdded.value = !!accountData;
}

const youtubeOverview = async () => {
  const currentTab = localStorage.getItem(tabKey) || 1;
  localStorage.setItem(tabKey, currentTab);

  const cachedData = localStorage.getItem(`${overviewKeyPrefix}${currentTab}`);
  const cachedTimestamp = localStorage.getItem(`${overviewKeyPrefix}Timestamp_${currentTab}`);

  if (cachedData && cachedTimestamp && isWithin24Hours(cachedTimestamp)) {
    overview.value = JSON.parse(cachedData);
    return;
  }

  showLoader.value = false;
  try {
    const { data } = await axios.get("youtube/overview");
    overview.value = data;
    localStorage.setItem(`${overviewKeyPrefix}${currentTab}`, JSON.stringify(data));
    localStorage.setItem(`${overviewKeyPrefix}Timestamp_${currentTab}`, new Date().toISOString());
    showLoader.value = false;
    localStorage.setItem('yourAccountData', 'someData'); 
    isAccountAdded.value = true;
  } catch (error) {
    console.error('Error in fetching overview data:', error);
    apiErrors.value.push(error.response.data.message);
    showLoader.value = false;
  }

  setTimeout(() => {
    apiErrors.value = [];
  }, 2000);
}

const isWithin24Hours = (timestamp) => {
  const now = new Date();
  const storedTimestamp = new Date(timestamp);
  const differenceInMilliseconds = now - storedTimestamp;
  const hoursDifference = differenceInMilliseconds / (1000 * 60 * 60);
  return hoursDifference <= 24;
}

checkAccountStatus();
</script>

<style lang="scss" scoped></style>
