<template>
    <pre>
        {{ sortBy }}
    </pre>
    <div class="md:col-span-3 grid grid-col-1 sm:grid-cols-3 gap-4 mt-6">
        <!-- Search input -->
        <div>
            <label class="text-sm sm:text-lg text-gray-800 font-medium" for="filter">Search</label>
            <input @input="debounceSearch" v-model="searchQuery"
                class="px-4 py-2.5 bg-white styleCard rounded-md col-span-1 md:col-span-3 shadow-sm border !border-gray-200"
                type="text" placeholder="Search user">
        </div>

        <!-- Filter select -->
        <div class="">
            <label class="text-sm sm:text-lg text-gray-800 font-medium" for="filter">Filter:</label>
            <select
                class="px-4 py-2.5 bg-white styleCard rounded-md col-span-1 md:col-span-3 shadow-sm border !border-gray-200"
                v-model="planID" id="filter">
                <option value="">List all users</option>
                <option value="1">Basic</option>
                <option value="2">Pro</option>
                <option value="3">Lite</option>
            </select>
        </div>

        <!-- Sort select -->
        <div>
            <label class="text-sm sm:text-lg text-gray-800 font-medium" for="filter">Sort By:</label>
            <select v-model="sortBy" id="sort_by"
                class="px-4 py-2.5 bg-white styleCard rounded-md col-span-1 md:col-span-3 shadow-sm border !border-gray-200">
                <option value="">Sort by</option>
                <option value="asc">Assending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    </div>

    <tableLayout class="col-span-1 md:col-span-3 shadow-sm border !border-gray-200">
       <div class="flex flex-wrap gap-4">
        <div class="flex-1" v-if="!showLoader">
            Showing {{ users?.length }} users
        </div>
      <div class="flex-1 flex flex-wrap gap-4 justify-end">
        <div class="flex-1 w-full max-w-[250px]">
            <select
                class="slider flex items-center justify-between bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6 text-start"
                v-model="selectedYear" name="" id="">
                <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
            </select>
        </div>
        <div
            class="flex-1 max-w-[250px] slider flex items-center justify-between bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6 text-center">
            <button @click="scrollLeft">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

            </button>
            <div class="month">{{ selectedMonth }}</div>
            <button @click="scrollRight">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

            </button>
        </div>
      </div>
       </div>
        <div class="px-4 sm:px-6 lg:px-8 w-full">
            <div class="mt-8 flow-root w-full">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle">
                        <table v-if="!showLoader" class="w-full">
                            <thead>
                                <tr>
                                    <th class="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        @click="sortBy('date')">Date Joined</th>
                                    <th class="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        @click="sortBy('email')">Name</th>
                                    <th class="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        @click="sortBy('country')">Email</th>
                                    <th class="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        @click="sortBy('country')">Amount</th>
                                    <th class="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        @click="sortBy('OrderHistory')">Order History</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b" v-for="(user, index) in users" :key="index">
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                        {{ user?.joined_date }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">{{
                                        user?.name }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">{{
                                        user?.email }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                        {{ user?.total_amount_spent }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                        <button @click="openModal(user.transactions)" class="text-blue-500 font-medium">
                                            View order history
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showLoader" class="text-center">
            Loading...
        </div>
        <div v-if="users?.length === 0" class="text-[13px] text-red-600">
            No users found for the selected filter.
        </div>
    </tableLayout>

    <div v-if="isModalOpen" @close="showModal = false" class="relative z-10" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-x-hidden rounded-lg bg-white px-4  pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl  max-h-[600px]">
                    <div class="px-4 sm:px-6 lg:px-8">
                        <div class="mt-8 flow-root">
                            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="inline-block min-w-full py-2 align-middle">
                                    <table class="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th scope="col"
                                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 whitespace-nowrap">
                                                    Email</th>

                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                    Country
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                    Plan
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                    Date
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200 bg-white">
                                            <tr v-for="(transaction) in transactions" :key="transaction">
                                                <td
                                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                    <pre>{{ transaction.email }}</pre>
                                                </td>

                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {{ transaction?.country_code }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {{ transaction?.plan }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {{ transaction?.date }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {{ transaction?.amount }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="w-full text-end sticky bottom-0 bg-white py-2">
                                <button type="button" @close="showModal = false"
                                    class="inline-flex justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import tableLayout from "@/layouts/TableLayout.vue";
import { onMounted, ref, watch, computed } from "vue";
import { getRequestApi } from "@/helper/api.js";

// Refs for reactive data
const users = ref([]);
const transactions = ref([]);
const searchQuery = ref("");
const sortBy = ref("");
const planID = ref("");
const isModalOpen = ref(false);
const showLoader = ref(true);

// Debounce delay in milliseconds
const debounceDelay = 500;
let debounceTimer = null;
let timeoutId = null;

// Year and Month selection
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1);
const selectedYear = ref(currentYear.value.toString());
const selectedMonthIndex = ref(currentMonth.value - 1);
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const selectedMonth = computed(() => months[selectedMonthIndex.value]);

// Available years computed property
const availableYears = computed(() => {
    const years = [];
    const minYear = 2024;
    for (let year = minYear; year <= currentYear.value; year++) {
        years.push(year);
    }
    return years;
});

// Function to scroll left and right in months
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

// Debounce function for search input
const debounceSearch = () => {
    showLoader.value = true;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        debouncedGetAdminUsers();
    }, debounceDelay);
};

// Function to open the modal and set transactions
const openModal = (content) => {
    isModalOpen.value = true;
    transactions.value = content;
};

// Debounced function to fetch admin users based on searchQuery, sortBy, and planID
const debouncedGetAdminUsers = async () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
        const queryParams = {
            // order_by: sortBy.value.toString(),
            year: selectedYear.value ?? "",
            month: selectedMonthIndex.value + 1 ?? "",
            per_page: 10,
            page: 1,
        };
        if(searchQuery.value){
            queryParams.q = searchQuery.value
        }
        if(planID.value){
            queryParams.plan_id = planID.value
        }

        try {
            showLoader.value = true;
            const response = await getRequestApi("/admin/users", queryParams );
            showLoader.value = false;
            users.value = response.users;
            console.log("Fetched users:", users.value);
        } catch (error) {
            showLoader.value = false;
            console.error("Error fetching admin users:", error);
        }
    }, debounceDelay);
};

// Watch for changes in sortBy and planID to fetch updated data
watch([sortBy, planID, selectedMonthIndex, selectedYear], () => {
    debouncedGetAdminUsers();
});

// Fetch data on component mount
onMounted(() => {
    debouncedGetAdminUsers();
});
</script>
