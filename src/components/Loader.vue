<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div :show="open" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-sm sm:p-6"
              >
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <div class="mt-2">
                      <div class="flex items-center justify-center">
                        <div class="loader"></div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="mt-5 sm:mt-6">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-youtubes focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                    @click="open = false">
                    <p class="loading !text-[#333]">Loading</p>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";

const props = defineProps(['showLoader']);
const open = ref(props.showLoader);

watch(() => props.showLoader, (newVal) => {
  open.value = newVal;
});

const closeModal = () => {
  open.value = false;
};

onMounted(() => {
  open.value = false;
});
</script>

  
  <style scoped>
  .loader {
    width: calc(90px / 0.707);
    height: 20px;
    border-radius:5%;
    background: repeating-linear-gradient(45deg, #FE4442 0 15px, #0000 0 20px) right top,
      repeating-linear-gradient(135deg, #FE4442 0 15px, #0000 0 20px) right bottom;
    background-size: 300% 50%;
    background-repeat: no-repeat;
    animation: i4 2s infinite linear;
  }
  
  @keyframes i4 {
    100% {
      background-position: left top, left bottom;
    }
  }

  p {
    text-align: center;
  }
  
  /* loading dots */
  .loading:after {
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }
  
  @keyframes dots {
    0%, 20% {
      color: rgba(0,0,0,0);
      text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);
    }
    40% {
      color: #333;
      text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);
    }
    60% {
      text-shadow: .25em 0 0 #333, .5em 0 0 rgba(0,0,0,0);
    }
    80%, 100% {
      text-shadow: .25em 0 0 #333, .5em 0 0 #333;
    }
  }
  </style>
  