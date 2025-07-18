'use client'

import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          p: 4,
          borderRadius: 4,
          boxShadow: '0px 0px 8px 2px #eee',
          bgcolor: '#fff',
          maxWidth: 500,
          width: '100%',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Icon icon="mdi:alert-circle-outline" width="60" color="#f44336" />
          <Typography variant="h2" fontWeight={700}>
            404
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Oops! Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The page you’re looking for doesn’t exist or has been moved.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
