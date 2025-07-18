import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import UserProjects from './pages/Projects'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import { ToastContainer } from 'react-toastify'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <ToastContainer position="top-right" autoClose={3000} />

          <Routes>
            {/* Default Route */}
            <Route path="/" element={<Home />} />

            {/* Routed Page */}
            <Route path="/projects" element={<UserProjects />} />

            {/* Catch-all 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
