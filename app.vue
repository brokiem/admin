<template>
  <div>
    <div class="min-h-full">
      <header class="bg-white shadow">
        <div class="flex flex-row mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 gap-4">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Admin Panel</h1>

          <button v-if="showRefreshButton" @click="refresh" type="button" class="items-center rounded-md border border-indigo-600 px-2 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-indigo-500 focus:ring-0 focus:ring-offset-2 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clip-rule="evenodd" />
            </svg>
          </button>

          <div class="grow"></div>

          <button @click="setSecret" type="button" class="items-center rounded-md bg-indigo-600 border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-700 text-white focus:outline-none focus:ring-indigo-500 focus:ring-0 focus:ring-offset-2 transition duration-300">
            Set Secret
          </button>
        </div>
      </header>

      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div>
              <div class="flex flex-row">
                <div class="flex flex-col gap-1">
                  <button @click="selectMenu('Projects')" type="button" class="inline-flex items-center rounded-md border border-indigo-600 px-4 py-2 w-52 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-700 hover:text-white focus:bg-indigo-600 focus:text-white focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300" :class="selectedMenu === 'Projects' ? ['!bg-indigo-600', '!text-white'] : ''">
                    Projects
                  </button>
                  <button @click="selectMenu('Anime')" type="button" class="inline-flex items-center rounded-md border border-indigo-600 px-4 py-2 w-52 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-700 hover:text-white focus:bg-indigo-600 focus:text-white focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300" :class="selectedMenu === 'Anime' ? ['!bg-indigo-600', '!text-white'] : ''">
                    Anime
                  </button>
                  <button @click="selectMenu('Settings')" type="button" class="inline-flex items-center rounded-md border border-indigo-600 px-4 py-2 w-52 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-700 hover:text-white focus:bg-indigo-600 focus:text-white focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300" :class="selectedMenu === 'Settings' ? ['!bg-indigo-600', '!text-white'] : ''">
                    Settings
                  </button>
                </div>

                <div class="ml-8 w-full">
                  <div class="flex flex-row justify-between gap-4">
                    <div class="text-left text-2xl font-bold rounded-md">
                      {{selectedMenu}}
                    </div>
                    <button v-if="selectedMenu !== 'Settings'" @click="openModal" type="button" class="items-center rounded-md bg-indigo-600 text-white border border-indigo-600 px-4 py-2 text-sm font-medium shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-indigo-500 focus:ring-0 focus:ring-offset-2 transition duration-300">
                      Add Data
                    </button>
                  </div>

                  <!-- component -->
                  <ProjectsTable v-if="selectedMenu === 'Projects'" />
                  <AnimeTable v-if="selectedMenu === 'Anime'" />
                  <LatestProjectSelector v-if="selectedMenu === 'Settings'" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <AddProjectModal />
        <AddAnimeModal />
        <SetSecretModal />
      </main>
    </div>
  </div>
</template>

<script setup>
import ProjectsTable from "~/components/ProjectsTable.vue";
import AnimeTable from "~/components/AnimeTable.vue";
import {
  useAnime,
  useLatestProject,
  useModalOpen,
  useProjects,
  useSelectedMenu,
  useSetSecret,
  useSettings
} from "~/composables/states";
import AddAnimeModal from "~/components/AddAnimeModal.vue";
import LatestProjectSelector from "~/components/LatestProjectSelector.vue";
import { connectWebSocket, fetchUserData } from "lanyard-wrapper";

const selectedMenu = useSelectedMenu()
const projects = useProjects()
const latestProject = useLatestProject()
const anime = useAnime()
const modalOpen = useModalOpen()
const setSecretKey = useSetSecret()
const settings = useSettings()

settings.value = {
  useDiscordProfile: false
}

let showRefreshButton = false;

const refresh = () => {
  if (process.client) {
    fetchUserData("548120702373593090").then((data) => {
      projects.value = JSON.parse(data.kv.projects);
      latestProject.value = JSON.parse(data.kv.latest_project);
      anime.value = JSON.parse(data.kv.fav_anime);
      settings.value.useDiscordProfile = data.kv.use_discord_profile === "true";
    });
  }
}

const openModal = () => {
  modalOpen.value = true
}

if (process.client) {
  connectWebSocket("548120702373593090", (data) => {
    projects.value = JSON.parse(data.kv.projects);
    latestProject.value = JSON.parse(data.kv.latest_project);
    anime.value = JSON.parse(data.kv.fav_anime);
    settings.value.useDiscordProfile = data.kv.use_discord_profile === "true";
  }).catch(() => {
    refresh();
    showRefreshButton = true;
  });
}

function selectMenu(menu) {
  selectedMenu.value = menu
}

function setSecret() {
  setSecretKey.value = true
}
</script>
