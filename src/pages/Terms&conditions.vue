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
                  <h1 class="text-2xl font-bold text-gray-900 mb-6">Terms and conditions</h1>
                  <div class="bg-sky-50 rounded-2xl p-3 sm:p-6">
                    <!-- Existing Privacy Policy Sections -->   
                    <!-- New Terms and Conditions Sections -->
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">1. Introduction</h2>
                      <p class="text-gray-500 text-sm">
                        Welcome to TubeTailor! These Terms and Conditions govern your use of our website located at tubetailor.ai and our services provided therein. By accessing or using our services, you agree to be bound by these terms.
                      </p>
                    </section>
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">2. Use of Services</h2>
                      <p class="text-gray-500 text-sm">
                        You must be at least 13 years old to use TubeTailor. By using our services, you represent that you meet this age requirement.
                      </p>
                    </section>
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">3. Account Registration</h2>
                      <p class="text-gray-500 text-sm">
                        To access certain features of TubeTailor, you must register for an account. You agree to provide accurate and complete information and to keep this information up-to-date.
                      </p>
                    </section>
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">4. User Content</h2>
                      <p class="text-gray-500 text-sm">
                        You are responsible for any content you upload or generate using our services. TubeTailor does not claim ownership of your content, but you grant us a license to use, display, and distribute it as necessary to provide our services.
                      </p>
                    </section>
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">5. Prohibited Activities</h2>
                      <p class="text-gray-500 text-sm">
                        You agree not to use TubeTailor for any unlawful purposes or activities that violate these terms. This includes, but is not limited to, uploading harmful content, spamming, or infringing on others' rights.
                      </p>
                    </section>
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">6. Payment and Credits</h2>
                      <p class="text-gray-500 text-sm">
                        Certain features of TubeTailor require credits. You agree to pay all fees and charges associated with your account. Credits are non-transferable and non-refundable.
                      </p>
                    </section>
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">7. Termination</h2>
                      <p class="text-gray-500 text-sm">
                        We reserve the right to suspend or terminate your account if you violate these terms. You may also terminate your account at any time by contacting us.
                      </p>
                    </section>
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">8. Limitation of Liability</h2>
                      <p class="text-gray-500 text-sm">
                        TubeTailor is provided "as is" and we make no warranties, express or implied, regarding the service. We are not liable for any damages arising from your use of TubeTailor.
                      </p>
                    </section>
                    <section class="mb-6">
                      <h2 class="text-md font-semibold text-gray-800 mb-2">9. Changes to Terms</h2>
                      <p class="text-gray-500 text-sm">
                        We may update these terms from time to time. We will notify you of any changes by posting the new terms on our website. Your continued use of TubeTailor after changes are made constitutes your acceptance of the new terms.
                      </p>
                    </section>
                    <section>
                      <h2 class="text-md font-semibold text-gray-800 mb-2">10. Contact Information</h2>
                      <p class="text-gray-500 text-sm">
                        If you have any questions about these terms, please contact us at <a href="mailto:support@tubetailor.ai" class="text-blue-600 underline">support@tubetailor.ai</a>.
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
  