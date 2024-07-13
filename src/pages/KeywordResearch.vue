<template>
  <MainLayout>
    <!-- youtube -->
    <div v-if="apiErrors.length > 0" class="rounded-md bg-red-50 p-4 sticky top-0 z-[9999]">
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
    <div v-if="store.currentTab === 0" class="pb-5 space-y-4">
      <span v-if="textValueValidationMessage" style="color: red;">{{ textValueValidationMessage }}</span>
      <div class="flex items-center w-full px-4 bg-white rounded-xl outline-none bg-shadow border">
        <input v-model="textValue" @keyup.enter="start" id="keyword" type="text"
          class="w-full py-4 bg-white border-0 focus:bg-none focus:shadow-none" placeholder="Fitness" />
        <button @click="start()">
          <label for="keyword">
            <MagnifyingGlassIcon class="w-6 h-6 text-gray-400" />
          </label>
        </button>
      </div>
      <Loader :showLoader="showLoader" />
      <div class="items-start gap-4 md:flex-row grid grid-cols-1 md:grid-cols-2">
        <div class="md:h-full">
          <div class="flex items-center">
            <h2 class="text-xl font-bold mb-2">
              Overview :
            </h2>
          </div>
          <div class="flex-1 w-full h-full px-6 py-8 space-y-2 bg-white md:w-auto bg-shadow rounded-xl border flex flex-col items-center justify-center">
           <h2 class="font-bold text-2xl sm:mb-6 text-center text-red-700">{{ capitalizeFirstLetter(textValue) }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-24">
              <div class="">
                <div class="text-center space-y-2 font-[#868E9C] text-[12px] relative">
                 <div class="flex items-center justify-center gap-2">
                  <p>Youtube Search Volume</p>
                  <InformationCircleIcon class="absolute -right-7 -top-1 w-6 h-6" />
                 </div>
                  <h2 class="text-[24px] font-bold">{{ DetailAnaylsis.monthly_search_volume }}</h2>
                  <p class="bg-yellow-400 rounded-full px-3 py-2 text-[12px] text-black font-medium">
                    Seraches Per Month
                  </p>

                </div>
              </div>
              <div>
                <div class="text-center space-y-2 relative font-[#868E9C] text-[12px]">
                  <div class="flex items-center justify-center gap-2">
                    <p>Competition</p>
                   <InformationCircleIcon class=" w-6 h-6" />
                  </div>
                  <h2 v-if="DetailAnaylsis.monthly_search_volume" class="text-[24px] font-bold">61.41</h2>
                  <h2 v-else class="text-[24px] font-bold">0</h2>
                  <p class="bg-orange-400 rounded-full px-3 py-2 text-[12px] text-black font-medium">
                    Out of 100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-full">
          <div class="flex items-center">
            <h2 class="text-xl font-bold mb-2">Detailed Analysis :</h2>
          </div>
          <div class="flex-1 h-full sm:px-6 py-4 space-y-2 bg-white md:w-auto bg-shadow rounded-xl border flex items-center justify-center">
            <div class="space-y-2 divide-y divide-gray-200 w-full">
              <div class="px-4 sm:grid grid-cols-1 sm:gap-4 sm:px-0">
                <dt class="text-md font-semibold leading-4 text-gray-900">Audience Demographics</dt>
                <dd class=" text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0 flex flex-col space-y-2">
                  <dt class="font-medium text-gray-700">Audience Details :</dt>
                  <p v-if="DetailAnaylsis.audience_age"> {{ DetailAnaylsis.audience_age }}</p>
                  <p v-else>N/A</p>
                  <dt class="font-medium text-gray-700">Audience Gender :</dt>
                  <p v-if="DetailAnaylsis.audience_gender">{{ DetailAnaylsis.audience_gender }}</p>
                  <p v-else>N/A</p>
                  <dt class="font-medium text-gray-700">Top 3 countries :</dt>
                  <p v-if="DetailAnaylsis.top_countries"> {{ DetailAnaylsis.top_countries }}</p>
                  <p v-else>N/A</p>
                </dd>
              </div>
              <div class="px-4 py-2 sm:grid sm:grid-cols-3 items-center sm:gap-4 sm:px-0">
                <dt class="text-md font-semibold leading-6 text-gray-900">Estimated CTR %</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  <span class="inline-flex items-center rounded-full bg-pink-50 px-5 py-1 text-sm font-semibold text-pink-700 ring-1 ring-inset ring-pink-600"><span class="pr-1">{{ DetailAnaylsis.CTR_estimates }}</span> % </span>
                </dd>
              </div>
              <div class="px-4 py-2 sm:grid sm:grid-cols-3 items-center sm:gap-4 sm:px-0">
                <dt class="text-md font-semibold leading-6 text-gray-900">Estimated earnings <br>
                <span class="text-sm font-medium text-gray-500">(per 1000 views)</span>
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  <span class="inline-flex items-center gap-x-1.5 rounded-full bg-purple-100 px-4 py-0.5 text-sm font-semibold border !border-purple-500 text-purple-700">
                      <span class="text-sm font-semibold">$ {{DetailAnaylsis.estimated_adsense_earning }}</span>
                    </span>
                </dd>
              </div>
            </div>

          </div>
        </div>
        <div class="mt-4 flex items-center justify-between w-full md:col-span-2 pt-4">
        <h2 class="relative text-xl font-bold">
          Similar Keywords:
        </h2>
      </div>
        <div class="flex-1 w-full px-6 py-8 bg-white md:col-span-2 bg-shadow rounded-xl border">
           <div class="flex items-center justify-end gap-5 mb-2">
            <button @click="changeTabMarketing(1)" :class="[
                    'px-3 py-2 text-xs border rounded-full',
                    currentTabMarketing === 1 ? 'bg-youtube text-white' : '',
                  ]">
                  New keywords
                  </button>
                   <button @click="changeTabMarketing(2)" :class="[
                    'px-3 py-2 text-xs border  rounded-full',
                    currentTabMarketing === 2
                      ? 'bg-youtube text-white border-[#fe4442]'
                      : '',
                  ]">
                  saved keywords
                  </button>
           </div>
          <div class="overflow-x-auto scrollbar">
            <div class="w-full min-w-max">
              <table v-if="currentTabMarketing === 1" class="table min-w-full border divide-gray-300 rounded-lg">
                <thead class="rounded bg-[#414D61] text-white">
                  <tr>
                    <th scope="col" class="rounded-l-lg px-3 py-3.5 text-left text-sm font-semibold">
                      Similar Keywords
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
                      Search Volume
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
                      Overall
                    </th>
                    <th scope="col" class="rounded-r-lg px-3 py-3.5 text-right text-sm font-semibold">

                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr v-if="similar_keywords != 0" v-for="(keywordData, index) in similar_keywords" :key="index" class="even:bg-[#EFF4FD]">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium whitespace-nowrap sm:pl-3">
                      <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
                        <CheckboxRoot v-model="checkboxOne"
                          class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none">
                          <CheckboxIndicator
                            class="flex items-center justify-center w-full h-full text-white rounded bg-insta">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <span class="select-none font-[16px] text-gray-800">{{ keywordData?.keyword }}</span>
                      </label>
                    </td>
                    <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-800">
                      {{ keywordData?.monthly_search_volume }}
                    </td>
                    <td class="flex items-center gap-2 px-3 py-4 text-sm whitespace-nowrap">
                      <span class="rounded-full text-white bg-[#FCC42D] px-4 py-0.5 text-[12px] font-bold"> {{ keywordData?.difficulty
                      }}</span>
                    </td>
                    <td class="px-4 py-2 text-right">
                      <button @click="saveTopicIdeas(index)" class="text-left text-[10px] underline whitespace-nowrap font-medium focus:outline-none">
                        <svg v-if="!isTopicSaved[index]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        <svg v-else="isTopicSaved[index]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#FE4442]">
                          <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                        </svg>
                     </button>
                    </td>
                  </tr>
                  <tr v-else  v-for="(keywordDataDefault, indexDefault) in keywordDataDefaults" :key="indexDefault" class="even:bg-[#EFF4FD]">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium whitespace-nowrap sm:pl-3">
                      <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
                        <CheckboxRoot v-model="checkboxOne"
                          class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none">
                          <CheckboxIndicator
                            class="flex items-center justify-center w-full h-full text-white rounded bg-insta">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <span class="select-none font-[16px] text-gray-800">{{ keywordDataDefault?.keyword }}</span>
                      </label>
                    </td>
                    <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-800">
                      {{ keywordDataDefault?.monthly_search_volume }}
                    </td>
                    <td class="flex items-center gap-2 px-3 py-4 text-sm whitespace-nowrap">
                      <span class="rounded-full text-white bg-[#FCC42D] px-4 py-0.5 text-[12px] font-bold"> {{ keywordDataDefault?.difficulty
                      }}</span>
                    </td>
                    <td class="px-4 py-2 text-right">
                      <button @click="saveTopicIdeas(index)" class="text-left text-[10px] underline whitespace-nowrap font-medium focus:outline-none invisible">
                        <svg v-if="!isTopicSaved[index]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        <svg v-else="isTopicSaved[index]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#FE4442]">
                          <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                        </svg>
                     </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table v-if="currentTabMarketing === 2" class="table min-w-full border divide-gray-300 rounded-lg">
                <thead class="rounded bg-[#414D61] text-white">
                  <tr>
                    <th scope="col" class="rounded-l-lg px-3 py-3.5 text-left text-sm font-semibold">
                      Similar Keywords
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
                      Search Volume
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
                      Overall
                    </th>
                    <th scope="col" class="rounded-r-lg px-3 py-3.5 text-right text-sm font-semibold">

                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr v-for="(keywordData, index) in similar_keywords" :key="index" class="even:bg-[#EFF4FD]">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium whitespace-nowrap sm:pl-3">
                      <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
                        <CheckboxRoot v-model="checkboxOne"
                          class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none">
                          <CheckboxIndicator
                            class="flex items-center justify-center w-full h-full text-white rounded bg-insta">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <span class="select-none font-[16px] text-gray-800">{{ keywordData.keyword }}</span>
                      </label>
                    </td>
                    <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-800">
                      {{ keywordData.monthly_search_volume }}
                    </td>
                    <td class="flex items-center gap-2 px-3 py-4 text-sm whitespace-nowrap">
                      <span class="rounded-full text-white bg-[#FCC42D] px-4 py-0.5 text-[12px] font-bold"> {{ keywordData.difficulty
                      }}</span>
                    </td>
                    <td class="px-4 py-2 text-right">
                      <button @click="saveTopicIdeas(index)" class="text-left text-[10px] underline whitespace-nowrap font-medium focus:outline-none invisible">
                        <svg v-if="!isTopicSaved[index]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        <svg v-else="isTopicSaved[index]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#FE4442]">
                          <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                        </svg>
                     </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Instagram -->
    <div v-else-if="store.currentTab === 1" class="py-5 space-y-4">
      <div class="flex items-center w-full px-4 bg-white rounded-lg outline-none bg-shadow">
        <input id="keyword" type="text" class="w-full py-4 bg-white border-0" placeholder="Fitness" />
        <label for="keyword">
          <MagnifyingGlassIcon class="w-6 h-6 text-gray-400" />
        </label>
      </div>
      <div class="flex flex-col items gap-4 md:flex-row grid md:grid-cols-2">
        <div class="flex-1 w-full px-6 py-8 space-y-2 bg-white md:w-auto bg-shadow rounded-xl">
          <div class="flex items-center">
            <h2 class="text-[20px]"><strong>Overview:</strong> Fitness</h2>
          </div>
          <div class="py-10">
            <div class="relative flex items-center justify-center">
              <img :src="meter" alt="meter" />
              <div class="flex items-center top-24 flex-col absolute">
                <h1 :class="[
                  instaScore <= 20
                    ? 'bg-[#F60000]'
                    : instaScore <= 40
                      ? 'bg-[#F99843]'
                      : instaScore <= 60
                        ? 'bg-[#FCC42D]'
                        : instaScore <= 80
                          ? 'bg-[#9ADD58]'
                          : 'bg-[#4BDE95]',
                  'text-3xl text-white   rounded-full h-20 w-20 flex items-center justify-center font-bold',
                ]">
                  {{ instaScore }}
                </h1>
                <p class="text-xs mt-4 text-[#868E9C]">Overall Score</p>
                <p class="font-bold" v-if="instaScore <= 20">Too Low</p>
                <p class="font-bold" v-else-if="instaScore <= 40">Low</p>
                <p class="font-bold" v-else-if="instaScore <= 60">Medium</p>
                <p class="font-bold" v-else-if="instaScore <= 80">Fit</p>
                <p class="font-bold" v-else-if="instaScore <= 100">Too Fit</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-12">
            <div>
              <div class="text-center space-y-2 relative font-[#868E9C] text-[12px]">
                <p>Search Volume</p>
                <h2 class="text-[24px] font-bold">15,950.2</h2>
                <p class="bg-[#FCC42D] rounded-full px-3 py-2 text-[12px]">
                  Medium
                </p>
                <InformationCircleIcon class="absolute bottom-[95px] left-[95px] w-4 h-4" />
              </div>
            </div>
            <div>
              <div class="text-center space-y-2 relative font-[#868E9C] text-[12px]">
                <p>Competition</p>
                <h2 class="text-[24px] font-bold">61.41</h2>
                <p class="bg-[#F99843] rounded-full px-3 py-2 text-[12px]">
                  Medium
                </p>
                <InformationCircleIcon class="absolute bottom-[95px] left-[95px] w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 w-full px-6 py-8 space-y-2 bg-white md:w-auto bg-shadow rounded-xl">
          <div class="flex items-center">
            <h2 class="text-[20px]"><strong>Detailed Analysis</strong></h2>
          </div>


        </div>
        <div class="flex-1 w-full px-6 py-8 bg-white md:w-auto bg-shadow rounded-xl md:col-span-2">
          <div class="overflow-x-auto scrollbar">
            <div class="w-full min-w-max">
              <table class="table min-w-full border divide-gray-300 rounded-lg">
                <thead class="rounded bg-[#414D61] text-white">
                  <tr>
                    <th scope="col" class="rounded-l-lg px-3 py-3.5 text-left text-sm font-semibold">
                      Similar Keywords
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
                      Search Volume
                    </th>
                    <th scope="col" class="rounded-r-lg px-3 py-3.5 text-left text-sm font-semibold">
                      Overall
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr class="even:bg-[#EFF4FD]">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium whitespace-nowrap sm:pl-3">
                      <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
                        <CheckboxRoot v-model="checkboxOne"
                          class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none">
                          <CheckboxIndicator
                            class="flex items-center justify-center w-full h-full text-white rounded bg-insta">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <span class="select-none font-[16px]">Planet Fitness</span>
                      </label>
                    </td>
                    <td class="px-3 py-4 text-sm whitespace-nowrap">
                      85,571.4
                    </td>
                    <td class="flex items-center gap-2 px-3 py-4 text-sm whitespace-nowrap">
                      <span class="rounded-full text-white bg-[#FCC42D] px-3 py-1 text-[10px]">44</span>
                    </td>
                  </tr>
                  <tr class="even:bg-[#EFF4FD]">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium whitespace-nowrap sm:pl-3">
                      <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
                        <CheckboxRoot v-model="checkboxOne"
                          class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none">
                          <CheckboxIndicator
                            class="flex items-center justify-center w-full h-full text-white rounded bg-insta">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <span class="select-none font-[16px]">Planet Fitness</span>
                      </label>
                    </td>
                    <td class="px-3 py-4 text-sm whitespace-nowrap">
                      85,571.4
                    </td>
                    <td class="flex items-center gap-2 px-3 py-4 text-sm whitespace-nowrap">
                      <span class="rounded-full text-white bg-[#FCC42D] px-3 py-1 text-[10px]">44</span>
                    </td>
                  </tr>
                  <tr class="even:bg-[#EFF4FD]">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium whitespace-nowrap sm:pl-3">
                      <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
                        <CheckboxRoot v-model="checkboxOne"
                          class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none">
                          <CheckboxIndicator
                            class="flex items-center justify-center w-full h-full text-white rounded bg-insta">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <span class="select-none font-[16px]">Fitness</span>
                      </label>
                    </td>
                    <td class="px-3 py-4 text-sm whitespace-nowrap">
                      85,571.4
                    </td>
                    <td class="flex items-center gap-2 px-3 py-4 text-sm whitespace-nowrap">
                      <span class="rounded-full text-white bg-[#FCC42D] px-3 py-1 text-[10px]">44</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Tiktok -->
    <div v-else-if="store.currentTab === 2" class="py-5 space-y-4">
      <div class="flex items-center w-full px-4 bg-white rounded-lg outline-none bg-shadow">
        <input id="keyword" type="text" class="w-full py-4 bg-white border-0" placeholder="Fitness" />
        <label for="keyword">
          <MagnifyingGlassIcon class="w-6 h-6 text-gray-400" />
        </label>
      </div>
      <div class="flex flex-col gap-4 md:flex-row grid md:grid-cols-2">
        <div class="flex-1 w-full px-6 py-8 space-y-2 bg-white md:w-auto bg-shadow rounded-xl">
          <div class="flex items-center">
            <h2 class="text-[20px]"><strong>Overview:</strong> Fitness</h2>
          </div>
          <div class="py-10">
            <div class="relative flex items-center justify-center">
              <img :src="meter" alt="meter" />
              <div class="flex items-center top-24 flex-col absolute">
                <h1 :class="[
                  ttScore <= 20
                    ? 'bg-[#F60000]'
                    : ttScore <= 40
                      ? 'bg-[#F99843]'
                      : ttScore <= 60
                        ? 'bg-[#FCC42D]'
                        : ttScore <= 80
                          ? 'bg-[#9ADD58]'
                          : 'bg-[#4BDE95]',
                  'text-3xl text-white   rounded-full h-20 w-20 flex items-center justify-center font-bold',
                ]">
                  {{ ttScore }}
                </h1>
                <p class="text-xs mt-4 text-[#868E9C]">Overall Score</p>
                <p class="font-bold" v-if="ttScore <= 20">Too Low</p>
                <p class="font-bold" v-if="ttScore <= 40">Low</p>
                <p class="font-bold" v-if="ttScore <= 60">Medium</p>
                <p class="font-bold" v-if="ttScore <= 80">Fit</p>
                <p class="font-bold" v-if="ttScore <= 100">Too Fit</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-12">
            <div>
              <div class="text-center space-y-2 relative font-[#868E9C] text-[12px]">
                <p>Search Volume</p>
                <h2 class="text-[24px] font-bold">15,950.2</h2>
                <p class="bg-[#FCC42D] rounded-full px-3 py-2 text-[12px]">
                  Medium
                </p>
                <InformationCircleIcon class="absolute bottom-[95px] left-[95px] w-4 h-4" />
              </div>
            </div>
            <div>
              <div class="text-center space-y-2 relative font-[#868E9C] text-[12px]">
                <p>Competition</p>
                <h2 class="text-[24px] font-bold">61.41</h2>
                <p class="bg-[#F99843] rounded-full px-3 py-2 text-[12px]">
                  Medium
                </p>
                <InformationCircleIcon class="absolute bottom-[95px] left-[95px] w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 w-full px-6 py-8 space-y-2 bg-white md:w-auto bg-shadow rounded-xl">
          <div class="flex items-center">
            <h2 class="text-[20px]"><strong>Detailed Analysis</strong></h2>
          </div>


        </div>
        <div class="flex-1 w-full px-6 py-8 bg-white md:w-auto bg-shadow rounded-xl md:col-span-2">

          <div class="overflow-x-auto scrollbar">
            <div class="w-full min-w-max">
              <table class="table min-w-full border divide-gray-300 rounded-lg">
                <thead class="rounded bg-[#414D61] text-white">
                  <tr>
                    <th scope="col" class="rounded-l-lg px-3 py-3.5 text-left text-sm font-semibold">
                      Similar Keywords
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
                      Search Volume
                    </th>
                    <th scope="col" class="rounded-r-lg px-3 py-3.5 text-left text-sm font-semibold">
                      Overall
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr class="even:bg-[#EFF4FD]">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium whitespace-nowrap sm:pl-3">
                      <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
                        <CheckboxRoot v-model="checkboxOne"
                          class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none">
                          <CheckboxIndicator
                            class="flex items-center justify-center w-full h-full text-white rounded bg-insta">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <span class="select-none font-[16px]">Planet Fitness</span>
                      </label>
                    </td>
                    <td class="px-3 py-4 text-sm whitespace-nowrap">
                      85,571.4
                    </td>
                    <td class="flex items-center gap-2 px-3 py-4 text-sm whitespace-nowrap">
                      <span class="rounded-full text-white bg-[#FCC42D] px-3 py-1 text-[10px]">44</span>
                    </td>
                  </tr>
                  <tr class="even:bg-[#EFF4FD]">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium whitespace-nowrap sm:pl-3">
                      <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
                        <CheckboxRoot v-model="checkboxOne"
                          class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none">
                          <CheckboxIndicator
                            class="flex items-center justify-center w-full h-full text-white rounded bg-insta">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <span class="select-none font-[16px]">Planet Fitness</span>
                      </label>
                    </td>
                    <td class="px-3 py-4 text-sm whitespace-nowrap">
                      85,571.4
                    </td>
                    <td class="flex items-center gap-2 px-3 py-4 text-sm whitespace-nowrap">
                      <span class="rounded-full text-white bg-[#FCC42D] px-3 py-1 text-[10px]">44</span>
                    </td>
                  </tr>
                  <tr class="even:bg-[#EFF4FD]">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium whitespace-nowrap sm:pl-3">
                      <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
                        <CheckboxRoot v-model="checkboxOne"
                          class="flex h-[16px] border w-[16px] items-center justify-center rounded bg-white outline-none">
                          <CheckboxIndicator
                            class="flex items-center justify-center w-full h-full text-white rounded bg-insta">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <span class="select-none font-[16px]">Fitness</span>
                      </label>
                    </td>
                    <td class="px-3 py-4 text-sm whitespace-nowrap">
                      85,571.4
                    </td>
                    <td class="flex items-center gap-2 px-3 py-4 text-sm whitespace-nowrap">
                      <span class="rounded-full text-white bg-[#FCC42D] px-3 py-1 text-[10px]">44</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import Loader from "@/components/Loader.vue";
import Tabs from "@/components/Tabs.vue";
import { useTab } from "@/store/counter";
import meter from "@/assets/meter.png";
import Pie from "@/components/Pie.vue";
import { ref } from "vue";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import { CheckboxIndicator, CheckboxRoot } from "radix-vue";
import { getRequestApi } from '../helper/api.js';
import { onMounted } from "vue";
const currentTabMarketing = ref(1);
const ytScore = ref(30);
const instaScore = ref(50);
const ttScore = ref(90);
const store = useTab();

onMounted(() => {
  localStorage.removeItem('topic')
});
function changeTabMarketing(tab) {
  currentTabMarketing.value = tab;
}
</script>
<script>
import { getRequestApi } from '../helper/api.js';
import useToastHook from "../hooks/ToastMessage";
const apiErrors = ref([]);
export default {
  data() {
    return {
      textValue: "",
      searchQuery: '',
      showLoader: false,
      similar_keywords: [],
      isTopicSaved: [],
      savedTopic:false,
      DetailAnaylsis: {
        CTR_estimates: 0,
        audience_age: '',
        audience_gender: '',
        top_countries: '',
        difficulty: 0,
        estimated_adsense_earning: 0,
        monthly_search_volume: 0
      }
    };
  },
  created() {
    const { showSuccessToast, showErrorToast } = useToastHook();
    this.showSuccessToast = showSuccessToast;
    this.showErrorToast = showErrorToast;
  },
  computed: {
    audienceDetail() {
      return this.DetailAnaylsis.audience_detail.split(',').map(item => item.trim());
    },
    hasSimilarKeywords() {
      return this.similar_keywords?.length > 0;
    },
    showSavedTopics() {
      return this.isTopicSaved.some(value => value);
    }
  },
  methods: {
    viewSavedTopic(){
      this.savedTopic = !this.savedTopic;
    },
    saveTopicIdeas(index){
      this.isTopicSaved[index] = !this.isTopicSaved[index];
      if (this.isTopicSaved[index]) {
        this.showSuccessToast("Saved");
      }
    },
    capitalizeFirstLetter(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    async start() {
      this.textValueValidationMessage = '';
      this.showLoader = true;
      try {
        const responseData = await getRequestApi("youtube/keyword-research", { keyword: this.textValue });
        this.showLoader = false;
        this.similar_keywords = responseData.similar_keywords;
        this.DetailAnaylsis = {
          CTR_estimates: responseData.CTR_estimates,
          audience_age: responseData.audience_age,
          top_countries: responseData.top_countries,
          audience_gender: responseData.audience_gender,
          difficulty: responseData.difficulty,
          estimated_adsense_earning: responseData.estimated_adsense_earning,
          monthly_search_volume: responseData.monthly_search_volume,
        };
      } catch (error) {
        this.showLoader = false;
        // apiErrors.value.push(error.response.data.message);
      }
      setTimeout(() => {
        apiErrors.value = [];
      }, 2000);
    }
  }
};
const keywordDataDefaults = [
  {keyword : 'Keyword',monthly_search_volume : 'N/A',difficulty : 'N/A'},
  {keyword : 'Keyword',monthly_search_volume : 'N/A',difficulty : 'N/A'},
  {keyword : 'Keyword',monthly_search_volume : 'N/A',difficulty : 'N/A'},
  {keyword : 'Keyword',monthly_search_volume : 'N/A',difficulty : 'N/A'},
  {keyword : 'Keyword',monthly_search_volume : 'N/A',difficulty : 'N/A'},
];
</script>

<style scoped>
.bg-shadow {
  fill: #ffff;
  filter: drop-shadow(0px 10px 30px rgba(227, 235, 249, 0.5));
}
</style>
