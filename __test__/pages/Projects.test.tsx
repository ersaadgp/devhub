import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { toast } from 'react-toastify'
import { useGetUsers } from '../../src/hooks/useGetUsers'
import UserProjects from '../../src/pages/Projects'

// Mock the custom hook
jest.mock('../../src/hooks/useGetUsers')
jest.mock('../../src/components/AccordionDetail', () => () => (
  <div data-testid="accordion-detail">Accordion Detail</div>
))
jest.mock('react-toastify', () => ({
  toast: { error: jest.fn() },
}))

const mockUseGetUsers = useGetUsers as jest.Mock

const renderPage = () =>
  render(
    <BrowserRouter>
      <UserProjects />
    </BrowserRouter>,
  )

describe('UserProjects Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form and initial state correctly', () => {
    mockUseGetUsers.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      isFetched: false,
      error: null,
    })

    renderPage()

    expect(screen.getByLabelText(/Search GitHub Users/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument()
  })

  it('validates spaces-only input as invalid', async () => {
    mockUseGetUsers.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      isFetched: false,
      error: null,
    })

    renderPage()

    const input = screen.getByLabelText(/Search GitHub Users/i)
    const button = screen.getByRole('button', { name: /Search/i })

    fireEvent.change(input, { target: { value: '     ' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText(/Search cannot be only spaces/i),
      ).toBeInTheDocument()
    })
  })

  it('submits valid input and shows user results', async () => {
    mockUseGetUsers.mockReturnValue({
      data: [
        {
          id: 1,
          login: 'ersaad',
          avatar_url: 'avatar.png',
        },
      ],
      isLoading: false,
      isError: false,
      isFetched: true,
      error: null,
    })

    renderPage()

    const input = screen.getByLabelText(/Search GitHub Users/i)
    const button = screen.getByRole('button', { name: /Search/i })

    fireEvent.change(input, { target: { value: 'ersaad' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/ersaad/i)).toBeInTheDocument()
    })
  })

  it('shows loading indicator', () => {
    mockUseGetUsers.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isFetched: false,
      error: null,
    })

    renderPage()

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('shows no user found message', () => {
    mockUseGetUsers.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      isFetched: true,
      error: null,
    })

    renderPage()

    expect(screen.getByText(/No users found/i)).toBeInTheDocument()
  })

  it('shows error toast when API fails', () => {
    const errorMsg = 'API failed'

    mockUseGetUsers.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isFetched: false,
      error: { message: errorMsg },
    })

    renderPage()

    expect(toast.error).toHaveBeenCalledWith(errorMsg)
  })
})
