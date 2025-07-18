import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Layout from '../../src/components/Layout'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

// Mock pages for navigation test
const HomePage = () => <div>Home Page</div>
const ProjectsPage = () => <div>Projects Page</div>

describe('Layout component', () => {
  it('renders logo, children, and footer', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>,
    )

    expect(screen.getByTestId('logo')).toHaveTextContent(/DevHub/i)
    expect(screen.getByText(/Test Content/i)).toBeInTheDocument()
    expect(
      screen.getByText(/© 2025 DevHub — Built for developers, by developers/i),
    ).toBeInTheDocument()
  })

  it('navigates to Home and Projects pages on button click', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/projects"
            element={
              <Layout>
                <ProjectsPage />
              </Layout>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    // Initial page should show Home Page
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument()

    // Click Projects button
    fireEvent.click(screen.getByText('Projects'))

    // Now should show Projects Page
    expect(screen.getByText(/Projects Page/i)).toBeInTheDocument()

    // Click Home button
    fireEvent.click(screen.getByText('Home'))

    // Back to Home Page
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument()
  })
})
