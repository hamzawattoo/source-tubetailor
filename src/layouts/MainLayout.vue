<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="relative flex flex-1 w-full max-w-xs mr-16">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 flex justify-center w-16 pt-5 left-full">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex flex-col px-6 pb-4 overflow-y-auto bg-white grow gap-y-5">
                <div class="flex items-center h-16 shrink-0">
                  <img class="w-auto h-12" :src="Logo" alt="Your Company" />
                </div>
                <nav class="flex flex-col flex-1">
                  <ul role="list" class="flex flex-col flex-1 gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <router-link :to="item.href" :class="[
      item.current
        ? 'bg-gray-50 text-indigo-600'
        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
    ]">
                            <component :is="item.icon" :class="[
      item.current
        ? 'text-indigo-600'
        : 'text-gray-400 group-hover:text-indigo-600',
      'h-6 w-6 shrink-0',
    ]" aria-hidden="true" />
                            {{ item.name }}
                          </router-link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="example flex flex-col px-6 py-4 pb-4 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
        <router-link to="/" class="flex items-center h-16 shrink-0">
          <img class="w-auto h-16" :src="Logo" alt="Your Company" />
        </router-link>  

        <nav class="flex flex-col flex-1">
          <ul role="list" class="flex flex-col items-start mt-4 gap-y-7">
            <!-- <li class="w-full">
              <Tabs />
            </li> -->
            <li class="w-full">
              <ul role="list" class="-mx-2 space-y-2">
                <li v-for="item in navigation" :key="item.name">
                  <router-link :to="item.href" :class="[
      item.current
        ? 'bg-[#EFF4FD] text-black'
        : 'text-black hover:text-black hover:bg-hover',
      'group flex gap-x-3 rounded-md pl-4 py-2 text-[16px] leading-6 font-normal',
    ]">
                    <component :is="item.icon" :class="[
      item.current
        ? 'text-gray-900'
        : 'text-gray-900 group-hover:text-gray-900',
      'h-6 w-6 shrink-0',
    ]" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72 bg">
      <div class="top-0 z-40 flex items-center h-24 px-4 shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <!-- Separator -->

        <div class="flex items-center self-stretch flex-1 bg-transparent border-b-2 lg:border-b-0 gap-x-4 lg:gap-x-6">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <button v-if="store.headline !== 'Dashboard'" @click="goBack">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
              </button>
              <h1 class="text-[20px] lg:block hidden font-extrabold">
                {{ store.headline }}
              </h1>
            </div>
            <img class="w-auto h-10 rounded-full lg:hidden" :src="smallLogo" alt="" />
          </div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>

                <img class="w-8 h-8 rounded-full bg-gray-50" v-if="user"
                  :src="user.avatar ?? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'"
                  alt="" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4 ml-2 lg:hidden">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" v-if="user" aria-hidden="true">{{user.firstname}} {{user.lastname}}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </MenuButton>
              <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <template v-if="item.id === 'adminDashboard' && user?.is_admin == 1">
                      <router-link to="/adminDashboard" :class="['block px-3 py-1 text-sm leading-6 text-gray-900', active ? 'bg-gray-50' : '']">
                         Admin Panel
                      </router-link>
                    </template>
                    <template v-else-if="item.id === 'signout'">
                      <button @click="signout" :class="['block px-3 py-1 text-sm leading-6 text-gray-900', active ? 'bg-gray-50' : '']">
                        {{ item.name }}
                      </button>
                    </template>
                    <template v-else>
                      <router-link :to="item.href" :class="['block px-3 py-1 text-sm leading-6 text-gray-900', active ? 'bg-gray-50' : '']">
                        {{ item.name }}
                      </router-link>
                    </template>
                  </MenuItem>

                </MenuItems>  
              </transition>
            </Menu>
            <button type="button" class="-m-2.5 md:p-2.5 p-1.5 text-[#414D61] bg-[#EFF4FD] rounded-lg lg:hidden"
              @click="sidebarOpen = true">
              <span class="sr-only">Open sidebar</span>
              <Bars3Icon class="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <main class="w-full min-h-screen pb-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <isSubscribedAlert class="mb-4" /> 
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import Logo from "@/assets/Logo.png";
import smallLogo from "@/assets/smallLogo.png";
import Modal from "@/components/Modal.vue";
import { ref, onMounted, computed } from "vue";
import Tabs from "@/components/Tabs.vue";
import isSubscribedAlert from "@/components/isSubscribed.vue";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import DashSVG from "@/svgs/DashSVG.vue";
import DollarSVG from "@/svgs/DollarSVG.vue";
import Marketing from "@/svgs/Marketing.vue";
import Competitors from "@/svgs/competitors.vue";
import OptSVG from "@/svgs/OptSVG.vue";
import { useRouter } from "vue-router";
import { useHeadline } from "../store/Headline";
import { getUserDetail } from "../helper/api.js";
import {logout} from "../helper/api";
import { eventBus } from '../store/eventBus.js';

function handleReRender() {
  user.value = JSON.parse(localStorage.getItem('user'));
}
onMounted(() => {
  eventBus.$on('reRenderComponentB', handleReRender);
});
const store = useHeadline();
const show = ref(false);
const router = useRouter();
const currentRoute = ref(router.currentRoute.value.path);
const user = ref(null);

function showModal() {
  this.show = !this.show;
};

onMounted(() => {

  const currentRoute0 = currentRoute.value;
  if (currentRoute0 === "/dashboard") {
    store.setHeadline("Dashboard");
  } else if (currentRoute0 === "/optimization") {
    store.setHeadline("Optimization");
  } else if (currentRoute0 === "/keyword-research") {
    store.setHeadline("Keyword Research");
  } else if (currentRoute0 === "/competitors") {
    store.setHeadline("Competitors");
  } else if (currentRoute0 === "/history") {
    store.setHeadline("History");
  } else if (currentRoute0 === "/competition") {
    store.setHeadline("Competition");
  } else if (currentRoute0 === "/content-generator") {
    store.setHeadline("Content Generator");
  } else if (currentRoute0 === "/community-tools") {
    store.setHeadline("Community Tools");
  } else if (currentRoute0 === "/account-Settings") {
    store.setHeadline("Account Settings");
  } else if (currentRoute0 === "/pricing-plans") {
    store.setHeadline("Pricing Plans");
  }


  router.afterEach((to, from) => {
    currentRoute.value = to.path;
  });

});


async function signout() {
  await logout()
  localStorage.removeItem('isSubscribed');
  window.location.href = "/";
};


const goBack = () => {
    window.history.back();
};
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: DashSVG,
    current: currentRoute.value === "/dashboard",
  },
  {
    name: "Optimization",
    href: "/optimization",
    icon: OptSVG,
    current: currentRoute.value === "/optimization",
  },
  {
    name: "Keyword Research",
    href: "keyword-research",
    icon: DollarSVG,
    current: currentRoute.value === "/keyword-research",
  },
  {
    name: "Content Generator",
    href: "/content-generator",
    icon: Marketing,
    current: currentRoute.value === "/content-generator",
  },
  {
    name: "Competitors",
    href: "/competitors",
    icon: Competitors,
    current: currentRoute.value === "/competitors",
  },
  {
    name: "History",
    href: "/history",
    icon: CalendarIcon,
    current: currentRoute.value === "/history",
  },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const userNavigation = [
  { name: "Your profile", href: "/account-Settings" },
  { name: "Sign out", href: "#", id:"signout" },
  { name:null, href: '/adminDashboard', id: 'adminDashboard'   },
  ];

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user'));
});
const sidebarOpen = ref(false);
</script>
