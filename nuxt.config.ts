// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: 'https://api.lanyard.rest/v1/users/548120702373593090',
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
