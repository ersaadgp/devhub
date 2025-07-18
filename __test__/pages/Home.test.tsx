import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import Home from '../../src/pages/Home'

describe('Home Page', () => {
  it('renders heading and description', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Welcome to DevHub/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Your projects. Your progress/i),
    ).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    const titles = [
      /Organized Repositories/i,
      /Lightning Fast/i,
      /Open or Private/i,
    ]

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  it('renders call to action buttons', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('button', { name: /Browse Projects/i }),
    ).toBeInTheDocument()
  })
})
