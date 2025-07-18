// hooks/useGithubRepos.ts
import { useQuery } from '@tanstack/react-query'
import axios from '../utils/axios'

export type GithubRepo = {
  id: number
  name: string
  html_url: string
  description: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
}

export function useGetUserRepos(username: string, isOpen: boolean) {
  return useQuery<GithubRepo[]>({
    queryKey: ['githubRepos', username],
    queryFn: async () => {
      const res = await axios.get(`/users/${username}/repos`, {
        params: { per_page: 100 },
      })
      return res.data
    },
    enabled: isOpen,
  })
}
