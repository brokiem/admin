<template>
  <div class="rounded-lg border border-gray-200 shadow-md mt-3">
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-5 py-4 font-medium text-gray-900">Title</th>
        <th scope="col" class="px-4 py-4 font-medium text-gray-900">Description</th>
        <th scope="col" class="px-4 py-4 font-medium text-gray-900">Repository</th>
        <th scope="col" class="px-4 py-4 font-medium text-gray-900">Actions</th>
      </tr>
      </thead>

      <tbody class="divide-y divide-gray-100 border-t border-gray-100">

      <tr v-if="projects.length <= 0" class="hover:bg-gray-50" v-for="n in 5">
        <th class="flex gap-3 px-5 py-4 font-normal text-gray-900">
          <div class="animate-pulse bg-gray-300 h-4 w-1/2 rounded"></div>
        </th>

        <td class="px-4 py-4">
          <div class="animate-pulse bg-gray-300 h-4 w-full rounded"></div>
        </td>

        <td class="px-4 py-4">
          <div class="animate-pulse bg-gray-300 h-4 w-1/2 rounded"></div>
        </td>

        <td class="px-4 py-4">
          <div class="flex justify-end gap-4">
            <div class="animate-pulse bg-gray-300 h-4 w-1/2 rounded"></div>
          </div>
        </td>
      </tr>

      <tr v-else class="hover:bg-gray-50" v-for="(project, title) in projects">
        <th class="flex gap-3 px-5 py-4 font-normal text-gray-900">
          <div class="font-medium text-gray-700">{{ title }}</div>
        </th>

        <td class="px-4 py-4">
          {{ project.desc }}
        </td>

        <td class="px-4 py-4">
          <a :href="project.github" target="_blank" class="text-indigo-600 hover:text-indigo-900">{{ project.github?.replace('https://github.com/', '') }}</a>
        </td>

        <td class="px-4 py-4">
          <div class="flex justify-end gap-4">
            <button @click="deleteProject(title)" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
              </svg>
            </button>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
              </svg>
            </a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {useProjects} from "~/composables/states";

const runtimeConfig = useRuntimeConfig();
const projects = useProjects();

function deleteProject(title) {
  delete projects.value[title];

  $fetch(`${runtimeConfig.apiBase}/kv/projects`, {
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem("apiSecret")
    },
    body: JSON.stringify(projects.value)
  });
}
</script>

<style scoped>

</style>
