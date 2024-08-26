<template>
    <TransitionRoot as="template" :show="isOpen">
      <Dialog class="relative z-[9999999999999999999999]" @close="handleClose">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-2 pb-2 pt-3 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button type="button"
                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    @click="handleClose">
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div class="max-w-5xl mx-auto px-4">
                  <h1 class="text-2xl font-bold text-gray-900 mb-6">How We Use Your Data</h1>
                  <div class="bg-sky-50 rounded-2xl p-3 sm:p-6">
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">1. Data Collected from Google Account</h2>
                      <p class="text-gray-500 text-sm">
                        When you link your Google account with TubeTailor, we access certain information from your YouTube
                        account, including:
                      </p>
                      <ul class="list-disc list-inside text-gray-500 text-sm pl-4">
                        <li>Your YouTube account information</li>
                        <li>Your uploaded videos</li>
                        <li>Your YouTube analytics data</li>
                      </ul>
                    </section>
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">2. Features Using Your Data</h2>
                      <p class="text-gray-500 text-sm">
                        The data collected from your YouTube account is used for the following features:
                      </p>
                      <ul class="list-disc list-inside text-gray-500 text-sm pl-4">
                        <li>Suggesting Topic Ideas: We analyze your video performance and audience data to suggest relevant topics.</li>
                        <li>Keyword Research Tool: We use your analytics data to provide keyword insights, including audience demographics and estimated earnings.</li>
                        <li>Content Generation: We use your data to generate scripts, descriptions, tags, and thumbnail ideas.</li>
                        <li>Voiceover Generation: We create voiceovers based on the scripts generated for your videos.</li>
                        <li>Competitor Analysis: We use your data to identify and list relevant competitors.</li>
                        <li>Channel Valuation: We assess the value of your channel based on your YouTube analytics data.</li>
                        <li>History Tab: We save generated results for future reference and download.</li>
                      </ul>
                    </section>
                    <section>
                      <h2 class="text-md font-semibold text-gray-800 mb-2">3. Data Security</h2>
                      <p class="text-gray-500 text-sm">
                        We implement robust security measures to protect your data from unauthorized access and use. Your data is stored securely and used only as described in this policy.
                      </p>
                    </section>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button type="button"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    @click="handleClose">Confirm</button>
                  <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="handleClose">Cancel</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    isOpen: Boolean
  })
  
  const emit = defineEmits(['close'])
  
  const handleClose = () => {
    emit('close')
  }
  </script>
  