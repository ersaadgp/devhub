'use client'

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Stack,
  Button,
} from '@mui/material'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useNavigate()

  return (
    <Box>
      {/* Top Navbar */}
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} data-testid="logo">
            🛠️ DevHub
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => router('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => router('/projects')}>
              Projects
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Content Section */}
      <Box sx={{ minHeight: 'calc(100vh - 232px)' }}>{children}</Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: '#f5f5f5', mt: 10 }}>
        <Container>
          <Typography textAlign="center" color="text.secondary">
            © 2025 DevHub — Built for developers, by developers.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
