<template>
    <AdminMainLayout>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
            <MailData />
        </div>
    </AdminMainLayout>
</template>
<script setup>
import AdminMainLayout from "@/layouts/AdminLayout/AdminMainLayout.vue";
import TableLayout from "@/layouts/TableLayout.vue";
import MailData from "@/components/AdminPanel/MailData.vue";
import Stats from "@/components/AdminPanel/Stats.vue";
</script>