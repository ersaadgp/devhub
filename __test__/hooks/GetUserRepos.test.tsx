import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGetUserRepos } from '../../src/hooks/useGetUserRepos'
import axiosInstance from '../../src/utils/axios'
import axios from 'axios'

jest.mock('../../src/utils/axios')

const mockedAxios = axiosInstance as jest.Mocked<typeof axios>

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
)

describe('useGetUserRepos', () => {
  it('fetches repos successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: 'awesome-repo',
          html_url: 'https://github.com/test/awesome-repo',
          description: 'Test repo',
          stargazers_count: 99,
        },
      ],
    })

    const { result } = renderHook(() => useGetUserRepos('test', true), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockedAxios.get).toHaveBeenCalledWith('/users/test/repos', {
      params: { per_page: 100 },
    })
    expect(result.current.data?.[0].name).toBe('awesome-repo')
  })

  it('does not fetch when isOpen is false', () => {
    renderHook(() => useGetUserRepos('test', false), {
      wrapper,
    })

    expect(mockedAxios.get).toHaveBeenCalled()
  })
})
