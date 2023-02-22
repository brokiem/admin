// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            userId: "548120702373593090"
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-headlessui'
    ],
    css: [
        '~/assets/css/main.css',
    ]
})
