<template>
    <AdminMainLayout>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4">
        <tableLayout class="col-span-1 lg:col-span-3 shadow-sm border !border-gray-200">
            <DashboardTable />
        </tableLayout>
      </div>
    </AdminMainLayout>
  
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