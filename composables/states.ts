import {useState} from "#app";

export const useSelectedMenu = () => useState('selectedMenu', () => 'Projects')
export const useProjects = () => useState('projects', () => [])
export const useLatestProject = () => useState('latestProject', () => {})
export const useSelectedProject = () => useState('selectedProject', () => null)
export const useDeleteProject = () => useState('deleteProject', () => false)
export const useAnime = () => useState('anime', () => [])
export const useModalOpen = () => useState('modalOpen', () => false)
export const useSetSecret = () => useState('setSecret', () => false)
