import { useQuery } from '@tanstack/react-query'
import axios from '../utils/axios'

type GithubUser = {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

export function useGetUsers(query: string) {
  return useQuery<GithubUser[]>({
    queryKey: ['githubUserSearch', query],
    queryFn: async () => {
      const res = await axios.get('/search/users', {
        params: { q: query, per_page: 5, page: 1 },
      })
      return res.data.items
    },
    enabled: !!query, // only run if query exists
  })
}
