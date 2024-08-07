<template>
  <MainLayout>
    <TableLayout class="!mt-0">
      <div class="flex items-stretch flex-col xl:flex-row gap-3 pb-2 ml-auto">
        <div class="flex-1 self-start">
          <fieldset>
            <legend class="sr-only">Notifications</legend>
            <div class="flex flex-col sm:flex-row flex-wrap sm:items-center sm:justify-start gap-4 2xl:gap-5">
              <div v-for="category in categories" :key="category.value" class="relative flex items-start">
                <div class="flex h-6 items-center">
                  <input :id="category.value" :name="category.value" type="checkbox" v-model="selectedCategories" :value="category.value" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600" />
                </div>
                <div class="ml-3 text-sm leading-6">
                  <label :for="category.value" class="font-medium text-gray-900">{{ category.label }}</label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="max-w-xs w-full self-end flex gap-4">
          <div class="flex-1 w-full">
                <select
                    class="slider flex items-center justify-between bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6 text-start"
                    v-model="selectedYear" name="" id="">
                    <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                </select>
            </div>
          <div class="slider flex-1 flex items-center justify-between bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6 text-center">
            <button @click="scrollLeft">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div class="month">{{ selectedMonth }}</div>
            <button @click="scrollRight">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="py-2 overflow-x-auto scrollbar">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead>
              <tr class="bg-[#414D61] text-white">
                <th class="rounded-l-lg rounded-tl-lg whitespace-nowrap px-4 py-2 text-left text-[13px] font-medium">Category</th>
                <th class="py-2 text-left whitespace-nowrap px-4 text-[13px] font-medium">Type</th>
                <th class="px-4 py-2 whitespace-nowrap text-[13px] font-medium">Date</th>
                <th class="px-4 py-2 whitespace-nowrap text-left text-[13px] font-medium">Download</th>
                <th class="rounded-r-lg px-4 py-2 whitespace-nowrap text-left text-[13px] font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="historys?.length > 0">
                <tr v-for="(history, index) in historys" :key="index" class="py-2 rounded-lg border-b border-gray-400 text-gray-500">
                <td class="px-4 py-4 text-[13px] whitespace-nowrap text-gray-800 font-medium">{{ history.category }}</td>
                <td class="px-4 text-[13px] whitespace-nowrap">
                  <div class="flex items-center justify-start gap-2">
                    <span v-if="history.category == 'content_generation'" class="font-medium truncate max-w-xl !text-red-400">{{ history.content.script }} </span>
                    <span v-if="history.category == 'keyword_research'" class="font-medium text-gray-800 truncate max-w-xl">{{ history.content.audience_age }} </span>
                    <span v-if="history.category == 'voiceover'" class="font-medium text-gray-800 truncate max-w-xl">{{ history.content.audience_age }} </span>
                    <audio v-if="history.category == 'voiceover'" class="h-8" controls>
                      <source :src="history.content.voiceover" type="audio/ogg">
                      <source :src="history.content.voiceover" type="audio/mpeg">
                      Your browser does not support the audio tag.
                    </audio>
                  </div>
                </td>
                <td class="px-4 text-[13px] whitespace-nowrap">{{ history.date }}</td>
                <td class="px-4 text-[13px] whitespace-nowrap text-start">
                  <div class="flex items-center justify-start">
                    <button @click="downloadPDF(history.id)" class="flex items-center justify-center text-center gap-2">
                      <span class="text-blue-600 font-medium text-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                        </svg>
                      </span>
                      <span v-if="!history.isAudio" class="text-blue-600 font-medium text-md">Download PDF</span>
                      <span v-else class="text-blue-600 font-medium text-md">Download VoiceOver</span>
                    </button>
                  </div>
                </td>
                <td class="px-4 py-2 text-end hidden">
                  <button @click="saveCompetitor(index)" class="text-left text-[10px] underline whitespace-nowrap font-medium focus:outline-none">
                    <svg v-if="isSaveCompetitor[index]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#FE4442]">
                      <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
              </template>
              <p class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50" v-if="showLoader">Loading...</p>
              <template v-if="!historys?.length > 0">
                <tr>
                  <td colspan="4">
                    <div class="mt-2">
                    <p class="text-[13px] text-red-600">No users found for the selected year or month. {{ currentPage }}</p>
                  </div>
                  </td>
              </tr>
              </template>
            </tbody>
          </table>
          <div class="mt-4 flex items-center justify-center">
            <fwb-pagination
                v-if="historys?.length > 0"
                v-model="currentPage"
                :total-items="40"
                :per-page="per_page"
                :enableFirstAndLastButtons="true"
                :showLabels="true"
                :layout="'pagination'">
            </fwb-pagination>
          </div>
        </div>
      </div>

    </TableLayout>
  </MainLayout>
</template>
<script setup>
import { FwbPagination } from 'flowbite-vue';
import MainLayout from "@/layouts/MainLayout.vue";
import TableLayout from "@/layouts/TableLayout.vue";
import useToastHook from "@/hooks/ToastMessage";
import { ref, onMounted, computed, watch } from 'vue';
import { getRequestApi } from "@/helper/api.js";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1);
const selectedMonthIndex = ref(currentMonth.value - 1);
const { showSuccessToast, showErrorToast } = useToastHook();
const isSaveCompetitor = ref([]);
const savedTopic = ref([]); // Remove this line if 'savedTopic' is not being used in the code.
const historys = ref([]);

const availableYears = computed(() => {
  const years = [];
  const minYear = 2024;
  for (let year = minYear; year <= currentYear.value; year++) {
    years.push(year);
  }
  return years;
});
const selectedYear = ref(currentYear.value.toString());

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Optimization', value: 'optimization' },
  { label: 'Keyword Research', value: 'keyword_research' },
  { label: 'Content Generation', value: 'content_generation' }, 
  { label: 'Voiceover', value: 'voiceover' }
];

const selectedCategories = ref([]);
const showLoader = ref(false);
const selectedMonth = computed(() => months[selectedMonthIndex.value]);
const currentPage = ref(1)
const pagination = ref({});
const scrollLeft = () => {
  if (selectedMonthIndex.value > 0) {
    selectedMonthIndex.value--;
  }
};
const scrollRight = () => {
  if (selectedMonthIndex.value < months.length - 1) {
    selectedMonthIndex.value++;
  }
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

async function fetchHistoryData() {
  try {
    showLoader.value = true;
    const response = await getRequestApi('/history', {
      categories: selectedCategories.value,
      year: currentYear.value,
      month: selectedMonthIndex.value + 1,
      page: currentPage.value 
    });
    historys.value = response.data;
    pagination.value = {
      total: response.data.total,
      perPage: response.data.per_page,
      currentPage: response.data.current_page,
      lastPage: response.data.last_page,
      from: response.data.from,
      to: response.data.to
    };
    showLoader.value = false;
  } catch (error) {
    showLoader.value = false;
    showErrorToast('Failed to fetch history data');
  }
}



const saveCompetitor = (index) => {
  isSaveCompetitor.value[index] = !isSaveCompetitor.value[index];
  showSuccessToast("Competitor saved");
};

const downloadPDF = (id) => {
  const history = historys.value.find(history => history.id === id);
  if (!history) {
    showErrorToast('History item not found');
    return;
  }

  const doc = new jsPDF();
  doc.text("History Details", 14, 20);

  const columns = [
    { header: "Field", dataKey: "field" },
    { header: "Value", dataKey: "value" }
  ];

  const data = Object.entries(history).map(([key, value]) => ({
    field: key,
    value: typeof value === 'object' ? JSON.stringify(value, null, 2) : value
  }));

  doc.autoTable({
    head: [columns.map(col => col.header)],
    body: data.map(item => columns.map(col => item[col.dataKey])),
    startY: 30
  });

  doc.save(`history_${id}.pdf`);
};

onMounted(fetchHistoryData);
watch(currentPage, fetchHistoryData);
watch([selectedCategories, selectedMonthIndex], fetchHistoryData);
</script>
