<template>
  <div class="container mx-auto p-4">
    <img src="@/assets/Logo.png" alt="Logo" class="mb-4">
    <div class="max-w-7xl mx-auto w-full">
      <div class="flex items-center justify-between my-20">
        <h1 class="text-[20px] lg:block hidden font-extrabold">Billing Information</h1>
        <button @click="goBack" class="text-white text-sm bg-cyan-500 rounded-full flex items-center gap-3 px-4 py-1 mt-3">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </span>
          Go Back
        </button>
      </div>
    </div>
    <div class="max-w-7xl mx-auto flex justify-between items-center gap-4">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">Plan Name </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ planData?.plan.name }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">Plan Price</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$ {{ planData?.plan.price }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">Duration</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ planData?.plan.duration }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">Started Date</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ planData?.plan.created_at }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">Renewal Date</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ planData?.plan.updated_at }}</dd>
        </div>
      </dl>
      <div class="w-full max-w-xl flex-1">
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="bg-[#414D61] text-white p-4">
            You will be charged {{ formattedPrice }} for {{ formattedPlanName }} Plan
          </div>
          <div class="p-4">
            <div v-if="message" :class="`px-4 py-2.5 mb-4 text-sm rounded-md flex items-center gap-2 ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`">
              <svg v-if="message.type === 'error'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-red-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <svg v-if="message.type === 'success'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              {{ message.text }}
            </div>
            <form id="payment-form" @submit.prevent="handleSubmit">
              <input type="hidden" name="plan_id" v-model="formattedPlanId">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="card-holder-name">
                  Name
                </label>
                <input type="text" name="name" id="card-holder-name" class="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Name on the card">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="card-element">
                  Card details
                </label>
                <div id="card-element" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <!-- Stripe Element will be inserted here -->
                </div>
              </div>
              <div class="mt-6">
                <button id="card-button" type="submit" class="w-full bg-youtube text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" :data-secret="formattedPlanClientSecret" :disabled="loading">
                  <span v-if="loading">Processing...</span>
                  <span v-else>Purchase</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import { getUserDetail } from '../helper/api';

export default {
  props: {
    slug: {
      required: true,
      type: String
    }
  },
  data(){
    return {
      loading: false,
      message: null
    }
  },
  setup() {
    const planData = ref(null);

    const fetchPlan = async (slug) => {
      try {
        const response = await axios.get(`plan/${slug}`);
        planData.value = response.data;
      } catch (error) {
        console.error('Error fetching plan:', error);
      }
    };

    return { planData, fetchPlan };
  },
  mounted() {
    this.fetchPlan(this.slug);

    const stripe = Stripe('pk_test_51MVEAPLS4zkAfcVbnyeGUWCsshFlKyTybYxuFTVH7XNjh7OXBfAq4KKUb85J6p5T70pTyiztLL2hLUdw3cVvcJJS00pWNxURBD');
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('payment-form');
    const cardBtn = document.getElementById('card-button');
    const cardHolderName = document.getElementById('card-holder-name');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      cardBtn.disabled = true;
      const { setupIntent, error } = await stripe.confirmCardSetup(cardBtn.dataset.secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardHolderName.value
          }
        }
      });

      if (error) {
        cardBtn.disabled = false;
        this.message = { type: 'error', text: error.message };
      } else {
        let token = document.createElement('input');
        token.setAttribute('type', 'hidden');
        token.setAttribute('name', 'token');
        token.setAttribute('value', setupIntent.payment_method);
        form.appendChild(token);
        this.submitForm(form);
      }
    });
  },
  methods: {
    async fetchPlan(slug) {
      try {
        const response = await axios.get(`plan/${slug}`);
        this.planData = response.data;
      } catch (error) {
        console.error('Error fetching plan:', error);
      }
    },
    async submitForm(form) {
      this.loading = true;
      try {
        const response = await axios.post('subscription', new FormData(form));
        console.log(response);
        if (response.data.message) {
          this.message = { type: 'success', text: 'Payment processed successfully. Redirecting to dashboard...' };
          const userDetail = await getUserDetail();
          localStorage.setItem('user', JSON.stringify(userDetail));
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 2000);
        } else {
          this.message = { type: 'error', text: 'response.data.message5555555555555' };
        } 
      } catch (error) {
        this.message = { type: 'error', text:  'response.data.messagefdfdfdfdfd' };
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      window.history.back();
    },
    handleSubmit() {
      // This function will be called upon form submission
      // It will handle the stripe setup and form submission
    }
  },
  computed: {
    formattedPlanClientSecret() {
      return this.planData ? this.planData.intent.client_secret : '';
    },
    formattedPrice() {
      return this.planData ? `$${this.planData.plan.price}` : '';
    },
    formattedPlanName() {
      return this.planData ? this.planData.plan.name : '';
    },
    formattedPlanId() {
      return this.planData ? this.planData.plan.id : '';
    }
  }
};
</script>
