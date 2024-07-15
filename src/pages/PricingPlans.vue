<script setup>
import { ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Yearly', priceSuffix: '/year' },
];

const selectedFrequency = ref('monthly'); // Using a ref for reactive data

const selectFrequency = (option) => {
  selectedFrequency.value = option.value;
  // Additional actions can be performed here when a frequency is selected
};
</script>

<template>
  <MainLayout>
    <div class="flex flex-col items-center justify-center">
      <RadioGroup v-model="selectedFrequency.value"
        class="grid grid-cols-2 gap-x-1 rounded-full p-2 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-300 bg-white">
        <RadioGroupLabel class="sr-only">Payment frequency</RadioGroupLabel>
        <RadioGroupOption as="template" v-for="option in frequencies" :key="option.value" :value="option.value"
          v-slot="{ checked }">
          <div @click="selectFrequency(option)"
            :class="[
              checked ? 'bg-youtube text-xs text-white flex items-center justify-center' : 'text-gray-900',
              'cursor-pointer rounded-full px-2.5 py-1',
            ]">
            <span>{{ option.label }}</span>
          </div>
        </RadioGroupOption>
      </RadioGroup>
      <p class="text-base font font-normal tracking-wide mt-2">
        Save 37.5% on Yearly plan
      </p>
    </div>
    <div class="max-w-7xl mx-auto">
      <PricingCard />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import PricingCard from '../components/PricingCard.vue';
</script>