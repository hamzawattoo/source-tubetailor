<template>
  <div class="" id="main_content">
    <header class="site-header header-two header_trans-fixed" data-top="992">
      <div class="max-w-7xl mx-auto px-4">
        <div class="header-inner">
          <div class="site-mobile-logo">
            <a href="index.html" class="logo">
              <img :src="Logo" alt="site logo" class="main-logo" />
              <img :src="Logo" alt="site logo" class="sticky-logo" />
            </a>
          </div>
          <div class="toggle-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
          <nav class="site-nav nav-two">
            <div class="close-menu">
              <span>Close</span>
              <i class="ei ei-icon_close"></i>
            </div>
            <div class="site-logo">
              <a href="index.html" class="logo">
                <img :src="Logo" alt="site logo" class="main-logo" />
                <img :src="Logo" alt="site logo" class="sticky-logo" />
              </a>
            </div>
            <div class="menu-wrapper" data-top="992">
              <ul class="site-main-menu">
                <li class="menu-item-has-children">
                  <router-link
                    to="dashboard" v-if="isAuthenticated"
                    class="text-sm relative z-50 py-[10px] text-[#111C52]">Dashboard</router-link>
                </li>
                <li><a href="about.html">About</a></li>
                <li class="menu-item-has-children">
                  <a href="blog.html">Pricing</a>
                </li>
                <li class="menu-item-has-children">
                  <a href="#">Blog</a>
                </li>
                <li><a href="contact.html">Contact us</a></li>
              </ul>
              <div class="nav-right flex items-center gap-4">
                <a v-if="!isAuthenticated" href="javascript:;" class="nav-btn" @click="login">Sign In</a>
                <router-link to="/account-Settings" v-if="isAuthenticated"  class="nav-btn !hidden" @click="profile">Profile</router-link>
                <a v-if="isAuthenticated" href="javascript:;" class="nav-btn" @click="signout">Logout</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <section class="banner banner-two">
      <div class="vector-bg">
        <img :src="TopShape" alt="circle" />
      </div>
      <div class="container max-w-7xl">
        <div class="banner-content-wrap">
          <div class="row align-items-center">
            <div class="col-lg-6 pix-order-2">
              <div class="banner-content">
                {{ user }}
                <h1 class="banner-title wow pixFadeUp !text-5xl !leading-[60px]" data-wow-delay="0.3s">
                  Revolutionize Your Content Strategy
                </h1>

                <p class="description wow pixFadeUp" data-wow-delay="0.5s">
                  Elevate your YouTube, Instagram, and TikTok presence with
                  TubeTailor. Our AI-driven platform offers unparalleled video
                  optimization, targeted promotion guidance, and creative tools
                  to outshine competitors and captivate your audience.
                  Experience a new era of content creation and audience
                  engagement with TubeTailor.
                </p>

                <a
                  href="#"
                  class="pxs-btn banner-btn color-two wow pixFadeUp"
                  data-wow-delay="0.6s"
                  >Get Started</a
                >
              </div>
              <!-- /.banner-content -->
            </div>
            <!-- /.col-md-5 -->

            <div class="col-lg-6">
              <div class="animate-promo-mockup">
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/01.png"
                  class="wow pixFadeDown"
                  alt="mpckup"
                  data-wow-duration="1.5s"
                />
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/02.png"
                  class="wow pixFadeRight"
                  data-wow-delay="0.3s"
                  data-wow-duration="1s"
                  alt="mpckup"
                />
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/03.png"
                  class="wow pixFadeUp"
                  alt="mpckup"
                  data-wow-duration="1.7s"
                />
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/04.png"
                  class="wow pixFadeRight"
                  alt="mpckup"
                />
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/05.png"
                  class="wow pixFadeDown"
                  alt="mpckup"
                  data-wow-duration="2s"
                />
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/06.png"
                  alt="mpckup"
                  data-wow-delay="0.3s"
                />
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/07.png"
                  class="wow pixFadeLeft"
                  alt="mpckup"
                  data-wow-delay="0.6s"
                  data-wow-duration="1.5s"
                />
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/cloud_01.png"
                  alt="mpckup"
                />
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/cloud_02.png"
                  alt="mpckup"
                />
                <img
                  src="https://saaspik.pixelsigns.art/saaspik/media/banner/cloud_03.png"
                  alt="mpckup"
                />
              </div>
              <!-- /.promo-mockup -->
            </div>
            <!-- /.col-md-7 -->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.banner-content-wrap -->
      </div>
      <!-- /.container -->
    </section>
    <!-- /.banner banner-two -->

    <!--===========================-->
    <!--=         Feature         =-->
    <!--===========================-->
    <section id="brand-logo">
      <div class="section-small text-center wow pixFadeUp">
        <h2 class="title">
          Hear It From Creators: <strong>TubeTailor Success Stories</strong>
        </h2>
        <p
          class="description wow pixFadeUp max-w-2xl mx-auto mt-4"
          data-wow-delay="0.5s"
        >
          Discover the transformative experiences of content creators with
          TubeTailor. These reviews from our diverse user base shed light on how
          our platform elevates content strategies and builds stronger audience
          connections.
        </p>
      </div>
      <div class="">
        <div
          class="swiper-container logo-carousel wow pixFadeUp"
          data-wow-delay="0.3s"
          id="logo-carousel"
          data-perpage="6"
          data-breakpoints='{"1024": {"slidesPerView": 4}, "768": {"slidesPerView": 4}, "640": {"slidesPerView": 3}}'
        >
          <div class="swiper-wrapper space-x-4">
            <div class="swiper-slide !w-full max-w-lg">
              <div class="brand-logo rounded-xl border !border-gray-300 shadow-lg">
                <img class="rounded-xl" :src="Tweet" alt="brand" />
              </div>
            </div>
            <!-- /.swiper-slide -->

            <div class="swiper-slide !w-full max-w-lg">
              <div class="brand-logo rounded-xl border !border-gray-300 shadow-lg">
                <img class="rounded-xl" :src="Tweet" alt="brand" />
              </div>
            </div>
            <!-- /.swiper-slide -->

            <div class="swiper-slide !w-full max-w-lg">
              <div class="brand-logo rounded-xl border !border-gray-300 shadow-lg">
                <img class="rounded-xl" :src="Tweet" alt="brand" />
              </div>
            </div>
            <!-- /.swiper-slide -->

            <div class="swiper-slide !w-full max-w-lg">
              <div class="brand-logo rounded-xl border !border-gray-300 shadow-lg">
                <img class="rounded-xl" :src="Tweet" alt="brand" />
              </div>
            </div>
            <!-- /.swiper-slide -->

            <div class="swiper-slide !w-full max-w-lg">
              <div class="brand-logo rounded-xl border !border-gray-300 shadow-lg">
                <img class="rounded-xl" :src="Tweet" alt="brand" />
              </div>
            </div>
            <!-- /.swiper-slide -->

            <div class="swiper-slide !w-full max-w-lg">
              <div class="brand-logo rounded-xl border !border-gray-300 shadow-lg">
                <img class="rounded-xl" :src="Tweet" alt="brand" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--===========================-->
    <!--=         Feature         =-->
    <!--===========================-->
    <section class="featured-two-same">
      <div class="container max-w-7xl">
        <div class="section-title color-two text-center">
          <h3 class="sub-title wow pixFadeUp">Our service</h3>
          <h2 class="title wow pixFadeUp" data-wow-delay="0.3s">
            Why you choose TubeTailor
          </h2>
        </div>
        <!-- /.section-title -->

        <div class="row">
    <div
      v-for="(box, index) in iconBoxes"
      :key="index"
      class="col-lg-4 col-md-6"
    >
      <div
        class="saaspik-icon-box-wrapper style-two wow pixFadeRight"
        :data-wow-delay="box.delay"
      >
        <div class="saaspik-icon-box-icon">
          <img class="mx-auto" :src="box.icon" alt="" />
        </div>
        <div class="pixsass-icon-box-content text-[14px] text-center">
          <h3 class="pixsass-icon-box-title">
            <a href="#">{{ box.title }}</a>
          </h3>
          <p>{{ box.description }}</p>
        </div>
      </div>
      <!-- /.pixsass-box style-two -->
    </div>
    <!-- /.col-lg-4 col-md-6 -->
  </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->

      <div class="scroll-circle wow pixFadeRight">
        <img
          src="https://saaspik.pixelsigns.art/saaspik/media/background/circle.png"
          data-parallax='{"y" : -230}'
          alt="circle"
        />
      </div>
    </section>
    <!-- /.featured -->
    <section class="revolutionize-two">
      <div class="bg-angle"></div>
      <div class="container max-w-7xl">
        <div class="section-title dark-title text-center">
          <h3 class="sub-title wow pixFadeUp">Updated Screen</h3>
          <h2 class="title wow pixFadeUp" data-wow-delay="0.3s">
            Revolutionize your online<br />
            business today
          </h2>
        </div>
        <!-- /.section-title dark-title -->

        <div id="pix-tabs" class="wow pixFadeUp" data-wow-delay="0.5s">
    <ul id="pix-tabs-nav" class="pix-tab-two">
      <li v-for="tab in tabs" :key="tab.name" :class="{ active: tab.isActive }" @click="selectTab(tab)">
        <a class="text-sm whitespace-nowrap">{{ tab.name }}</a>
      </li>
    </ul>
    <!-- tabs-nav -->

    <div id="pix-tabs-content">
      <div v-for="tab in tabs" :key="tab.name" class="content color-two" v-show="tab.isActive">
        <img
          class="w-full h-full !object-cover max-w-[70%] mx-auto"
          :src="tab.image"
          alt="revolutionize"
        />
        <div class="shape-shadow"></div>
      </div>
    </div>
    <!-- tabs-content -->
  </div>
        <!-- Tabs -->
      </div>
      <!-- /.container -->
    </section>
    <!-- /.revolutionize -->
    <section class="pricing-two">
      <div class="container max-w-7xl">
        <div class="section-title color-two text-center">
          <h3 class="sub-title wow pixFadeUp">Pricing Plan</h3>
          <h2 class="title wow pixFadeUp" data-wow-delay="0.3s">
            No Hidden Charges! Choose <br />
            your Plan.
          </h2>
        </div>
        <!-- /.section-title -->
        <nav class="pricing-tab color-two wow pixFadeUp" data-wow-delay="0.4s">
          <span class="monthly_tab_title tab-btn"> Monthly </span>
          <span class="pricing-tab-switcher"></span>
          <span class="annual_tab_title tab-btn"> Annual </span>
        </nav>
        <!-- /.advanced-pricing-table -->
        <PricingCard />
      </div>
      <!-- /.container -->
    </section>
    <!-- /.pricing -->
    <section id="blog-grid">
      <div class="container max-w-7xl">
        <div class="section-title color-two text-center">
          <h3 class="sub-title wow pixFadeUp">News & Events</h3>
          <h2 class="title wow pixFadeUp" data-wow-delay="0.3s">
            Check out our blog posts
          </h2>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <article
              class="blog-post color-two wow pixFadeLeft"
              data-wow-delay="0.4s"
            >
              <div class="feature-image">
                <a href="#">
                  <img
                    src="https://saaspik.pixelsigns.art/saaspik/media/blog/1.jpg"
                    alt="blog-thumb"
                  />
                </a>
              </div>
              <!-- /.feature-image -->
              <div class="blog-content">
                <ul class="post-meta">
                  <li><a href="#">Jun 24, 2019</a></li>
                </ul>

                <h3 class="entry-title">
                  <a href="#">An Uncomplicated Guide to Improve Rate By 3X.</a>
                </h3>

                <a href="#" class="post-author flex items-center"
                  ><img
                    class="w-12 h-12 object-cover"
                    src="https://images.unsplash.com/photo-1700317440743-ffe7b2134276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8"
                    alt="author"
                  />Jackson Pot</a
                >
              </div>
              <!-- /.blog-content -->
            </article>
            <!-- /.blog-post -->
          </div>
          <!-- /.col-lg-4 col-md-6 -->

          <div class="col-lg-4 col-md-6">
            <article
              class="blog-post color-two wow pixFadeLeft"
              data-wow-delay="0.6s"
            >
              <div class="feature-image">
                <a href="#">
                  <img
                    src="https://saaspik.pixelsigns.art/saaspik/media/blog/2.jpg"
                    alt="blog-thumb"
                  />
                </a>
              </div>
              <!-- /.feature-image -->
              <div class="blog-content">
                <ul class="post-meta">
                  <li><a href="#">Jun 30, 2019</a></li>
                </ul>

                <h3 class="entry-title !text-[14px]">
                  <a href="#">The most powerfull chating saas that make you.</a>
                </h3>

                <a href="#" class="post-author flex items-center">
                  <img
                    class="w-12 h-12 object-cover"
                    src="https://images.unsplash.com/photo-1700429422452-d2521dadeb56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D"
                    alt="author"
                  />
                  Brian Cumin</a
                >
              </div>
              <!-- /.blog-content -->
            </article>
            <!-- /.blog-post -->
          </div>
          <!-- /.col-lg-4 col-md-6 -->

          <div class="col-lg-4 col-md-6">
            <article
              class="blog-post color-two wow pixFadeLeft"
              data-wow-delay="0.7s"
            >
              <div class="feature-image">
                <a href="#">
                  <img
                    src="https://saaspik.pixelsigns.art/saaspik/media/blog/3.jpg"
                    alt="blog-thumb"
                  />
                </a>
              </div>
              <!-- /.feature-image -->
              <div class="blog-content">
                <ul class="post-meta">
                  <li><a href="#">July 24, 2019</a></li>
                </ul>

                <h3 class="entry-title">
                  <a href="#">Why DIY tools were rejected by the market.</a>
                </h3>

                <a href="#" class="post-author flex items-center"
                  ><img
                    class="w-12 h-12 object-cover"
                    src="https://images.unsplash.com/photo-1700429422452-d2521dadeb56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D"
                    alt="author"
                  />Hans Down</a
                >
              </div>
              <!-- /.blog-content -->
            </article>
            <!-- /.blog-post -->
          </div>
          <!-- /.col-lg-4 col-md-6 -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>
    <!-- /#blog-grid -->
    <div class="bg-[#F4F7FF] w-full">
      <footer class="max-w-7xl mx-auto px-16 pt-16">
        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <!-- Column 1 -->
          <div class="p-4">
            <div class="space-y-5">
              <img class="h-12" :src="Logo" alt="" />
              <p class="text-[16px] text-[#111C52]">
                Our AI generates captivating, viewer focused titles that
                effectively your.
              </p>
              <div class="flex items-center gap-4">
                <a class="p-3 bg-white rounded-full text-[#28A8EA]" href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                  >
                    <path
                      d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z"
                    />
                  </svg>
                </a>
                <a class="p-3 text-black bg-white rounded-full" href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="m834.7 279.8l61.3-58.9V208H683.7L532.4 586.4L360.3 208H137.7v12.9l71.6 86.6c7 6.4 10.6 15.8 9.7 25.2V673c2.2 12.3-1.7 24.8-10.3 33.7L128 805v12.7h228.6v-12.9l-80.6-98a39.99 39.99 0 0 1-11.1-33.7V378.7l200.7 439.2h23.3l172.6-439.2v349.9c0 9.2 0 11.1-6 17.2l-62.1 60.3V819h301.2v-12.9l-59.9-58.9c-5.2-4-7.9-10.7-6.8-17.2V297a18.1 18.1 0 0 1 6.8-17.2z"
                    />
                  </svg>
                </a>
                <a class="p-3 bg-white text-[#1D9BF0] rounded-full" href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578a9.3 9.3 0 0 1-2.958 1.13a4.66 4.66 0 0 0-7.938 4.25a13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568a4.692 4.692 0 0 1-2.104.08a4.661 4.661 0 0 0 4.352 3.234a9.348 9.348 0 0 1-5.786 1.995a9.5 9.5 0 0 1-1.112-.065a13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254c0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41l.002-.003Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Column 2 -->
          <div class="p-4">
            <h2 class="text-[#111C52] text-[20px] font-bold">Useful Links</h2>
            <div class="flex flex-col gap-4 pt-10">
              <a href="/" class="text-gray-600 hover:underline">Blog</a>
              <a href="/" class="text-gray-600 hover:underline">Pricing</a>
              <a href="/" class="text-gray-600 hover:underline">About</a>
            </div>
          </div>
          <div class="p-4">
            <h2 class="text-[#111C52] text-[20px] font-bold">Terms</h2>
            <div class="flex flex-col gap-4 pt-10">
              <a href="/" class="text-gray-600 hover:underline">TOS</a>
              <a href="/" class="text-gray-600 hover:underline"
                >Privacy Policy</a
              >
              <a href="/" class="text-gray-600 hover:underline"
                >Refund Policy</a
              >
            </div>
          </div>

          <!-- Column 3 -->
          <div class="p-4">
            <h2 class="text-[#111C52] text-[20px] font-bold">Support & Help</h2>
            <div class="flex flex-col gap-4 pt-10">
              <a href="/" class="text-gray-600 hover:underline"
                >Open Support Ticket</a
              >
              <a href="/" class="text-gray-600 hover:underline">Terms of Use</a>
              <a href="/" class="text-gray-600 hover:underline">About</a>
            </div>
          </div>

          <!-- Column 4 -->

          <!-- Add more columns as needed -->
        </div>
        <div class="flex items-center justify-center py-10">
          <h2>
            <span class="text-youtube">Built on Stellar </span>|
            info@tubetailor.io
          </h2>
        </div>
      </footer>
    </div>
  </div>
</template>
<script setup>
import Logo from "@/assets/Logo.png";
import TopShape from "@/assets/top-shape.png";
import Tweet from "@/assets/tweet.png";
import Icon1 from "@/assets/icon1.png";
import Icon2 from "@/assets/icon2.png";
import Icon3 from "@/assets/icon3.png";
import Icon4 from "@/assets/icon4.png";
import Icon5 from "@/assets/icon5.png";
import Icon6 from "@/assets/icon6.png";
import Dashboard from "@/assets/Dashboard.png";
import Optimization from "@/assets/Optimization.png";
import videoSource from "@/assets/hosting.mp4";
import bottom from "@/assets/bottom.png";
import readyLeft from "@/assets/ready-left.png";
import readyRight from "@/assets/ready-right.png";
import top from "@/assets/top.png";
import { postRequest } from "../helper/api.js";
import basicPlans from "../helper/basic.json";
import proPlans from "../helper/pro.json";
import useToastHook from "../hooks/ToastMessage";
import PricingCard from "../components/PricingCard.vue";
const { showSuccessToast, showErrorToast } = useToastHook();
import { ref } from "vue";
import axios from 'axios';
import {getRequestApi,getRequestApiWithoutAuth, logout} from "../helper/api";

const isPlaying = ref(false);
const isAuthenticated = ref(false);
const togglePlay = () => {
  const video = this.$ref.videoPlayer;
  const videoEl = document.getElementById("videoEl");
  if (isPlaying.value) {
    videoEl.pause();
  } else {
    videoEl.play();
  }
  isPlaying.value = !isPlaying.value;
};
isAuthenticated.value = localStorage.getItem('token');
const api_baseURL = 'https://backend.tubetailor.ai/api/';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = api_baseURL;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('token')) {
  localStorage.setItem('token', urlParams.get('token'));
  urlParams.delete('token'); // Remove token from URL
  const newUrl = `${window.location.pathname}?${urlParams.toString()}${window.location.hash}`;
  history.replaceState(null, '', newUrl); // Update URL without reloading
  isAuthenticated.value = localStorage.getItem('token');
}
function login() {
  window.location.href = `${api_baseURL}login`;
}
const user = ref();
async function profile() {
  let { data } = await axios.get('profile');
  user.value = data;
}
async function signout() {
  await logout()
  isAuthenticated.value =false;
  localStorage.removeItem('isSubscribed');
  window.location.href = "/";
}
const plans = ref();
const planDescription = [
  basicPlans,
  proPlans,
  proPlans
];
getPlans()
async function getPlans() {
  try {
    plans.value = await getRequestApiWithoutAuth("plans");
  } catch (error) {
  }
}

const tabs = ref([
  { name: 'DashBoard', image: Dashboard, isActive: true },
  { name: 'Optimization', image: Optimization, isActive: false },
  { name: 'Keyword Research', image: Dashboard, isActive: false },
  { name: 'Marketing', image: Dashboard, isActive: false },
  { name: 'Competition', image: Dashboard, isActive: false },
  { name: 'Content Generator', image: Dashboard, isActive: false },
  { name: 'Community tools', image: Dashboard, isActive: false }
])

function selectTab(selectedTab) {
  tabs.value.forEach(tab => (tab.isActive = tab === selectedTab))
}

const iconBoxes = ref([
  {
    icon: Icon1,
    title: "Craft Perfection",
    description: "Elevate your content with our optimization tool that generates ideal titles, descriptions, tags, and thumbnail ideas, specifically tailored to enhance the appeal and reach of your videos.",
    delay: "0.5s"
  },
  {
    icon: Icon2,
    title: "Strategic Promotion",
    description: "Get a curated list of the most suitable subreddits for promoting your video and receive customized tweets and threads posts, all designed to maximize your video's visibility and engagement.",
    delay: "0.6s"
  },
  {
    icon: Icon3,
    title: "Master Your Keywords",
    description: "Gain insights with detailed keyword analysis. Discover a range of easy-to-dominate keywords for your next project, ensuring your content stays ahead of the curve.",
    delay: "0.7s"
  },
  {
    icon: Icon4,
    title: "Competitor Channel Tracking",
    description: "Keep an eye on your competition with our tracking tools. Analyze their strategies and performance to refine and enhance your own content marketing approach.",
    delay: "0.8s"
  },
  {
    icon: Icon5,
    title: "Engage Effortlessly",
    description: "Streamline your community management with TubeTailor. From responding to comments to keeping the conversation alive, our AI handles it, allowing you to focus on creating more great content.",
    delay: "0.9s"
  },
  {
    icon: Icon6,
    title: "Triple the Impact",
    description: "TubeTailor isn't just for YouTube; it's a multi-platform powerhouse. Optimize your content across YouTube, including shorts, Instagram Reels, and TikTok, ensuring cohesive and effective content strategy across channels.",
    delay: "1s"
  }
]);

</script>
<style scoped>
@import  "../css/landing.css";

</style>