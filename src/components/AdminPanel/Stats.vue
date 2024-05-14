<template>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4">
            <table-layout class="px-4 py-3 sm:px-8 sm:py-6 shadow-sm border !border-gray-200 hover:!shadow-xl">
                <div class="flex items-start gap-x-4">
                    <div class="bg-purple-100 text-purple-500 border !border-purple-400 rounded-md w-fit p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                            <path fill="currentColor"
                                d="M12 16.14h-.87a8.67 8.67 0 0 0-6.43 2.52l-.24.28v8.28h4.08v-4.7l.55-.62l.25-.29a11 11 0 0 1 4.71-2.86A6.59 6.59 0 0 1 12 16.14Z"
                                class="clr-i-solid clr-i-solid-path-1" />
                            <path fill="currentColor"
                                d="M31.34 18.63a8.67 8.67 0 0 0-6.43-2.52a10.47 10.47 0 0 0-1.09.06a6.59 6.59 0 0 1-2 2.45a10.91 10.91 0 0 1 5 3l.25.28l.54.62v4.71h3.94v-8.32Z"
                                class="clr-i-solid clr-i-solid-path-2" />
                            <path fill="currentColor"
                                d="M11.1 14.19h.31a6.45 6.45 0 0 1 3.11-6.29a4.09 4.09 0 1 0-3.42 6.33Z"
                                class="clr-i-solid clr-i-solid-path-3" />
                            <path fill="currentColor"
                                d="M24.43 13.44a6.54 6.54 0 0 1 0 .69a4.09 4.09 0 0 0 .58.05h.19A4.09 4.09 0 1 0 21.47 8a6.53 6.53 0 0 1 2.96 5.44Z"
                                class="clr-i-solid clr-i-solid-path-4" />
                            <circle cx="17.87" cy="13.45" r="4.47" fill="currentColor"
                                class="clr-i-solid clr-i-solid-path-5" />
                            <path fill="currentColor"
                                d="M18.11 20.3A9.69 9.69 0 0 0 11 23l-.25.28v6.33a1.57 1.57 0 0 0 1.6 1.54h11.49a1.57 1.57 0 0 0 1.6-1.54V23.3l-.24-.3a9.58 9.58 0 0 0-7.09-2.7Z"
                                class="clr-i-solid clr-i-solid-path-6" />
                            <path fill="none" d="M0 0h36v36H0z" />
                        </svg>
                    </div>
                    <div class="">
                        <div class="relative">
                            <h2 class="text-[15px] sm:text-[20px] font-semibold">Total Users</h2>
                            <informationcircleicon class="absolute top-0 w-5 h-5 text-black left-[160px]">
                            </informationcircleicon>
                        </div>
                        <div class="mt-1">
                            <h2 class="text-[15px]  sm:text-[20px] text-gray-400"><span v-if="!adminStats?.revenue"
                                    class="text-sm">Loading...</span><span v-else>{{ adminStats?.users_since_last_month
                                    }}</span></h2>
                        </div>

                    </div>

                </div>
                <div class="font-medium text-gray-400 text-xs sm:text-sm mt-4 text-end">
                    Since last month
                </div>
            </table-layout>
            <table-layout class="px-4 py-3 sm:px-8 sm:py-6 shadow-sm border !border-gray-200 hover:!shadow-xl">
                <div class="flex items-start gap-x-4">
                    <div class="bg-red-100 text-red-500 border !border-red-400 rounded-md w-fit p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M16 14H2v-1h13V6h1v8z" />
                            <path fill="currentColor" d="M13 4v7H1V4h12zm1-1H0v9h14V3z" />
                            <path fill="currentColor"
                                d="M3 6H2v3h1v1h4a2.5 2.5 0 1 1 0-5H3v1zm8 0V5H7a2.5 2.5 0 1 1 0 5h4V9h1V6h-1z" />
                        </svg>
                    </div>
                    <div class="">
                        <div class="relative">
                            <h2 class="text-[15px] sm:text-[20px] font-semibold">All Time Revenue</h2>
                            <informationcircleicon class="absolute top-0 w-5 h-5 text-black left-[160px]">
                            </informationcircleicon>
                        </div>
                        <div class="mt-1">
                            <h2 class="text-[15px]  sm:text-[20px] text-gray-400"><span v-if="!adminStats?.revenue"
                                    class="text-sm">Loading...</span><span v-else>${{ adminStats.revenue }}</span></h2>
                        </div>
                    </div>
                </div>
            </table-layout>
            <table-layout class="px-4 py-3 sm:px-8 sm:py-6 shadow-sm border !border-gray-200 hover:!shadow-xl">
                <div class="flex items-start gap-x-4">
                    <div class="bg-green-100 text-green-600 border !border-green-400 rounded-md w-fit p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 26 26">
                            <path fill="currentColor"
                                d="M12.875 2a1 1 0 0 0-.594.313L5.687 9H1c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h.094l2.718 9.313c.1.4.5.687 1 .687h16.5c.4 0 .8-.288 1-.688L25 13c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-4.594L13.72 2.281A1 1 0 0 0 12.875 2zM13 4.438L17.594 9H8.5L13 4.437zm4.563 7.343c.2 0 .38.069.53.219l.72.688c.3.3.3.824 0 1.124l-6 6c-.3.3-.825.3-1.126 0l-3.374-3.406c-.3-.3-.3-.793 0-1.093l.687-.72c.3-.3.794-.3 1.094 0l2.219 2.22L17 12a.798.798 0 0 1 .563-.219z" />
                        </svg>
                    </div>
                    <div class="">
                        <div class="relative">
                            <h2 class="text-[15px] sm:text-[20px] font-semibold">Paid Users</h2>
                            <informationcircleicon class="absolute top-0 w-5 h-5 text-black left-[160px]">
                            </informationcircleicon>
                        </div>
                        <div class="mt-1">
                            <h2 class="text-[15px]  sm:text-[20px] text-gray-400">12,224 (10%)</h2>
                        </div>
                    </div>
                </div>
            </table-layout>
        </div>
</template>

<script setup>
import AdminMainLayout from "@/layouts/AdminLayout/AdminMainLayout.vue";
import TableLayout from "@/layouts/TableLayout.vue";
import DashboardTable from "@/components/AdminPanel/DashboardTable.vue";
import { onMounted, ref } from "vue";
import { getRequestApi } from "@/helper/api.js";

const adminStats = ref({});


async function getAdminStats() {
    try {
        const response = await getRequestApi("/admin/stats");
        adminStats.value = response;
    } catch (error) {
        console.error("Error fetching admin stats:", error);
    }
};

onMounted(() => {
    getAdminStats();
}); 
</script>