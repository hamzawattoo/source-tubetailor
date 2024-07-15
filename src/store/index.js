import { defineStore } from "pinia";

export const useMainStore = defineStore('index', {
    state: () => ({
        textValueContentGenerator: "",
        scriptContentGenerator: "",
        narration_scriptContentGenerator: "",
        descriptionContentGenerator: "",
        tagsContentGenerator: [],
        DetailAnaylsis:[],
        similar_keywords: "",
        textValueKeyword: "",
        YoutubeoptimizationResponse: "",
        youtubeLink:""
    }),
})
