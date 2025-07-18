'use client'

import {
  AccordionDetails,
  Box,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useGetUserRepos } from '../hooks/useGetUserRepos'
import { Icon } from '@iconify/react'
import TextMaxLine from './TextMaxLine'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { formatNumber } from '../utils/helper'

interface IProp {
  username: string
  isOpen: boolean
}

const AccordionDetail = ({ username, isOpen }: IProp) => {
  const { data, isLoading, isError, error } = useGetUserRepos(username, isOpen)

  useEffect(() => {
    if (isError) toast.error(error.message)
  }, [isError, error])

  return (
    <AccordionDetails>
      {!isLoading && (
        <Stack spacing={2}>
          {data &&
            data.map((row, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: 2,
                  bgcolor: '#f9f9f9',
                  '&:hover': {
                    bgcolor: '#f1f1f1',
                  },
                }}
              >
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Stack display="flex" flexDirection="row" alignItems="center">
                    <Box sx={{ minWidth: 30 }}>
                      <Icon
                        icon="solar:folder-with-files-line-duotone"
                        width="30px"
                        height="30px"
                        color="#1976d2"
                      />
                    </Box>
                    <TextMaxLine
                      line={1}
                      sx={{
                        ml: 1,
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {row.name}
                    </TextMaxLine>
                  </Stack>
                  {row.description && (
                    <Typography variant="caption">{row.description}</Typography>
                  )}
                  <Stack
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent={{ md: 'flex-start', xs: 'space-between' }}
                  >
                    <Stack
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <Typography
                        fontWeight={500}
                        fontSize={12}
                        variant="subtitle2"
                        sx={{ mr: 1, color: '#f39c12' }}
                      >
                        {formatNumber(row.stargazers_count ?? 0)}
                      </Typography>
                      <Icon
                        icon="solar:star-bold"
                        width="18px"
                        height="18px"
                        color="#f39c12"
                      />
                    </Stack>
                    <Stack
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      sx={{ mx: 3 }}
                    >
                      <Typography
                        fontWeight={500}
                        fontSize={12}
                        variant="subtitle2"
                        sx={{ mr: 1, color: '#4caf50' }}
                      >
                        {formatNumber(row.forks_count ?? 0)}
                      </Typography>
                      <Icon
                        icon="solar:branching-paths-up-bold-duotone"
                        width="18px"
                        height="18px"
                        color="#4caf50"
                      />
                    </Stack>
                    <Stack
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <Typography
                        fontWeight={500}
                        fontSize={12}
                        variant="subtitle2"
                        sx={{ mr: 1, color: '#9c27b0' }}
                      >
                        {formatNumber(row.watchers_count ?? 0)}
                      </Typography>
                      <Icon
                        icon="solar:eye-bold-duotone"
                        width="18px"
                        height="18px"
                        color="#9c27b0"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            ))}

          {isError && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                icon="solar:danger-triangle-bold-duotone"
                width={24}
                color="#d32f2f"
              />
              <Typography color="error">Something went wrong</Typography>
            </Stack>
          )}

          {!isError && (!data || data.length === 0) && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                icon="solar:folder-question-bold-duotone"
                width={24}
                color="#9e9e9e"
              />
              <Typography color="text.secondary">
                User does not have any repositories
              </Typography>
            </Stack>
          )}
        </Stack>
      )}
      {isLoading && (
        <Box>
          <Skeleton height={75} data-testid="skeleton" />
          <Skeleton height={75} data-testid="skeleton" />
          <Skeleton height={75} data-testid="skeleton" />
        </Box>
      )}
    </AccordionDetails>
  )
}

export default AccordionDetail
