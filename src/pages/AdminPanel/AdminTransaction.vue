<template>
    <AdminMainLayout>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">

        <tableLayout class="col-span-1 md:col-span-3 shadow-sm border !border-gray-200">
            <TransactionTable />
        </tableLayout>
      </div>
    </AdminMainLayout>
</template>
<script setup>
import AdminMainLayout from "@/layouts/AdminLayout/AdminMainLayout.vue";
import TableLayout from "@/layouts/TableLayout.vue";
import TransactionTable from "@/components/AdminPanel/TransactionTable.vue";
</script>