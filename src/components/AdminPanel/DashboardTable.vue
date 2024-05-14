<template>
  <div class="ml-auto flex items-center justify-end max-w-xs gap-4">
    <div class="flex-1 w-full">
      <select  class="slider flex items-center justify-between bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6 text-start" v-model="selectedYear" name="" id="">
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <div
      class="flex-1 slider flex items-center justify-between bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6 text-center">
      <button @click="scrollLeft">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

      </button>
      <div class="month">{{ selectedMonth }}</div>
      <button @click="scrollRight">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

      </button>
    </div>
  </div>
  <div class="px-4 sm:px-6 lg:px-8 w-full">
    <div class="mt-8 flow-root w-full">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div v-if="data.length != 0" class="inline-block min-w-full py-2 align-middle">
          <table v-if="!showLoader" class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col"
                  class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Date
                </th>
                <th scope="col" class="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Sales</th>
                <th scope="col" class="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Revenue</th>
                <th scope="col" class="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900">New
                  Users</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="person in data" :key="person.date">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-left">{{
                  person.date }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">{{ person.sales }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">{{ person.revenue }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">{{ person.users }}</td>
              </tr>
            </tbody>
          </table>
          <p class="text-center" v-if="showLoader">Loading...</p>
        </div>
        <div v-else class="">
          <p class="text-center" v-if="showLoader">Loading...</p>
          <p v-else class="text-[13px] text-red-600">No users found for the selected year or month.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed , watch} from 'vue';
import { getRequestApi } from '../../helper/api';
import Loader from "@/components/Loader.vue";
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth()+ 1);
const selectedMonthIndex = ref(currentMonth.value - 1);
console.log("currentYear:", currentYear.value);
const selectedMonth = computed(() => months[selectedMonthIndex.value]);
const data = ref([]);
const errorMessage = ref(null);
const showLoader = ref(false);

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

const availableYears = computed (() => {
  const years = [];
  const minYear = 2024;
  for(let year = minYear; year <= currentYear.value; year++) {
    years.push(year);
  };
  return years;
});
const selectedYear = ref(currentYear.value.toString());
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

async function getUserStats() {
  try {
    showLoader.value = true;
    const response = await getRequestApi('/admin/dashboard', { year: selectedYear.value, month: selectedMonthIndex.value + 1 });
    const message = response.data.message;
    const people = response.data.map(item => ({
      date: item.date,
      sales: item.sales_count,
      revenue: item.revenue,
      users: item.new_users_count
    }));
    data.value = people;
    showLoader.value = false;
  } catch (error) {
    showLoader.value = false;
    console.error(error);
    errorMessage.value = error.response.data.message || 'Failed to fetch data.';
    console.log("errorMessage:", errorMessage.value);
  }
};

onMounted(() => {
  getUserStats();
});
watch(() => {
  getUserStats();
});
</script>
