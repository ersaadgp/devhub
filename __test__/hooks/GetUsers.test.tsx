import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axiosInstance from '../../src/utils/axios'
import axios from 'axios'
import { useGetUsers } from '../../src/hooks/useGetUsers'

jest.mock('../../src/utils/axios')
const mockedAxios = axiosInstance as jest.Mocked<typeof axios>

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
)

describe('useGetUsers', () => {
  it('fetches GitHub users successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        items: [
          {
            id: 1,
            login: 'ersaad',
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
            html_url: 'https://github.com/ersaad',
          },
        ],
      },
    })

    const { result } = renderHook(() => useGetUsers('ersaad'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockedAxios.get).toHaveBeenCalledWith('/search/users', {
      params: { q: 'ersaad', per_page: 5, page: 1 },
    })

    expect(result.current.data?.[0].login).toBe('ersaad')
  })
})
