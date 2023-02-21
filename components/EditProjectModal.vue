<template>
  <TransitionRoot appear :show="selectedProject !== null" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Update Project
              </DialogTitle>
              <div class="mt-4">
                <div>
                  <label for="price" class="block text-sm font-medium text-gray-700">Name</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                      <span class="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                          <path fill-rule="evenodd" d="M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <input type="text" name="name" id="name" :value="selectedProject?.name" class="block w-full rounded-md border border-gray-300 h-9 px-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>
                <div class="mt-2">
                  <label for="price" class="block text-sm font-medium text-gray-700">Description</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                      <span class="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                          <path fill-rule="evenodd" d="M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <input type="text" name="desc" id="desc" :value="selectedProject?.desc" class="block w-full rounded-md border border-gray-300 h-9 px-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>
                <div class="mt-2">
                  <label for="price" class="block text-sm font-medium text-gray-700">Stack</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                      <span class="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                          <path fill-rule="evenodd" d="M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <input type="text" name="stack" id="stack" :value="selectedProject?.stack" class="block w-full rounded-md border border-gray-300 h-9 px-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>
                <div class="mt-2">
                  <label for="price" class="block text-sm font-medium text-gray-700">URL</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                      <span class="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                          <path fill-rule="evenodd" d="M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <input type="text" name="url" id="url" :value="selectedProject?.url" class="block w-full rounded-md border border-gray-300 h-9 px-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>
                <div class="mt-2">
                  <label for="price" class="block text-sm font-medium text-gray-700">GitHub</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                      <span class="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                          <path fill-rule="evenodd" d="M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <input type="text" name="github" id="github" :value="selectedProject?.github" class="block w-full rounded-md border border-gray-300 h-9 px-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>
                <div class="mt-2">
                  <label for="price" class="block text-sm font-medium text-gray-700">Image URL</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                      <span class="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                          <path fill-rule="evenodd" d="M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <input type="text" name="imgUrl" id="imgUrl" :value="selectedProject?.img" class="block w-full rounded-md border border-gray-300 h-9 px-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <button @click="submitData" type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  Update Project
                </button>
                <button @click="closeModal" type="button" class="mx-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import {useModalOpen, useProjects, useSelectedMenu, useSelectedProject} from "~/composables/states";

const runtimeConfig = useRuntimeConfig()
const projects = useProjects()
const isOpen = useModalOpen()
const selectedMenu = useSelectedMenu()
const selectedProject = useSelectedProject()

function closeModal() {
  selectedProject.value = null
  isOpen.value = false
}

function submitData() {
  const name = document.getElementById('name').value
  const desc = document.getElementById('desc').value
  const stack = document.getElementById('stack').value
  const url = document.getElementById('url').value
  const github = document.getElementById('github').value
  const imgUrl = document.getElementById('imgUrl').value

  const index = projects.value.findIndex((obj => obj.name.toLowerCase() === selectedProject.value.name.toLowerCase()));

  if (index === -1) return closeModal()

  projects.value[index] = {
    desc: desc,
    stack: stack,
    url: url,
    github: github,
    img: imgUrl,
    name: name
  };

  $fetch(`${runtimeConfig.apiBase}/kv/projects`, {
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem("apiSecret")
    },
    body: JSON.stringify(projects.value)
  });

  closeModal()
}
</script>
