<template>
    <AdminMainLayout>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
        <tableLayout class="col-span-1 md:col-span-3 shadow-sm border !border-gray-200">
           <h1 class="w-full mb-3 bg-white outline-none rounded-xl bg-shadow">Display Message</h1>
           <textarea class="rounded-md" name="" id="" cols="30" rows="10"></textarea>
           <div class="flex items-center justify-end w-full text-center">
            <button class="px-3 py-3.5 mt-3 text-left text-sm font-semibold rounded bg-[#414D61] text-white ">Save</button>
           </div>
        </tableLayout>
      </div>
    </AdminMainLayout>
</template>
<script setup>
import AdminMainLayout from "@/layouts/AdminLayout/AdminMainLayout.vue";
import TableLayout from "@/layouts/TableLayout.vue";
import DashboardTable from "@/components/AdminPanel/DashboardTable.vue";
</script>