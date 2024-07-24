<template>
  <div class="mt-4">
    <h2 class="text-xl font-bold">
              Analytics:
    </h2>
  </div>
  <TableLayout>
    <div class="">
      <div class="flex flex-wrap items-center justify-between overflow-x-auto sm:space-y-3 lg:space-y-0 lg:space-x-4">
        <div class="relative">
          <span class="absolute right-0 -top-2">
            <InformationCircleIcon class="absolute w-4 h-4" />
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="changeTab(1)"
            :class="['px-3 py-1 text-xs border rounded-full', currentTab === 1 ? 'bg-youtube text-white' : 'border-gray-600']"
          >
            1 Day
          </button>
          <button
            @click="changeTab(2)"
            :class="['px-3 py-1 text-xs border  rounded-full', currentTab === 2 ? 'bg-youtube text-white border-[#fe4442]' : 'border-gray-600']"
          >
            15 Days
          </button>
          <button
            @click="changeTab(3)"
            :class="['px-3 py-1 text-xs border  rounded-full', currentTab === 3 ? 'bg-youtube text-white border-[#fe4442]' : 'border-gray-600']"
          >
            30 Days
          </button>
        </div>
      </div>
      <div class="py-2 overflow-x-auto scrollbar">
        <div class="w-full min-w-max">
          <table v-if="!isLoading && projects.length > 0" class="w-full overflow-hidden bg-white rounded-lg">
            <thead class="bg-[#414D61] text-left text-white">
              <tr>
                <th class="px-4 py-2 text-sm font-medium rounded-bl-lg">Top performer</th>
                <th class="px-4 py-2 text-sm font-medium">Views</th>
                <th class="px-4 py-2 text-sm font-medium">Watch time</th>
                <th class="px-4 py-2 text-sm font-medium">Subscribers</th>
                <th class="px-4 py-2 text-sm font-medium">Likes (vs Dislikes)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(project, index) in projects" :key="index">
                <td class="px-4 py-2 text-[13px]">{{ project.top }}</td>
                <td class="px-4 py-2 text-[24px] font-semibold text-[#FE4442]">{{ project.views }}</td>
                <td class="px-4 py-2 text-[24px] font-semibold text-[#FE4442]">{{ project.watchTime }}</td>
                <td class="px-4 py-2 text-[24px] font-semibold text-[#FE4442]">+
                  {{ project.subscribersGained }}
                </td>
                <td class="px-4 py-2 text-[14px] font-medium text-gray-700 flex flex-col text-center">
                  <div class="flex items-center justify-center gap-3 mt-1">
                    <span class="flex justify-end gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                    </svg>

                      {{ project.likes }}
                    </span>
                  <span class="flex justify-end gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                      </svg>
                    {{ project.disLikes }}</span>
                  </div>
                  <span>{{ project.likes_vs_dislikes }}</span>
                </td>
              </tr>
              
            </tbody>
          </table>
          <div v-if="isLoading">
                <dt colspan="4" class="px-4 py-2 text-center font-normal">Loading...</dt>
          </div>
        </div>
      </div>
    </div>
  </TableLayout>
</template>

<style>
.scrollbar::-webkit-scrollbar {
  height: 3.46px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #fe4442;
  border-radius: 12px;
  width: 2px;
}
.scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
</style>

<script>
import TableLayout from "@/layouts/TableLayout.vue";
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import { getRequestApi } from '../helper/api.js';

export default {
  components: {
    InformationCircleIcon
  },
  data() {
    return {
      currentTab: 1,  
      tabs: [1, 2, 3],
      projects: '',
      isLoading: false,
      isErrorShowing : false,
      performerCurrentTab:'',
      apiError:'',
    };
  },
  methods: {
  async fetchYoutubeTopPerformers() {
  this.isLoading = true;

  const cachedData = localStorage.getItem(`youtubeTopPerformers_${this.currentTab}`);
  const cachedTimestamp = localStorage.getItem(`youtubeTopPerformersTimestamp_${this.currentTab}`);
  this.performerCurrentTab = localStorage.getItem(`youtubeTopPerformers_${this.currentTab}`);
  if (cachedData && cachedTimestamp && this.isWithin24Hours(cachedTimestamp)) {
    this.projects = JSON.parse(cachedData);
    this.isLoading = false;
    return;
  }
  if (!cachedData || JSON.parse(cachedData).length === 0) {
    this.isErrorShowing = true;
  }

  let lastNumberOfDays = '';

  if (this.currentTab === 1) {
    lastNumberOfDays = 7;
  } else if (this.currentTab === 2) {
    lastNumberOfDays = 15;
  } else if (this.currentTab === 3) {
    lastNumberOfDays = 30;
  }

  const apiUrl = 'youtube/top-performer';
  const queryParams = { last_number_of_days: lastNumberOfDays };

  try {
    const responseData = await getRequestApi(apiUrl, queryParams);
    console.log('API Response Data:', responseData); // Log API response data
    if ('message' in responseData) {
      this.apiError = responseData.message; // Set apiError if 'message' property exists
    } else {
      this.apiError = ''; // Clear apiError if no error message
    }

    this.isLoading = false;

    if (Array.isArray(responseData)) {
      this.projects = responseData.map(project => ({
        id: project.id,
        top: project.top_performer.video_title,
        views: project.top_performer.views,
        watchTime: project.top_performer.watch_time,
        subscribersGained: project.top_performer.subscribers_gained,
        likes: project.top_performer.likes,
        disLikes: project.top_performer.dislikes,
        likes_vs_dislikes: project.top_performer.likes_vs_dislikes,
      }));

      localStorage.setItem(`youtubeTopPerformers_${this.currentTab}`, JSON.stringify(this.projects));
      localStorage.setItem(`youtubeTopPerformersTimestamp_${this.currentTab}`, new Date().toISOString());
    } else if (typeof responseData === 'object' && responseData !== null) {
      this.projects = [{
        id: responseData.id,
        top: responseData?.top_performer?.video_title,
        views: responseData?.top_performer?.views,
        watchTime: responseData?.top_performer?.watch_time,
        subscribersGained: responseData?.top_performer?.subscribers_gained,
        likes: responseData?.top_performer?.likes,
        disLikes: responseData?.top_performer?.dislikes,
        likes_vs_dislikes: responseData?.top_performer?.likes_vs_dislikes,
      }];

      localStorage.setItem(`youtubeTopPerformers_${this.currentTab}`, JSON.stringify(this.projects));
      localStorage.setItem(`youtubeTopPerformersTimestamp_${this.currentTab}`, new Date().toISOString());
    } else {
      console.error('Invalid API response format:', responseData);
    }
  } catch (error) {
    this.isLoading = false;
    console.error('Error in fetching data:', error); // Log error message
  }
},
    isWithin24Hours(timestamp) {
      const now = new Date();
      const storedTimestamp = new Date(timestamp);
      const differenceInMilliseconds = now - storedTimestamp;
      const hoursDifference = differenceInMilliseconds / (1000 * 60 * 60);
      return hoursDifference <= 24;
    },
    changeTab(tabNumber) {
      this.currentTab = tabNumber;
      this.fetchYoutubeTopPerformers();
    },
  },
  created() {
    this.fetchYoutubeTopPerformers();
  },
  components: { TableLayout },
};
</script>
