import {useState} from "#app";

export const useSelectedMenu = () => useState('selectedMenu', () => 'Projects')
export const useProjects = () => useState('projects', () => [])
export const useLatestProject = () => useState('latestProject', () => {})
export const useSelectedProject = () => useState('selectedProject', () => null)
export const useDeleteProject = () => useState('deleteProject', () => false)
export const useDeleteAnime = () => useState('deleteAnime', () => false)
export const useAnime = () => useState('anime', () => [])
export const useSelectedAnime = () => useState('selectedAnime', () => null)
export const useModalOpen = () => useState('modalOpen', () => false)
export const useSetSecret = () => useState('setSecret', () => false)
