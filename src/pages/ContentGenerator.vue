<template>
  <MainLayout>
    <div
      v-if="apiErrors.length > 0"
      class="rounded-md bg-red-50 p-4 sticky top-0 z-[9999]">
      <div class="flex">
        <div class="flex-shrink-0">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Attention needed</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ apiErrors[0] }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Youtube -->
    <Modal :showLoader="showLoader" />

    <div v-if="store.currentTab === 0" class="pb-5 space-y-4">
      <span v-if="textValueValidationMessage" style="color: red">{{
        textValueValidationMessage
      }}</span>
      <div>
        <input
          v-model="textValue"
          class="w-full px-4 py-4 bg-white rounded-xl outline-none bg-shadow"
          type="text"
          placeholder="Enter script title"
        />
      </div>
     <div class="grid sm:grid-cols-2">
      <div class="flex items-center gap-4">
        <label
          v-for="(checkbox, index) in checkboxes"
          :key="index"
          class="flex flex-row gap-4 items-center cursor-pointer"
        >
          <input
            type="radio"
            v-model="selectedCheckbox"
            :value="checkbox.value"
            class="hidden"/>
          <div
            class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none"
            :class="{ 'bg-youtube text-white': selectedCheckbox === checkbox.value }">
            <svg
              v-if="selectedCheckbox === checkbox.value"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg" >
              <path
                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <span class="select-none font-[16px]">{{ checkbox.label }}</span>
        </label>
      </div>
     <div class="flex items-center justify-between">
      <div class="max-w-xs w-full ml-2">
        <div>
          <select v-model="selectedLanguage" class="bg-white block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6">
            <option value="english">english</option>
            <option value="spanish">spanish</option>
            <option value="french">french</option>
            <option value="german">german</option>
            <option value="portuguese">portuguese</option>
          </select>
        </div>
      </div>
      <div class="flex items-center justify-end py-2">
        <Loader :showLoader="showLoader" />
        <button
          @click="ContentGenerate()"
          class="px-[40px] py-[6px] rounded-full bg-youtube text-white"
        >
          Generate
        </button>
      </div>
     </div>
     </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- First Column -->
        <div class="col-span-1">
          <!-- Content for the first column -->
          <div class="space-y-2 overflow-y-auto pb-5 bg-white">
            <!-- Your content here -->
            <div class="p-4 bg-white bg-shadow rounded-xl border h-[60vh] overflow-auto">
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Script:</h2>
                <button @click="copyText(apiResponse?.script)" class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div  class="space-y-6 text-base text-gray-900">
                <p style="white-space: pre-line">
                {{ apiResponse?.script }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <!-- Content for the first column -->
          <div class="space-y-2">
            <!-- Your content here -->
            <div class="p-4 bg-white bg-shadow rounded-xl border h-[60vh] overflow-auto">
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Narrated Script:</h2>
                <button @click="copyText(apiResponse?.narration_script)" class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <div  class="space-y-6 text-base text-gray-900">
                <p style="white-space: pre-line">
                {{ apiResponse?.narration_script }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center md:col-span-2">
                <button @click="exportToOptimization"  class="bg-red-600 px-3  py-2 rounded-md text-white outline outline-offset-2 outline-2">Export to Optimization</button>
              </div>
        <!-- Second Column -->
        <div class="col-span-2">
          <!-- Content for the second column -->
          <div class="p-4 bg-white bg-shadow rounded-xl border">
            <!-- Content 1 in the second column -->
            <div class="">
              <!-- Your content here -->
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Description:</h2>
                <button @click="copyText(apiResponse?.description)" class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="space-y-6 text-base text-gray-900">
                {{ apiResponse?.description }}
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Youtube Tags:</h2>
                <button @click="copyText(apiResponse?.tags)" class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="flex flex-wrap items-center justify-start gap-2">
                <span v-if="apiResponse?.script" v-for="tag in apiResponse.tags" :key="tag"
                  class="text-gray-800 bg-[#EFF4FD] px-5 py-1 font-semibold text-[12px] rounded-full flex">{{ tag }}</span>
                  <span v-else v-for="person in people" :key="person.email"
                    class="px-3 py-1 bg-[#EFF4FD] text-gray-500 rounded-full text-[12px] whitespace-nowrap flex">{{ person.data }}</span>
              </div>

            </div>
            <!-- Content 2 in the second column -->

           </div>

        </div>


            <div class="p-4 bg-white bg-shadow rounded-xl border md:col-span-2">
              <!-- Your content here -->
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Voiceover:</h2>
              </div>
             <div class="grid grid-cols-2 gap-4">
              <div class="">
                <Listbox as="div" v-model="selected">
                <div class="relative mt-2">
                  <ListboxButton
                    class="relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 focus:outline-none sm:text-sm sm:leading-6 border border-gray-200 rounded-full"
                  >
                    <span class="inline-flex w-full truncate gap-4">
                      <div class="inline-flex w-full truncate gap-1">
                        <span class="truncate">{{ selected?.id }}</span>
                        <span class="ml-2 truncate text-gray-500">{{
                          selected?.gender
                        }}</span>
                      </div>
                      <span
                        v-if="selected?.child"
                        class="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-500/10"
                        >Child</span  >
                    </span>
                    <span
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                      <ChevronUpDownIcon
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                    <div>
                      <div class="bg-red-800"></div>
                      <div class="">
                        <ListboxOption
                        as="template"
                        v-for="voice in peopleVoiceOver"
                        :key="voice.id"
                        :value="voice"
                        v-slot="{ active, selected }">
                        <li
                          @mouseover="toggleAudio(true)"
                          @mouseleave="toggleAudio(false)"
                          @click="selectVoice(voice)"
                          :class="[
                            active ? 'bg-gray-400 text-white' : 'text-gray-900','relative cursor-pointer select-none py-2 pl-3 pr-9 border-b group',]">
                          <span
                            v-if="selected"
                            :class="[
                              active ? 'text-white' : 'text-gray-600',
                              'absolute inset-y-0 left-2 flex items-center pr-4',
                            ]"
                          >
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div class="flex items-center justify-between ml-4">
                            <div class="flex gap-4 w-full">
                              <div class="flex w-1/4">
                                <span
                                  :class="[
                                    selected ? 'font-semibold' : 'font-normal',
                                    'truncate',
                                  ]">{{ voice?.id }}</span>
                                <span
                                  :class="[
                                    active ? 'text-gray-900' : 'text-gray-500',
                                    'ml-2 truncate',
                                  ]"
                                  >{{ voice?.gender }}</span
                                >
                              </div>
                              <span
                                v-if="voice?.child"
                                class="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-500/10"
                                >Child</span>
                                <span class="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10">{{capitalizeFirstLetter (voice.language) }}</span>

                            </div>
                            <audio
                              ref="audio"
                              controls
                              class="w-[100px] h-[30px] text-red-900">
                              <source :src="voice.link" type="audio/mp3" />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        </li>
                      </ListboxOption>
                      </div>
                    </div>

                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
              <!-- v-if="this.apiResponse?.script.length > 0" -->
              <div class="flex flex-col gap-4 items-start py-4">
                <div class="flex justify-end w-full">
                  <button

                    class="px-[40px] py-[6px] rounded-full bg-youtube text-white"
                    @click="voiceover()">
                    Generate
                  </button>
                </div>
              </div>
              </div>


              <div v-if="!showLoader" class="">
                <audio v-if="!showLoader" controls class="w-full invisible h-0">
                  <source :src="voiceOverResult" type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <audio class="w-full" v-if="!showLoader" controls>
                  <source :src="voiceOverResult" type="audio/ogg" />
                  <source :src="voiceOverResult" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div class="flex items-center justify-end mt-3">
                  <a v-if="voiceOverResult" :href="voiceOverResult" class="text-black" download>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd">
                    </path>
                  </svg>
                </a>
                </div>
              </div>
             </div>
            </div>
      </div>
    </div>

    <!-- Instagram -->
    <div v-else-if="store.currentTab === 1" class="py-5 space-y-4">
      <div>
        <textarea
          class="w-full h-64 px-4 py-4 bg-white rounded-lg outline-none bg-shadow"
          type="text"
          placeholder="Enter script title"
        />
      </div>
      <div class="flex items-center gap-4">
        <label
          class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
        >
          <CheckboxRoot
            v-model="checkboxOne"
            class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none"
          >
            <CheckboxIndicator
              class="flex items-center justify-center w-full h-full text-white rounded bg-insta"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </CheckboxIndicator>
          </CheckboxRoot>
          <span class="select-none font-[16px]">Short</span>
        </label>
        <label
          class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
        >
          <CheckboxRoot
            v-model="checkboxTwo"
            class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none"
          >
            <CheckboxIndicator
              class="flex items-center justify-center w-full h-full text-white rounded bg-insta"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </CheckboxIndicator>
          </CheckboxRoot>
          <span class="select-none font-[16px]">Long Video</span>
        </label>
      </div>
      <div class="flex items-center justify-end py-2">
        <button
          class="px-[40px] py-[6px] rounded-full bg-insta text-white" >
          Generate
        </button>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- First Column -->
        <div class="col-span-1">
          <!-- Content for the first column -->
          <div class="space-y-2">
            <!-- Your content here -->
            <div class="p-4 bg-white bg-shadow rounded-xl">
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Script:</h2>
                <button class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="space-y-6 text-[13px] text-[#868E9C]">
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It
                  has roots in a piece of classical Latin literature from 45 BC, making it
                  over 2000 years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney College in Virginia, looked up one of the more obscure
                  Latin words, consectetur, from a Lorem Ipsum passage, and going through
                  the cites of the word in classical literature, discovered the
                  undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                  of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                  Cicero, written in 45 BC. This book is a treatise on the theory of
                  ethics, very popular during the Renaissance. The first line of Lorem
                  Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
                  1.10.32.
                </p>
                <p>
                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                  below for those interested. Sections 1.10.32 and 1.10.33 from "de
                  Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
                  original form, accompanied by English versions from the 1914 translation
                  by H. Rackham.
                </p>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It
                  has roots in a piece of classical Latin literature from.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Second Column -->
        <div class="col-span-1">
          <!-- Content for the second column -->
          <div class="">
            <!-- Content 1 in the second column -->
            <div class="p-4 mb-4 bg-white bg-shadow rounded-xl">
              <!-- Your content here -->
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Description:</h2>
                <button class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="space-y-6 pb-2 text-[13px] text-[#868E9C]">
                <p>
                  Our AI generates captivating, viewer-focused titles that effectively
                  communicate your video's core message and entice clicks.
                </p>
                <p>
                  We provide comprehensive, SEO-optimized descriptions designed to enhance
                  your video's discoverability and accurately summarize its content for
                  potential viewers.
                </p>
              </div>
            </div>
            <!-- Content 2 in the second column -->
            <div class="p-4 mb-4 bg-white bg-shadow rounded-xl">
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Hashtags</h2>
                <button class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="flex flex-wrap items-center justify-start gap-2">
                <span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                >
              </div>
            </div>
            <!-- Content 3 in the second column -->
            <div class="p-4 bg-white bg-shadow rounded-xl">
              <!-- Your content here -->
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Voiceover:</h2>
                <button class="text-black">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="flex flex-wrap items-center justify-between py-4">
                <div class="flex items-center gap-4">
                  <label
                    v-for="(checkbox, index) in checkboxes"
                    :key="index"
                    class="flex flex-row gap-4 items-center hover:bg-neutral-100"
                  >
                    <input
                      type="checkbox"
                      v-model="selectedCheckbox"
                      :value="checkbox.value"
                      class="hidden"
                    />
                    <div
                      class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none"
                      :class="{
                        'bg-youtube text-white': selectedCheckbox === checkbox.value,
                      }"
                    >
                      <svg
                        v-if="selectedCheckbox === checkbox.value"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <span class="select-none font-[16px]">{{ checkbox.label }}</span>
                  </label>
                </div>
                <div>
                  <button
                    class="px-[40px] py-[6px] rounded-full bg-insta text-white"
                    @click="start()"
                  >
                    Generate
                  </button>
                </div>
              </div>
              <hr />
              <div class="py-4">
                <audio controls class="w-full">
                  <source
                    src="https://open.spotify.com/track/6qrifdo7QINdPQr80IelGi?si=d922762d4a304a14"
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Tiktok -->
    <div v-else-if="store.currentTab === 2" class="py-5 space-y-4">
      <div>
        <textarea
          class="w-full h-64 px-4 py-4 bg-white rounded-lg outline-none bg-shadow"
          type="text"
          placeholder="Enter script title"
        />
      </div>
      <div class="flex items-center gap-4">
        <label
          class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
        >
          <CheckboxRoot
            v-model="checkboxOne"
            class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none"
          >
            <CheckboxIndicator
              class="flex items-center justify-center w-full h-full text-white rounded bg-insta"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </CheckboxIndicator>
          </CheckboxRoot>
          <span class="select-none font-[16px]">Short</span>
        </label>n
        <label
          class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
        >
          <CheckboxRoot
            v-model="checkboxOne"
            class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none"
          >
            <CheckboxIndicator
              class="flex items-center justify-center w-full h-full text-white rounded bg-insta"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </CheckboxIndicator>
          </CheckboxRoot>
          <span class="select-none font-[16px]">Long Video</span>
        </label>
      </div>
      <div class="flex items-center justify-end py-2">
        <button
          class="px-[40px] py-[6px] rounded-full bg-tiktok text-white"
          @click="start()"
        >
          Generate
        </button>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- First Column -->
        <div class="col-span-1">
          <!-- Content for the first column -->
          <div class="space-y-2">
            <!-- Your content here -->
            <div class="p-4 bg-white bg-shadow rounded-xl">
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Script:</h2>
                <button class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="space-y-6 text-[13px] text-[#868E9C]">
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It
                  has roots in a piece of classical Latin literature from 45 BC, making it
                  over 2000 years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney College in Virginia, looked up one of the more obscure
                  Latin words, consectetur, from a Lorem Ipsum passage, and going through
                  the cites of the word in classical literature, discovered the
                  undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                  of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                  Cicero, written in 45 BC. This book is a treatise on the theory of
                  ethics, very popular during the Renaissance. The first line of Lorem
                  Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
                  1.10.32.
                </p>
                <p>
                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                  below for those interested. Sections 1.10.32 and 1.10.33 from "de
                  Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
                  original form, accompanied by English versions from the 1914 translation
                  by H. Rackham.
                </p>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It
                  has roots in a piece of classical Latin literature from.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Second Column -->
        <div class="col-span-1">
          <!-- Content for the second column -->
          <div class="">
            <!-- Content 1 in the second column -->
            <div class="p-4 mb-4 bg-white bg-shadow rounded-xl">
              <!-- Your content here -->
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Description:</h2>
                <button class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="space-y-6 pb-2 text-[13px] text-[#868E9C]">
                <p>
                  Our AI generates captivating, viewer-focused titles that effectively
                  communicate your video's core message and entice clicks.
                </p>
                <p>
                  We provide comprehensive, SEO-optimized descriptions designed to enhance
                  your video's discoverability and accurately summarize its content for
                  potential viewers.
                </p>
              </div>
            </div>
            <!-- Content 2 in the second column -->
            <div class="p-4 mb-4 bg-white bg-shadow rounded-xl">
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Hashtags</h2>
                <button class="text-gray-600">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="flex flex-wrap items-center justify-start gap-2">
                <span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                ><span
                  class="text-[#868E9C] bg-[#EFF4FD] px-3 py-1 font-semibold text-[10px] rounded-full"
                  >foodie</span
                >
              </div>
            </div>
            <!-- Content 3 in the second column -->
            <div class="p-4 bg-white bg-shadow rounded-xl">
              <!-- Your content here -->
              <div class="flex items-center justify-between py-2">
                <h2 class="text-[16px] font-semibold">Voiceover:</h2>
                <button class="text-black">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="flex flex-wrap items-center justify-between py-4">
                <div class="flex items-center gap-4">
                  <label
                    class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
                  >
                    <CheckboxRoot
                      v-model="checkboxOne"
                      class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none"
                    >
                      <CheckboxIndicator
                        class="flex items-center justify-center w-full h-full text-white rounded bg-insta"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </CheckboxIndicator>
                    </CheckboxRoot>
                    <span class="select-none font-[16px]">Male</span>
                  </label>
                  <label
                    class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
                  >
                    <CheckboxRoot
                      v-model="checkboxOne"
                      class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none"
                    >
                      <CheckboxIndicator
                        class="flex items-center justify-center w-full h-full text-white rounded bg-insta"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </CheckboxIndicator>
                    </CheckboxRoot>
                    <span class="select-none font-[16px]">Female</span>
                  </label>
                </div>
                <div>
                  <button
                    class="px-[40px] py-[6px] rounded-full bg-tiktok text-white"
                    @click="start()"
                  >
                    Generate
                  </button>
                </div>
              </div>
              <hr />
              <div class="py-4">
                <audio controls class="w-full">
                  <source
                    src="https://open.spotify.com/track/6qrifdo7QINdPQr80IelGi?si=d922762d4a304a14"
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import Tabs from "@/components/Tabs.vue";
import { CheckboxIndicator, CheckboxRoot } from "radix-vue";
import { ref, onMounted, computed } from "vue";
import { useTab } from "@/store/counter";
import Loader from "@/components/Loader.vue";
import iconill from "@/components/icon.vue";

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { postRequest } from "../helper/api.js";
import { getRequestApi } from "../helper/api.js";
import clipboardCopy from "clipboard-copy";
import AudioPlayer from "vue-audio";
import GlobalAlert from "@/components/Alert.vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
import useToastHook from "../hooks/ToastMessage";
import { useMainStore } from '@/store/index';

const apiErrors = ref([]);
const onSuccess = () => {
  showSuccessToast("Copied");
};
export default {
  components: {
    MainLayout,
    Tabs,
    CheckboxIndicator,
    CheckboxRoot,
    Loader,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    ChevronUpDownIcon,
    AudioPlayer,
  },
  data() {
    return {
      selectedLanguage:'spanish',
      checkboxOne: true,
      store: useTab(),
      peopleVoiceOver: [],
      selected: null,
      textValue: "",
      voiceOverResult: "", // Initial value
      shouldRenderAudio: false,
      showLoader: false,
      selectedVoice: null,
      storeContent: useMainStore(),
      apiResponse: {
        script: "",
        narration_script: "",
        description: "",
        tags: [],
      },
      isAudioPlaying: false,
      apiErrors: [],
      textValueValidationMessage: "",
      showLoader: false,
      checkboxes: [
        { value: "long", label: "Long ( 600-750 words )" },
        { value: "short", label: "Short ( 250 words )" },
      ],
      selectedCheckbox: "long",
    };
  },
  created() {
    const { showSuccessToast, showErrorToast } = useToastHook();
    this.showSuccessToast = showSuccessToast;
    this.showErrorToast = showErrorToast;
    this.apiResponse.script = this.storeContent.scriptContentGenerator
    this.apiResponse.narration_script = this.storeContent.narration_scriptContentGenerator
    this.apiResponse.description = this.storeContent.descriptionContentGenerator
    this.apiResponse.tags = this.storeContent.tagsContentGenerator
    this.textValue = this.storeContent.textValueContentGenerator
  },
  computed: {
    groupedVoices() {
      const grouped = {};
      this.peopleVoiceOver.forEach(voice => {
        if (!grouped[voice.language]) {
          grouped[voice.language] = [];
        }
        grouped[voice.language].push(voice);
      });
      return grouped;
    },
  },
  methods: {
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    toggleAudio(play) {
      if (this.isAudioPlaying && !play) {
        this.$refs.audio.pause();
        this.isAudioPlaying = false;
      } else if (!this.isAudioPlaying && play) {
        this.$refs.audio.play();
        this.isAudioPlaying = true;
      }
    },
    selectVoice(voice) {
      this.selected = voice;
    },

    updateTextValue(value) {
      this.textValue = value;
    },
    async fetchVoiceData() {
      try {
        let storedData = localStorage.getItem("voiceData");
        let storedTimestamp = localStorage.getItem("voiceDataTimestamp");

        if (!storedData || !storedTimestamp) {
          const response = await getRequestApi("voiceover/demo", {language: 'spanish'});
          this.peopleVoiceOver = response.voices;
          this.selected = this.peopleVoiceOver[0];

          localStorage.setItem("voiceData", JSON.stringify(response.voices));
          localStorage.setItem("voiceDataTimestamp", new Date().getTime());
        } else {
          this.peopleVoiceOver = JSON.parse(storedData);
          this.selected = this.peopleVoiceOver[0];
        }
      } catch (error) {
        this.showLoader = false;
      }
    },

    //////////////////CONTENT GENERATOR/////////////////////
    async ContentGenerate() {
      if (!this.textValue.trim()) {
        this.textValueValidationMessage = "Please write a script";
        setTimeout(() => {
          this.hideValidationMessage();
        }, 2000);

        return;
      }
      this.showLoader = true;
      try {
        const response = await postRequest("youtube/content-generator", {
          title: this.textValue, language: this.selectedLanguage,
        });
        this.showLoader = false;
        this.apiResponse = response;
        this.storeContent.$patch((state) => {
          state.scriptContentGenerator = this.apiResponse?.script
          state.narration_scriptContentGenerator = this.apiResponse?.narration_script
          state.descriptionContentGenerator = this.apiResponse?.description
          state.tagsContentGenerator = this.apiResponse?.tags
          state.textValueContentGenerator = this.textValue
        });
      } catch (error) {
        this.showLoader = false;
      }
      setTimeout(() => {
        this.apiErrors = [];
      }, 2000);
    },
    //////////////////VOICE OVER/////////////////////////
    playAudio() {
      // Check if the audio source is not empty and autoplay
      if (this.voiceOverResult) {
        this.$refs.audioPlayer.play();
      }
    },
    async exportToOptimization(){
      this.storeContent.$patch((state) => {
        if(this.apiResponse) {
          this.$router.push({ path: '/optimization' });
        }
      })
    },
    async voiceover() {
      console.log(this.selected.id);
      this.showLoader = true;

      try {
        const response = await postRequest("voiceover", {
          text: this.apiResponse?.script,
          voice_id: this.selected.id,
        });

        this.showLoader = false;
        this.voiceOverResult = response.voiceover;
        this.shouldRenderAudio = false; // Ensure the next render will recreate the audio element
        this.$nextTick(() => {
          this.shouldRenderAudio = true; // Allow the next render to create the audio element
        });

        console.log(this.voiceOverResult);
      } catch (error) {
        this.showLoader = false;
      }
      setTimeout(() => {
        this.apiErrors = [];
      }, 2000);
    },

    //////////////////////COPY TEXT////////////////////////
    copyText(textToCopy) {
      showSuccessToast("Copied");
      clipboardCopy(textToCopy)
        .then(() => {})
        .catch((err) => {});
    },
    ///////////////////////VALIDATION////////////////////////
    hideValidationMessage() {
      this.textValueValidationMessage = "";
    },
  },
  mounted() {
    this.textValue = localStorage.getItem("topic") ?? this.textValue;
    this.fetchVoiceData();
  },
};
</script>
<script setup>
const people = [
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
];
</script>
<style scoped>
.bg-shadow {
  fill: #ffff;
  filter: drop-shadow(0px 10px 30px rgba(227, 235, 249, 0.5));
}
</style>
