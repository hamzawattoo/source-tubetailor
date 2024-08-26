<template>
  <MainLayout>
    <div class="flex items-center justify-between pb-2">
      <h1 class="text-gray-500 text-sm">This List is automatically refreshed every 7 days. Save the competitors that you want to track.</h1>
      <div>
        <button @click="viewSavedCompetitors" class="text-sm font-medium text-end text-red-500">
          {{ savedTopic ? 'View All Competitors' : 'View Saved Competitors' }}
        </button>
      </div>
    </div>
    <TableLayout v-if="!savedTopic" class="!mt-0">
      <div class="py-2 overflow-x-auto scrollbar">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <!-- Table header -->
            <tr class="bg-[#414D61] text-white">
              <th class="rounded-l-lg rounded-tl-lg whitespace-nowrap px-4 py-2 text-left text-[13px] font-medium">
                Channel
              </th>
              <th class="py-2 text-left whitespace-nowrap px-4 text-[13px] font-medium text-center">
                Total uploads
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-[13px] font-medium text-center">
                Total views
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-[13px] font-medium text-center">
                Subscribers
              </th>
              <th class="rounded-r-lg px-4 py-2 whitespace-nowrap text-left text-[13px] font-medium"></th>
            </tr>
            <!-- Table body -->
            <tr v-for="(competitor, index) in competitors" :key="index" class="py-2 rounded-lg border-b border-gray-400 text-gray-500">
              <td class="px-4 py-2.5 text-[13px] whitespace-nowrap">
                <div class="flex items-center justify-start gap-4">
                  <img class="w-16 h-16 rounded-full object-cover" :src="competitor.thumbnails.high.url" alt="">
                  <span class="text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">{{ competitor.username }}</span>
                </div>
              </td>
              <td class="px-4 text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">
                {{ competitor.uploads }}
              </td>
              <td class="px-4 text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">
                {{ competitor.views }}
              </td>
              <td class="px-4 text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">
                {{ competitor.subscribers }}ss
              </td>
              <td class="px-4 py-2 text-end">
                <button @click="toggleSaveCompetitor(competitor)" class="text-left text-[10px] underline whitespace-nowrap font-medium focus:outline-none">
                  <svg v-if="isCompetitorSaved(competitor.uuid)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#FE4442]">
                    <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </TableLayout>
    <TableLayout v-if="savedTopic" class="!mt-0">
      <div class="py-2 overflow-x-auto scrollbar">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <!-- Table header -->
            <tr class="bg-[#414D61] text-white">
              <th class="rounded-l-lg rounded-tl-lg whitespace-nowrap px-4 py-2 text-left text-[13px] font-medium">
                Channel
              </th>
              <th class="py-2 text-left whitespace-nowrap px-4 text-[13px] font-medium text-center">
                Total uploads
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-[13px] font-medium text-center">
                Total views
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-[13px] font-medium text-center">
                Subscribers
              </th>
              <th class="rounded-r-lg px-4 py-2 whitespace-nowrap text-left text-[13px] font-medium"></th>
            </tr>
            <!-- Table body -->
            <tr v-for="(item, index) in savedCompetitors" :key="index" class="py-2 rounded-lg border-b border-gray-400 text-gray-500">
              <td class="px-4 py-2.5 text-[13px] whitespace-nowrap">
                <div class="flex items-center justify-start gap-4">
                  <img class="w-16 h-16 rounded-full object-cover" :src="parseContent(item.content).thumbnails?.high?.url" alt="">
                  <span class="text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">{{ parseContent(item.content).username }}</span>
                </div>
              </td>
              <td class="px-4 text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">
                {{ parseContent(item.content).uploads }}
              </td>
              <td class="px-4 text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">
              {{ parseContent(item.content).views }}
              </td>
              <td class="px-4 text-[13px] whitespace-nowrap text-gray-800 font-medium text-center">
               {{ parseContent(item.content).subscribers }}
              </td>
              <td class="px-4 py-2 text-end">
                <button @click="deleteSavedItem(item.id)" class="text-left text-[10px] underline whitespace-nowrap font-medium focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#FE4442]">
                    <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </TableLayout>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import TableLayout from "@/layouts/TableLayout.vue";
import useToastHook from "../hooks/ToastMessage";
import { ref, onMounted } from 'vue';
import axios from 'axios';

const competitors = ref([]);
  const savedCompetitors = ref([]);
  const uuidList = ref([]);
  const savedTopic = ref(false);
  const { showSuccessToast, showErrorToast } = useToastHook();

  const fetchCompetitors = async () => {
    try {
      const response = await axios.get('/youtube/competitors');
      competitors.value = response.data.competitors;
      isCompetitorSaved(response.data.wishlist.uuid)
      fetchSavedCompetitors(); 
    } catch (error) {
      showErrorToast("Failed to fetch competitors");
    }
  };

  const toggleSaveCompetitor = async (competitor) => {
    if (isCompetitorSaved(competitor.uuid)) {
      await deleteSavedItem(competitor.uuid);
    } else {
      await saveCompetitor(competitor);
    }
  };

 const saveCompetitor = async (competitor) => {
    try {
      const response = await axios.post('wishlist', {
        category: 'competitor',
        uuid: competitor.uuid,
        content: JSON.stringify(competitor),
      });

      if (response.data.message !== "You have reached your save limit.") {
        uuidList.value.push(competitor.uuid);
        showSuccessToast("Competitor saved successfully.");
        fetchSavedCompetitors(); 
      } else {
        showErrorToast("You have reached your save limit.");
      }
    } catch (error) {
      console.error("Error saving competitor:", error);
      showErrorToast("Already Saved.");
    }
  };

  const fetchSavedCompetitors = async () => {
    try {
      const response = await axios.get('wishlist', { params: { category: 'competitor' } });
      savedCompetitors.value = response.data.wishlist;
      uuidList.value = savedCompetitors.value.map(item => parseContent(item.content).uuid);
    } catch (error) {
      showErrorToast('Nothing in Saved.');
    }
  };




const deleteSavedItem = async (uuid) => {
    try {
      await axios.delete(`wishlist/${uuid}`);
      uuidList.value = uuidList.value.filter(id => id !== uuid);
      showSuccessToast("Successfully deleted.");
      fetchSavedCompetitors();
    } catch (error) {
      showErrorToast("Failed to delete saved competitor.");
    }
  };

  const isCompetitorSaved = (uuid) => {
    return uuidList.value.includes(uuid);
  };

  const viewSavedCompetitors = () => {
    savedTopic.value = !savedTopic.value;
    fetchSavedCompetitors();
  };

  const parseContent = (content) => {
    return JSON.parse(content);
  };

  onMounted(() => {
    fetchCompetitors();
  });
</script>
