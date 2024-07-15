<template>
  <MainLayout>
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
    <div class="">
      <div class="pb-5 space-y-4">
       <div class="grid lg:grid-cols-4 gap-4">
        <div class="md:col-span-3">
          <span v-if="textValueValidationMessage" style="color: red">{{ textValueValidationMessage }}</span>
        <textarea v-model="textValue" placeholder="Paste script"
          class="w-full h-50 px-4 py-4 bg-white outline-none rounded-xl bg-shadow border border-gray-200">
        </textarea>
        </div>
        <!-- /////// -->
        <div class="w-full h-50 px-4 py-4 bg-white outline-none rounded-xl bg-shadow border md:col-span-1">
          <div class="flex flex-col items-baseline gap-2 justify-between">
            <p class="font-medium text-gray-800">Upload Text</p>
            <div class="text-sm text-red-400">
             <span class="text-gray-600">File name:</span> {{ selectedFile?.name }}
            </div>
            <div class="w-full text-end">
              <label for="fileInput" class="text-sm px-[20px] py-[4px] rounded-full bg-red-600 text-white cursor-pointer">
                Browse
                <input id="fileInput" type="file" class="hidden" @change="handleFileChange">
              </label>
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-6">
            <p class="font-medium text-gray-800">Youtube Link</p>
            <input v-model="youtubeLink" class="px-4 py-2 bg-white outline-none rounded-md bg-shadow border" placeholder="https://www.youtube.com/watch?" type="text">
          </div>
        </div>
       </div>
        <div class="flex items-center justify-end">
          <Modal :showLoader="showLoader" />
          <button class="px-[40px] py-[6px] rounded-full bg-youtube text-white" @click="youtubeOptimization()">
            Start
          </button>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <!-- Column 1 -->
          <div class="space-y-4 md:col-span-1">
            <!-- Row 1 -->

            <div class="">
              <div class="flex items-center justify-between">
                <div class="relative flex items-center justify-start gap-2">
                  <h2 class="text-[20px] font-bold">Script score:</h2>
                  <InformationCircleIcon class=" w-5 h-5 text-black left-[140px]" />
                </div>
                <div class="text-center flex items-center gap-x-3">
                  <p class="text-[12px] font-semibold text-gray-800">Overall Score</p>
                  <span v-if="apiResponse && apiResponse.score_out_of_10 !== undefined"
                    class="px-3 py-1 lg:text-[16px] text-[14px] font-bold rounded-full bg-youtube text-white">
                    {{ score.overall }}/10
                  </span>
                  <span v-else
                    class="px-3 py-1 lg:text-[16px] text-[14px] font-bold rounded-full bg-youtube text-white">
                    N/A
                  </span>
                </div>
              </div>
              <div class="min-w-full overflow-hidden">
                <div class="example flex overflow-x-scroll gap-8 items-center justify-between py-2">
                  <div class="p-6 bg-white rounded-xl bg-shadow border w-full text-center">
                    <CircleProgress v-if="score?.clarity" startColor="#ff0000" stopColor="#ffa500"
                      :completedSteps="score?.clarity" :totalSteps="10" text="Clarity" />
                    <CircleProgress v-else startColor="#ff0000" stopColor="#ffa500" :completedSteps="'N/A'"
                      :totalSteps="10" text="Clarity" />
                  </div>
                  <div class="p-6 bg-white rounded-xl bg-shadow border w-full text-center">
                    <CircleProgress v-if="score?.clarity" startColor="#ff0000" stopColor="#ffa500"
                      :completedSteps="score?.originality" :totalSteps="10" text="Originality" />
                    <CircleProgress v-else startColor="#ff0000" stopColor="#ffa500" :completedSteps="'N/A'"
                      :totalSteps="10" text="Originality" />
                  </div>
                  <div class="p-6 bg-white rounded-xl bg-shadow border w-full text-center">
                    <CircleProgress v-if="score?.clarity" startColor="#ff0000" stopColor="#ffa500"
                      :completedSteps="score?.engagement" :totalSteps="10" text="Engagement" />
                    <CircleProgress v-else startColor="#ff0000" stopColor="#ffa500" :completedSteps="'N/A'"
                      :totalSteps="10" text="Engagement" />
                  </div>
                  <div class="p-6 bg-white rounded-xl bg-shadow border w-full text-center">
                    <CircleProgress v-if="score?.clarity" startColor="#ff0000" stopColor="#ffa500"
                      :completedSteps="score?.structure" :totalSteps="10" text="Structure" />
                    <CircleProgress v-else startColor="#ff0000" stopColor="#ffa500" :completedSteps="'N/A'"
                      :totalSteps="10" text="Structure" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="relative w-fit pr-4 flex items-center justify-start gap-2">
                <h2 class="text-[20px] font-bold">Title, Description, Tags, Thumbnail Ideas:</h2>
                <InformationCircleIcon class=" w-5 h-5 text-black right-0" />
              </div>
              <div class="flex items-center justify-end gap-2">
                <button @click="changeTab(1)" :class="[
      'px-3 py-1.5 text-xs border rounded-full',
      currentTab === 1 ? 'bg-youtube text-white' : '',]">
                  Result 1
                </button>
                <button @click="changeTab(2)" :class="[
      'px-3 py-1.5 text-xs border rounded-full',
      currentTab === 2
        ? 'bg-youtube text-white border-[#fe4442]'
        : '',]">
                  Result 2
                </button>
                <button @click="changeTab(3)" :class="[
      'px-3 py-1.5 text-xs border  rounded-full',
      currentTab === 3
        ? 'bg-youtube text-white border-[#fe4442]'
        : '',]">
                  Result 3
                </button>
              </div>
            </div>
            <div class="px-8 py-4 space-y-2 bg-white rounded-xl bg-shadow border">
              <div v-if="currentTab === 1" class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Recommended titles</span>

                  <span class="cursor-pointer" v-clipboard="recommendedTitle1" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  </span>
                </label>
                <div class="w-full">
                  <input disabled :value="recommendedTitle1"
                    class="w-full px-4 py-2 my-2 border border-gray-300 rounded-md outline-none bg-white" />
                </div>
              </div>
              <div v-if="currentTab === 2" class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Recommended titles</span>

                  <span class="cursor-pointer" v-clipboard="recommendedTitle2" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  </span>
                </label>
                <div class="w-full">
                  <input disabled :value="recommendedTitle2"
                    class="w-full px-4 py-2 my-2 border border-gray-300 rounded-md outline-none bg-white" />
                </div>
              </div>
              <div v-if="currentTab === 3" class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Recommended titles</span>

                  <span class="cursor-pointer" v-clipboard="recommendedTitle3" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  </span>
                </label>
                <div class="w-full">
                  <input disabled :value="recommendedTitle3"
                    class="w-full px-4 py-2 my-2 border border-gray-300 rounded-md outline-none bg-white" />
                </div>
              </div>

              <div v-if="currentTab === 1" class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Recommended descriptions</span>
                  <span class="cursor-pointer" v-clipboard="recommendedDescription1" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg> </span></label>
                <div class="w-full">
                  <textarea disabled :value="recommendedDescription1" type="text" name=""
                    class="w-full py-2 pl-4 pr-6 my-2 border border-gray-300 rounded-md bg-white outline-none h-36"
                    placeholder="" id="">
                  </textarea>
                </div>
              </div>
              <div v-if="currentTab === 2" class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Recommended descriptions</span>
                  <span class="cursor-pointer" v-clipboard="recommendedDescription2" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg> </span></label>
                <div class="w-full">
                  <textarea disabled :value="recommendedDescription2" type="text" name=""
                    class="w-full py-2 pl-4 pr-6 my-2 border border-gray-300 rounded-md bg-white outline-none h-36"
                    placeholder="" id="">
                  </textarea>
                </div>
              </div>
              <div v-if="currentTab === 3" class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Recommended descriptions</span>
                  <span class="cursor-pointer" v-clipboard="recommendedDescription3" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  </span>
                  </label>
                <div class="w-full">
                  <textarea disabled :value="recommendedDescription3" type="text" name=""
                    class="w-full py-2 pl-4 pr-6 my-2 border border-gray-300 rounded-md bg-white outline-none h-36"
                    placeholder="" id="">
                  </textarea>
                </div>
              </div>
              <div class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Recommended tags</span>

                  <span class="cursor-pointer" v-clipboard="tags" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  </span>
                </label>

                <div class="flex flex-wrap gap-2">
                  <span v-if="tags.length != 0" v-for="(tag, tagIndex) in tags" :key="tagIndex"
                    class="px-3 py-1 bg-[#EFF4FD] text-gray-500 rounded-full text-[12px] whitespace-nowrap flex">{{ tag }}</span>
                    <span v-else v-for="person in people" :key="person.email"
                    class="px-3 py-1 bg-[#EFF4FD] text-gray-500 rounded-full text-[12px] whitespace-nowrap flex">{{ person.data }}</span>
                </div>
              </div>
              <div v-if="currentTab === 1" class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Thumbnail ideas</span>

                  <span class="cursor-pointer" v-clipboard="recommendedIdea1" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  </span>
                </label>
                <div class="w-full">
                  <input :value="recommendedIdea1" type="text" name=""
                    class="w-full px-4 py-2 my-2 border border-gray-300 rounded-md outline-none bg-white"
                    placeholder=" " id="" />
                </div>
              </div>
              <div v-if="currentTab === 2" class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Thumbnail ideas</span>

                  <span class="cursor-pointer" v-clipboard="recommendedIdea2" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg> </span></label>
                <div class="w-full">
                  <input :value="recommendedIdea2" type="text" name=""
                    class="w-full px-4 py-2 my-2 border border-gray-300 rounded-md outline-none bg-white"
                    placeholder=" " id="" />
                </div>
              </div>
              <div v-if="currentTab === 3" class="py-2">
                <label class="text-[16px] flex items-center justify-between font-semibold text-gray-800" for="title">
                  <span class="font-semibold text-gray-800">Thumbnail ideas</span>

                  <span class="cursor-pointer" v-clipboard="recommendedIdea3" v-clipboard:success="onSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg> </span></label>
                <div class="w-full">
                  <input :value="recommendedIdea3" type="text" name=""
                    class="w-full px-4 py-2 my-2 border border-gray-300 rounded-md outline-none bg-white"
                    placeholder=" " id="" />
                </div>
              </div>

            </div>
            <div>
              <div class="relative flex items-center justify-start gap-2">
                <h2 class="text-[20px] font-bold">Relevant subreddits:</h2>
                <InformationCircleIcon class=" w-5 h-5 text-black right-0" />
              </div>
              <TableLayout>
                <div class="flex items-center gap-2">
                  <!-- <button @click="changeTabMarketing(1)" :class="[
                    'px-3 py-2 text-xs border rounded-full',
                    currentTabMarketing === 1 ? 'bg-youtube text-white' : '',
                  ]">
                    Reddit
                  </button> -->
                  <!-- <button @click="changeTabMarketing(2)" :class="[
                    'px-3 py-2 text-xs border  rounded-full',
                    currentTabMarketing === 2
                      ? 'bg-youtube text-white border-[#fe4442]'
                      : '',
                  ]">
                    Twitter
                  </button>
                  <button @click="changeTabMarketing(3)" :class="[
                    'px-3 py-2 text-xs border  rounded-full',
                    currentTabMarketing === 3
                      ? 'bg-youtube text-white border-[#fe4442]'
                      : '',
                  ]">
                    Threads
                  </button> -->
                </div>
                <div v-if="currentTabMarketing === 1">
                  <RedditContent :apiResponse="apiResponse?.subreddits" />
                </div>
                <!-- <div v-if="currentTabMarketing === 2">
                  <TwitterContent :apiResponse="apiResponse?.tweets" />
                </div>
                <div v-if="currentTabMarketing === 3">
                  <ThreadsContent :apiResponse="apiResponse?.threads" />
                </div> -->
              </TableLayout>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Instagram -->
  </MainLayout>
</template>
<script setup>
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import MainLayout from "../layouts/MainLayout.vue";
import { ref } from "vue";
import { useTab } from "@/store/counter";
import { useMainStore } from "@/store/index";
import Tabs from "@/components/Tabs.vue";
import TableLayout from "../layouts/TableLayout.vue";
import RedditContent from "@/components/RedditContent.vue";
import TwitterContent from "@/components/TwitterContent.vue";
import ThreadsContent from "../components/ThreadsContent.vue";
import { onMounted } from "vue";
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "@/components/CircleProgress.vue";
import useToastHook from "../hooks/ToastMessage";
import { postRequest } from "../helper/api.js";
import Modal from "@/components/Loader.vue";
import isSubscribedAlert from "@/components/IsSubscribed.vue";

const storeContent = useMainStore();
const { showSuccessToast, showErrorToast } = useToastHook();
const currentTab = ref(1);
const currentTabMarketing = ref(1);
const textValue = ref(storeContent.scriptContentGenerator);
const apiResponse = ref(null);
const textValueValidationMessage = ref("");
const showLoader = ref(false);
const apiErrors = ref([]);
const recommendedTitle1 = ref('');
const recommendedTitle2 = ref('');
const recommendedTitle3 = ref('');
const recommendedDescription1 = ref('');
const recommendedDescription2 = ref('');
const recommendedDescription3 = ref('');
const recommendedIdea1 = ref('');
const recommendedIdea2 = ref('');
const recommendedIdea3 = ref('');
const selectedFile = ref(null);
const youtubeLink = ref('');
const allresults = ref([]);
const result1 = ref({});
const result2 = ref({});
const result3 = ref({});
const tags = ref([]);
const score = ref({});
function changeTab(tab) {
  currentTab.value = tab;
}
function changeTabMarketing(tab) {
  currentTabMarketing.value = tab;
}
const onSuccess = () => {
  showSuccessToast("Copied");
};
const handleFileChange = (event) => {
    const file = event.target.files[0];
    selectedFile.value = file;
  };
const people = [
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
  { data : 'Youtube Tag' },
];
async function youtubeOptimization() {
  if (!textValue.value.trim()) {
    textValueValidationMessage.value = "Please write a script";
    return;
  }
  textValueValidationMessage.value = "";
  showLoader.value = true;

  let completedRequests = 0;

  try {
    const formData = new FormData();
    formData.append("script", textValue.value);
    formData.append("link", youtubeLink.value ? String(youtubeLink.value) : null);
    if (selectedFile.value) {
      formData.append("file", selectedFile.value);
    }

    const optimizationResponse = await postRequest("youtube/optimization", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    allresults.value = optimizationResponse.results;
    score.value = optimizationResponse.score_out_of_10;
    result1.value = optimizationResponse.results[0];
    result2.value = optimizationResponse.results[1];
    result3.value = optimizationResponse.results[2];
    tags.value = optimizationResponse.results.tags;
    apiResponse.value = optimizationResponse.subreddits;
    recommendedTitle1.value = result1.value.title
    recommendedTitle2.value = result2.value.title
    recommendedTitle3.value = result3.value.title
    recommendedDescription1.value = result1.value.description
    recommendedDescription2.value = result2.value.description
    recommendedDescription3.value = result3.value.description
    recommendedIdea1.value = result1.value.thumbnail_idea
    recommendedIdea2.value = result2.value.thumbnail_idea
    recommendedIdea3.value = result3.value.thumbnail_idea
    // showLoader.value = false;
    storeContent.$patch((state) => {
      state.YoutubeoptimizationResponse = optimizationResponse
      state.scriptContentGenerator = textValue.value
      state.youtubeLink = youtubeLink.value
      })
    // return;
    if (optimizationResponse.message) {
      textValueValidationMessage.value = optimizationResponse.message;
    } else {
      apiResponse.value = optimizationResponse;
    }
    completedRequests++;
  } catch (error) {
    completedRequests++;
  }

  if (completedRequests === 1) {
    showLoader.value = false;
  }

  setTimeout(() => {
    apiErrors.value = [];
  }, 2000);
}
onMounted(() => {
  if(storeContent.YoutubeoptimizationResponse) {
    allresults.value = storeContent.YoutubeoptimizationResponse.results;
    score.value = storeContent.YoutubeoptimizationResponse.score_out_of_10;
    result1.value = storeContent.YoutubeoptimizationResponse.results[0];
    result2.value = storeContent.YoutubeoptimizationResponse.results[1];
    result3.value = storeContent.YoutubeoptimizationResponse.results[2];
    tags.value = storeContent.YoutubeoptimizationResponse.results.tags;

    recommendedTitle1.value = result1.value.title
    recommendedTitle2.value = result2.value.title
    recommendedTitle3.value = result3.value.title
    recommendedDescription1.value = result1.value.description
    recommendedDescription2.value = result2.value.description
    recommendedDescription3.value = result3.value.description
    recommendedIdea1.value = result1.value.thumbnail_idea
    recommendedIdea2.value = result2.value.thumbnail_idea
    recommendedIdea3.value = result3.value.thumbnail_idea
    // showLoader.value = false;
    youtubeLink.value = storeContent.youtubeLink

    // return;
    if (storeContent.YoutubeoptimizationResponse.message) {
      textValueValidationMessage.value = storeContent.YoutubeoptimizationResponse.message;
    } else {
      apiResponse.value = storeContent.YoutubeoptimizationResponse;
    }
  }
})
</script>
