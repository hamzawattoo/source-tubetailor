<template>
    <AdminMainLayout>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
            <UsersTable />
            <div class="md:col-span-3">
                <table-layout class="px-4 py-3 sm:px-8 sm:py-6 shadow-sm border !border-gray-200 hover:!shadow-xl !mt-0">
                    <h1 class="mb-3 text-xl font-medium">Demographics</h1>
                    <table class="w-full">
                    <tr>
                        <td class="whitespace-nowrap px-3  text-left text-sm font-semibold text-gray-900">
                            USA
                        </td>
                        <td class="text-end whitespace-nowrap px-3  py-2 text-sm text-gray-500">
                            50%
                        </td>
                    </tr>
                    <tr>
                        <td class="whitespace-nowrap px-3  text-left text-sm font-semibold text-gray-900">
                            Canada
                        </td>
                        <td class="text-end whitespace-nowrap px-3  py-2 text-sm text-gray-500">
                            20%
                        </td>
                    </tr>
                    <tr>
                        <td class="whitespace-nowrap px-3  text-left text-sm font-semibold text-gray-900">
                            United Kingdom
                        </td>
                        <td class="text-end whitespace-nowrap px-3  py-2 text-sm text-gray-500">
                            10%
                        </td>
                    </tr>
                    <tr>
                        <td class="whitespace-nowrap px-3  text-left text-sm font-semibold text-gray-900">
                            Australia
                        </td>
                        <td class="text-end whitespace-nowrap px-3  py-2 text-sm text-gray-500">
                            2%
                        </td>
                    </tr>
                    <tr>
                        <td class="whitespace-nowrap px-3  text-left text-sm font-semibold text-gray-900">
                            Others
                        </td>
                        <td class="text-end whitespace-nowrap px-3  py-2 text-sm text-gray-500">
                            18%
                        </td>
                    </tr>
                    </table>
                </table-layout>
            </div>

        </div>
    </AdminMainLayout> 
</template>
<script setup>
import AdminMainLayout from "@/layouts/AdminLayout/AdminMainLayout.vue";
import TableLayout from "@/layouts/TableLayout.vue";
import UsersTable from "@/components/AdminPanel/UsersTable.vue";
</script>