import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NotFound from '../../src/pages/NotFound'
import { MemoryRouter } from 'react-router-dom'

// mock useNavigate

describe('NotFound Page', () => {
  it('renders 404 content correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument()
    expect(
      screen.getByText(/The page you’re looking for doesn’t exist/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Back to Home/i }),
    ).toBeInTheDocument()
  })
})
