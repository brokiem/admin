<template>
  <div class="mt-3">
    <Listbox as="div" v-model="name">
      <ListboxLabel class="block text-sm font-medium text-gray-700">Latest Project assigned to</ListboxLabel>
      <div class="relative mt-1">
        <ListboxButton class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
          <span class="flex items-center">
            <img :src="selected.img?.charAt(0) === '/' ? `https://brokiem.is-a.dev${selected.img}` : selected.img" alt="Icon" class="h-6 w-6 flex-shrink-0 rounded-full" />
            <span class="ml-3 block truncate">{{ name }}</span>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="project in projects" :value="project.name" v-slot="{ active, selected }">
              <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                <div class="flex items-center">
                  <img :src="project.img?.charAt(0) === '/' ? `https://brokiem.is-a.dev${project.img}` : project.img" alt="Icon" class="h-6 w-6 flex-shrink-0 rounded-full" />
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ project.name }}</span>
                </div>

                <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>

  <div class="mt-2">
    <p class="block text-sm font-medium text-gray-700">Use Discord profile picture</p>
    <div>
      <Switch
          v-model="useDiscordProfile"
          :class="useDiscordProfile ? 'bg-teal-900' : 'bg-teal-700'"
          class="relative inline-flex h-[20px] w-[74px] shrink-0 cursor-pointer rounded-lg border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span class="sr-only">Use setting</span>
        <span
            aria-hidden="true"
            :class="useDiscordProfile ? 'translate-x-9' : 'translate-x-0'"
            class="pointer-events-none inline-block h-[16px] w-[34px] transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        />
      </Switch>
    </div>
  </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, Switch } from '@headlessui/vue'
import {useLatestProject, useProjects, useSettings} from "~/composables/states";
import {useState} from "#app";
import {setKV} from "lanyard-wrapper";

const runtimeConfig = useRuntimeConfig();
const projects = useProjects();
const latestProject = useLatestProject()
const settings = useSettings()

function searchProject(title) {
  return projects.value.filter((project) => {
    return project.name.toLowerCase() === title.toLowerCase();
  })[0];
}

const name = useState('name', () => latestProject.value.name)
const selected = useState('selected', () => searchProject(name.value))

watch(name, (newTitle) => {
  const cache = JSON.parse(JSON.stringify(selected.value))

  const newSelected = searchProject(newTitle)
  selected.value = newSelected
  latestProject.value = newSelected

  setKV(runtimeConfig.userId, 'latest_project', latestProject.value, localStorage.getItem("apiSecret"))
      .catch((e) => {
        name.value = cache.name
        selected.value = cache
        latestProject.value = cache
        console.error(e)
      })
})

const useDiscordProfile = useState('useDiscordProfile', () => settings.value.useDiscordProfile)

watch(useDiscordProfile, (value) => {
  setKV(runtimeConfig.userId, 'use_discord_profile', value, localStorage.getItem("apiSecret"))
      .catch((e) => {
        console.error(e)
      })
})
</script>
