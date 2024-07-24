<template>
  <MainLayout>
    <div class="flex items-center justify-between pb-2">
      <h1 class="text-gray-500 text-sm">This List is automatically refreshes after every 7 days. Save the competitors that you want to track.</h1>
      <div class="">
        <button v-if="savedTopic" @click="viewSavedTopic" class="text-sm font-medium text-end text-red-500">View Saved Topic Ideas</button>
        <button v-if="!savedTopic" @click="viewSavedTopic" class="text-sm font-medium text-end text-red-500">View Topic Ideas</button>
      </div>
    </div>
    <TableLayout class="!mt-0">
      <div class="py-2 overflow-x-auto scrollbar">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <!-- Table header -->
            <tr class="bg-[#414D61] text-white">
              <th class="rounded-l-lg rounded-tl-lg whitespace-nowrap px-4 py-2 text-left text-[13px] font-medium">
                Channel
              </th>
              <th class="py-2text-left whitespace-nowrap px-4 text-[13px] font-medium text-center">
                Total uploads
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-[13px] font-medium text-center">
                Total views
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-[13px] font-medium text-center">
                Subscribers
              </th>
              <th class="rounded-r-lg px-4 py-2 whitespace-nowrap text-left text-[13px] font-medium"></th>
            </tr>
            <!-- Table body -->
            <tr v-for="(competitor, index) in competitors" :key="index"
              class="py-2 rounded-lg border-b border-gray-400 text-gray-500">
              <td class="px-4 py-2.5 text-[13px] whitespace-nowrap ">
                <div class="flex items-center justify-start gap-4">
                  <img class="w-16 h-16 rounded-full object-cover" :src="competitor.thumbnails.high.url" alt="">
               <span class="text-[13px] whitespace-nowrap text-gray-800 font-medium text-center"> {{ competitor.username }}</span>
                </div>
              </td>
              <td class="px-4 text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">
                {{ competitor.uploads }}
              </td>
              <td class="px-4 text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">
                {{ competitor.views }}
              </td>
              <td class="px-4 text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">
                {{ competitor.subscribers }}
              </td>
              <td class="px-4 py-2 text-end">
                <button @click="saveCompetitor(index)"
                  class="text-left text-[10px] underline whitespace-nowrap font-medium focus:outline-none">
                  <svg v-if="isSaveCompetitor[index]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 text-[#FE4442]">
                    <path fill-rule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </TableLayout>
  </MainLayout>
</template>
<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import TableLayout from "@/layouts/TableLayout.vue";
import useToastHook from "../hooks/ToastMessage";
import { ref, onMounted } from 'vue';
import { getRequestApi , getUserDetail } from '../helper/api.js';

const user = ref(null);
const { showSuccessToast, showErrorToast } = useToastHook();
const competitors = ref([]);
const isSaveCompetitor = ref([]);
const savedTopic = ref([]);
const viewSavedTopic = () => {
  savedTopic.value = !savedTopic.value;
};

const onSuccess = () => {
  showSuccessToast("Copied");
};

const saveCompetitor = (index) => {
  isSaveCompetitor.value[index] = !isSaveCompetitor.value[index];
  if (!isSaveCompetitor.value[index]) {
    showSuccessToast("Saved");
  }
};



async function Competitors() {
if(user?.subscribed){
  try {
    let competitorsResponse;
    const storedData = localStorage.getItem('competitorsData');
    const storedTime = localStorage.getItem('competitorsDataTime');
    const currentTime = Date.now();

    if (storedData && storedTime && currentTime - parseInt(storedTime) < 24 * 60 * 60 * 1000) {
      // Use cached data if within 24 hours
      competitors.value = JSON.parse(storedData);
    } else {
      // Fetch fresh data from API
      competitorsResponse = await getRequestApi("/youtube/competitors");
      competitors.value = competitorsResponse.competitors;

      // Save fresh data and current time in local storage
      localStorage.setItem('competitorsData', JSON.stringify(competitors.value));
      localStorage.setItem('competitorsDataTime', currentTime.toString());
    }
  } catch (error) {
    showErrorToast("Failed to fetch competitors");
  }
}
};


onMounted(() => {
  Competitors();
  const user = JSON.parse(localStorage.getItem('user'));
});

setInterval(() => {
  Competitors();
}, 24 * 60 * 60 * 1000);
</script>
