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
                <h1 class="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                <div class="bg-sky-50 rounded-2xl p-3 sm:p-6">
                  <section class="mb-6">
                    <h2 class="text-md font-semibold text-gray-800 mb-2">1. Introduction</h2>
                    <p class="text-gray-500 text-sm"> 
                      TubeTailor ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy
                      explains how we collect, use, and share your personal information when you use our website and
                      services.
                    </p>
                  </section>
                  <section class="mb-6">
                    <h2 class="text-md font-semibold text-gray-800 mb-2">2. Information We Collect</h2>
                    <p class="text-gray-500 text-sm">
                      We collect information you provide directly to us, such as your name, email address, and payment
                      information. We also collect information about your use of our services, including your uploaded
                      content and generated results.
                    </p>
                  </section>
                  <section class="mb-6">
                    <h2 class="text-md font-semibold text-gray-800 mb-2">3. How We Use Your Information</h2>
                    <p class="text-gray-500 text-sm">
                      We use your information to provide, maintain, and improve our services. This includes using your
                      data to generate content, provide analytics, and communicate with you about your account and our
                      services.
                    </p>
                  </section>
                  <section class="mb-6">
                    <h2 class="text-md font-semibold text-gray-800 mb-2">4. Sharing Your Information</h2>
                    <p class="text-gray-500 text-sm">
                      We do not share your personal information with third parties except as necessary to provide our
                      services, comply with the law, or protect our rights. This includes sharing data with payment
                      processors and service providers.
                    </p>
                  </section>
                  <section class="mb-6">
                    <h2 class="text-md font-semibold text-gray-800 mb-2">5. Data Security</h2>
                    <p class="text-gray-500 text-sm">
                      We implement reasonable security measures to protect your information from unauthorized access and
                      use. However, no security measure is perfect, and we cannot guarantee absolute security.
                    </p>
                  </section>
                  <section class="mb-6">
                    <h2 class="text-md font-semibold text-gray-800 mb-2">6. Your Rights</h2>
                    <p class="text-gray-500 text-sm">
                      You have the right to access, update, and delete your personal information. You can exercise these
                      rights by contacting us at <a href="mailto:support@tubetailor.ai"
                        class="text-blue-600 underline">support@tubetailor.ai</a>.
                    </p>
                  </section>
                  <section class="mb-6">
                    <h2 class="text-md font-semibold text-gray-800 mb-2">7. Changes to This Policy</h2>
                    <p class="text-gray-500 text-sm">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                      the new policy on our website. Your continued use of TubeTailor after changes are made constitutes
                      your acceptance of the new policy.
                    </p>
                  </section>
                  <section>
                    <h2 class="text-md font-semibold text-gray-800 mb-2">8. Contact Information</h2>
                    <p class="text-gray-500 text-sm">
                      If you have any questions about this Privacy Policy, please contact us at <a
                        href="mailto:support@tubetailor.ai" class="text-blue-600 underline">support@tubetailor.ai</a>.
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
