<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        You will be charged {{ formattedPrice }} for {{ formattedPlanName }} Plan
                    </div>
                    <div class="card-body">
                        <form id="payment-form">
                            <input type="hidden" name="plan_id" id="plan" v-model="formattedPlanId">
                            <div class="row">
                                <div class="col-xl-4 col-lg-4">
                                    <div class="form-group">
                                        <label for="">Name</label>
                                        <input type="text" name="name" id="card-holder-name" class="form-control"
                                               value="" placeholder="Name on the card">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-4 col-lg-4">
                                    <div class="form-group">
                                        <label for="">Card details</label>
                                        <div id="card-element">

                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12">
                                    <hr>
                                    <button type="submit" class="btn btn-primary" id="card-button"
                                            :data-secret="formattedPlanClientSecret">Purchase
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {{this.planData}}
        </div>
    </div>
</template>

<script>
    import {ref, computed} from "vue";
    import axios from 'axios';

    export default {
        props: {
            slug: {
                required: true
            }
        },
        onMounted() {
        },
        data() {
            return {
                planData: ref(null)
            }
        },
        mounted() {
            const api_baseURL = 'https://backend.tubetailor.ai/api/';
            axios.defaults.withCredentials = true;
            axios.defaults.baseURL = api_baseURL;
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            this.fetchPlan();


                // Please adjust the stripe key in env file, key should be separate from code.
                // We will need to change to stripe key on any time
                const stripe = Stripe('pk_test_51MVEAPLS4zkAfcVbnyeGUWCsshFlKyTybYxuFTVH7XNjh7OXBfAq4KKUb85J6p5T70pTyiztLL2hLUdw3cVvcJJS00pWNxURBD');
                const elements = stripe.elements();
                const cardElement = elements.create('card');
                cardElement.mount('#card-element');

                const form = document.getElementById('payment-form')
                const cardBtn = document.getElementById('card-button')
                const cardHolderName = document.getElementById('card-holder-name')

                form.addEventListener('submit', async (e) => {
                    e.preventDefault()
                    let card_num = document.getElementsByClassName('InputElement');
                    console.log('card_num >> ', card_num);

                    cardBtn.disabled = true
                    const {setupIntent, error} = await stripe.confirmCardSetup(
                        cardBtn.dataset.secret, {
                            payment_method: {
                                card: cardElement,
                                billing_details: {
                                    name: cardHolderName.value
                                }
                            }
                        }
                    )

                    if (error) {
                        cardBtn.disable = false
                    } else {
                        let token = document.createElement('input')
                        token.setAttribute('type', 'hidden')
                        token.setAttribute('name', 'token')
                        token.setAttribute('value', setupIntent.payment_method)
                        form.appendChild(token)
                        this.submit(form);

                    }
            })

        },
        methods: {
            async fetchPlan() {
                try {
                    // Route: '/plan/{plan_slug}'
                    // You will be having all plan's slug from hitting '/plans' API
                    const response = await axios.get(`plan/${this.slug}`);
                    this.planData = response.data;

                } catch (error) {
                    console.error('Error fetching plan:', error);
                }
            },
            async  submit(form) {
                try {
                    const response = await axios.post('subscription', form);
                    console.log('response >> ', response);
                } catch (error) {
                    console.error('Error submitting:', error);
                }
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


;

</script>
