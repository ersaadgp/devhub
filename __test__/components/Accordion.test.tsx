import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AccordionDetail from '../../src/components/AccordionDetail'
import * as hooks from '../../src/hooks/useGetUserRepos'
import { ToastContainer } from 'react-toastify'

// Mock Iconify and custom components
jest.mock('@iconify/react', () => ({
  Icon: () => <span data-testid="icon" />,
}))

jest.mock('../../src/components/TextMaxLine', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}))

describe('AccordionDetail component', () => {
  const username = 'john'

  it('renders loading state', () => {
    jest.spyOn(hooks, 'useGetUserRepos').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any)

    render(<AccordionDetail username={username} isOpen={true} />)

    expect(screen.getAllByTestId('skeleton')).toHaveLength(3)
  })

  it('renders repositories correctly', () => {
    const mockRepos = [
      {
        name: 'devhub-app',
        description: 'GitHub for developers',
        stargazers_count: 42,
      },
    ]

    jest.spyOn(hooks, 'useGetUserRepos').mockReturnValue({
      data: mockRepos,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    render(<AccordionDetail username={username} isOpen={true} />)

    expect(screen.getByText('devhub-app')).toBeInTheDocument()
    expect(screen.getByText('GitHub for developers')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders error state and toast message', () => {
    jest.spyOn(hooks, 'useGetUserRepos').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: 'Failed to fetch' },
    } as any)

    render(
      <>
        <ToastContainer />
        <AccordionDetail username={username} isOpen={true} />
      </>,
    )

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('renders "no repositories" message when data is null', () => {
    jest.spyOn(hooks, 'useGetUserRepos').mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    render(<AccordionDetail username={username} isOpen={true} />)

    expect(
      screen.getByText(/user does not have any repositories/i),
    ).toBeInTheDocument()
  })
})
