'use client'

import { Icon } from '@iconify/react'
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const router = useNavigate()

  return (
    <>
      <Container sx={{ py: 10 }}>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography variant="h2" fontWeight="bold" data-testid="heading">
            Welcome to DevHub
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="700px">
            Your projects. Your progress. Openly organized. Discover, manage,
            and collaborate on repositories like never before.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router('/projects')}
            >
              Browse Projects
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Container sx={{ py: 5 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={5}>
          Built for Developers
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: 'solar:folder-open-line-duotone',
              title: 'Organized Repositories',
              desc: 'Easily browse and manage your project folders & codebases.',
            },
            {
              icon: 'solar:spedometer-max-line-duotone',
              title: 'Lightning Fast',
              desc: 'Built with React, optimized with Next.js — fast and snappy.',
            },
            {
              icon: 'solar:lock-keyhole-unlocked-line-duotone',
              title: 'Open or Private',
              desc: 'Choose visibility settings per repo. Collaboration made simple.',
            },
          ].map((feature, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: 'center',
                  boxShadow: '0px 0px 8px 2px #eee',
                }}
              >
                <Icon icon={feature.icon} width="40" color="#1976d2" />
                <Typography variant="h6" mt={2} fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="body2" mt={1} color="text.secondary">
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
