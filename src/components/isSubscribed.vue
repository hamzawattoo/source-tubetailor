<template>
    <div v-if="!isSubscribed.subscribed" class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            You have no credits to use this feature.
            {{ ' ' }}
            <router-link to="/pricing-plans" class="font-medium text-yellow-700 underline hover:text-yellow-600">Upgrade your account to add credits.</router-link>
          </p>
        </div>
      </div>
    </div>
</template>
  
  <script setup>
  import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid';
  const isSubscribed  = JSON.parse(localStorage.getItem('user'));
  </script>