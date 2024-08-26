<template>
  <div class="mt-4 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
    <h2 class="relative text-xl font-bold">
      Topics Ideas:
      <span class="text-sm font-medium text-gray-600">Based on your niche</span>
      <InformationCircleIcon class="absolute left-72 top-1 w-6 h-6" />
    </h2>
    <div class="w-full sm:w-auto text-end mt-2 sm:mt-0">
      <button @click="toggleSavedTopic" class="text-sm font-medium text-red-500">
        {{ savedTopic ? 'View Topic Ideas' : 'Saved Topic Ideas' }}
      </button>
    </div>
  </div>

  <TableLayout>
    <div class="py-2 overflow-x-auto scrollbar">
      <div class="relative overflow-x-auto">
        <template v-if="topicIdeas.length > 0">
          <table v-if="!savedTopic" class="w-full text-sm text-gray-500">
            <thead>
              <tr class="bg-[#414D61] text-white">
                <th class="rounded-l-lg rounded-tl-lg px-4 py-2 text-left text-[13px] font-medium">Title</th>
                <th class="px-4 py-2 text-[13px] font-medium text-center">Keyword</th>
                <th class="px-4 py-2 text-[13px] font-medium text-center">Keyword Difficulty</th>
                <th class="px-4 py-2 text-[13px] font-medium text-center">Monthly Search Volume</th>
                <th class="px-4 py-2 text-left text-[13px] font-medium"></th>
                <th class="rounded-r-lg px-4 py-2 text-left text-[13px] font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(idea, index) in topicIdeas" :key="index" class="border-b border-gray-400 text-gray-800">
                <td class="px-4 py-3.5 text-[13px] font-medium">{{ idea.topic }}</td>
                <td class="px-4 py-3.5 text-center">
                  <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold">{{ idea.keyword }}</span>
                </td>
                <td class="px-4 py-3.5 text-center text-[13px] font-medium">{{ idea.topic_difficulty }}</td>
                <td class="px-4 py-3.5 text-center text-[13px] font-medium">{{ idea.monthly_search_volume }}</td>
                <td class="px-4 py-3.5">
                  <button @click="contentExport(idea.topic)" class="text-[10px] text-[#304dc2] underline font-medium">
                    Export to content generator
                  </button>
                </td>
                <td class="px-4 py-2">
                  <button @click="saveTopic(idea)" class="text-[10px] underline font-medium focus:outline-none">
                    <svg v-if="!uuidList.includes(idea.uuid)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#FE4442]">
                      <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <table v-else class="w-full text-sm text-gray-500">
            <thead>
              <tr class="bg-[#414D61] text-white">
                <th class="rounded-l-lg rounded-tl-lg px-4 py-2 text-left text-[13px] font-medium">Title</th>
                <th class="px-4 py-2 text-[13px] font-medium text-center">Keyword</th>
                <th class="px-4 py-2 text-[13px] font-medium text-center">Keyword Difficulty</th>
                <th class="px-4 py-2 text-[13px] font-medium text-center">Monthly Search Volume</th>
                <th class="px-4 py-2 text-left text-[13px] font-medium"></th>
                <th class="rounded-r-lg px-4 py-2 text-left text-[13px] font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in savedItemsCollection.wishlist" :key="item.id" class="border-b border-gray-400 text-gray-800">
                <td class="px-4 py-3.5 text-[13px] font-medium">{{ parseContent(item.content).topic }}</td>
                <td class="px-4 py-3.5 text-center">
                  <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold">{{ parseContent(item.content).keyword }}</span>
                </td>
                <td class="px-4 py-3.5 text-center text-[13px] font-medium">{{ parseContent(item.content).topic_difficulty }}</td>
                <td class="px-4 py-3.5 text-center text-[13px] font-medium">{{ parseContent(item.content).monthly_search_volume }}</td>
                <td class="px-4 py-3.5">
                  <button @click="contentExport(parseContent(item.content).topic)" class="text-[10px] text-[#304dc2] underline font-medium">
                    Export to content generator
                  </button>
                </td>
                <td class="px-4 py-2">
                  <button @click="deleteSavedItem(item.id)" class="text-[10px] underline font-medium focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#FE4442]">
                      <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>

        <template v-else>
          <p class="text-[13px] text-red-600">Sorry! Unable to produce topic ideas. Unclear channel earlier uploads. {{ errorMsg }}</p>
        </template>
      </div>
    </div>
  </TableLayout>
</template>


<script>
import TableLayout from "@/layouts/TableLayout.vue";
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import axios from 'axios';
import useToastHook from "../hooks/ToastMessage";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://backend.tubetailor.ai/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default {
  components: {
    TableLayout,
    InformationCircleIcon,
  },
  data() {
    return {
      topicIdeas: [],
      errorMsg: "",
      isTopicSaved: [],
      savedTopic: false,
      savedItemsCollection: {},
      uuidList: []
    };
  },
  computed: {
    showSavedTopics() {
      return this.isTopicSaved.includes(true);
    }
  },
  created() {
    const { showSuccessToast, showErrorToast } = useToastHook();
    this.showSuccessToast = showSuccessToast;
    this.showErrorToast = showErrorToast;
  },
  methods: {
    toggleSavedTopic() {
      this.savedTopic = !this.savedTopic;
    },
    toggleSaveTopic(index) {
      this.isTopicSaved[index] = !this.isTopicSaved[index];
      if (this.isTopicSaved[index]) {
        this.showSuccessToast("Saved");
      }
    },
    async saveTopic(idea) {
      try {
        const response = await axios.post('wishlist', {
          category: 'topic_idea',
          uuid: idea.uuid,
          content: JSON.stringify(idea),
        });

        if (response.data.message !== "You have reached your save limit.") {
          this.uuidList.push(idea.uuid);
          this.showSuccessToast("Topic saved successfully.");
          this.fetchSavedItems(); 
        } else {
          this.showErrorToast("You have reached your save limit.");
        }
      } catch (error) {
        console.error("Error saving topic:", error);
        this.showErrorToast("Failed to save topic.");
      }
    },
    async fetchSavedItems() {
      try {
        this.toggleSavedTopic();
        const response = await axios.get('wishlist', { params: { category: 'topic_idea' } });
        this.savedItemsCollection = response.data;
        this.uuidList = this.savedItemsCollection.wishlist.map(item => item.uuid);
      } catch (error) {
        this.showErrorToast("Failed to load saved items.");
      }
    },
    async deleteSavedItem(idForDelete) {
      try {
        await axios.delete(`wishlist/${idForDelete}`);
        this.showSuccessToast("Item successfully deleted from saved items.");
        this.fetchSavedItems(); // Refresh the saved items list
      } catch (error) {
        this.showErrorToast("Failed to delete saved item.");
      }
    },
    parseContent(content) {
      return JSON.parse(content);
    },
    async fetchTopicIdeas() {
      try {
        const cachedData = this.getCachedData();

        if (cachedData) {
          this.topicIdeas = cachedData.topicIdeas;
          this.errorMsg = cachedData.errorMsg;
          this.fetchSavedItems();
        } else {
          await this.retryFetchTopicIdeas();
        }
      } catch (error) {
        console.error("Error fetching topic ideas:", error);
        this.errorMsg = "Error fetching topic ideas. Please try again later.";
      }
    },
    getCachedData() {
      const cachedData = localStorage.getItem('cachedTopicIdeas');
      const cachedTimestamp = localStorage.getItem('topicIdeasTimestamp');

      if (cachedData && cachedTimestamp && this.isWithin24Hours(cachedTimestamp)) {
        return JSON.parse(cachedData);
      }
      return null;
    },
    async retryFetchTopicIdeas() {
      const maxRetries = 5;
      let attempts = 0;

      while (attempts < maxRetries) {
        try {
          const response = await axios.get('youtube/topic-ideas');
          const data = response.data;

          if (data.message?.includes("Channel must have uploads")) {
            this.errorMsg = data.message;
          } else if (data.topic_ideas) {
            this.topicIdeas = data.topic_ideas;
            this.cacheData();
            return;
          } else {
            console.error('Unexpected API response structure:', data);
          }
        } catch (error) {
          attempts++;
          console.error(`Retry attempt ${attempts} failed:`, error);
          if (attempts < maxRetries) await this.delay(2000);
        }
      }

      this.errorMsg = "Failed to fetch topic ideas after multiple attempts.";
    },
    cacheData() {
      localStorage.setItem('cachedTopicIdeas', JSON.stringify({
        topicIdeas: this.topicIdeas,
        errorMsg: this.errorMsg,
      }));
      localStorage.setItem('topicIdeasTimestamp', new Date().toISOString());
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    isWithin24Hours(timestamp) {
      const hoursDifference = (new Date() - new Date(timestamp)) / (1000 * 60 * 60);
      return hoursDifference <= 24;
    },
    contentExport(value) {
      localStorage.setItem('topic', value);
      this.$router.push({ path: '/content-generator' });
    }
  },
  mounted() {
    this.fetchTopicIdeas();
  },
};
</script>
