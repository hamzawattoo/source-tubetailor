<!-- GlobalAlert.vue -->
<template>
    <div v-if="messages" class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-800" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Attention needed</h3>
          <div class="mt-2 text-sm text-red-700">
            <ul>
              <li>{{ messages }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid';

export default {
  props: {
    messages: {
      type: String,
      required: true
    }
  }
};
</script>
  