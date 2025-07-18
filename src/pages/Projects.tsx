'use client'

import { Icon } from '@iconify/react'
import {
  Accordion,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useGetUsers } from '../hooks/useGetUsers'
import { useEffect, useState } from 'react'
import AccordionDetail from '../components/AccordionDetail'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormValues {
  search: string
}

const schema = yup.object({
  search: yup
    .string()
    .default('')
    .test(
      'not-only-spaces',
      'Search cannot be only spaces',
      (value) => !value || value.trim().length > 0,
    ),
})

export default function UserProjects() {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<number | false>(false)

  const { data, isLoading, isError, isFetched, error } = useGetUsers(query)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { search: '' },
    resolver: yupResolver(schema),
  })

  const onSubmit = (form: FormValues) => {
    setQuery(form.search)
  }

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      event.preventDefault()

      setExpanded(isExpanded ? panel : false)
    }

  useEffect(() => {
    if (isError) toast.error(error.message)
  }, [isError, error])

  return (
    <Container sx={{ pt: 5 }}>
      <Stack spacing={4}>
        <Typography
          sx={{ color: '#333' }}
          variant="h6"
          textAlign="center"
          fontWeight="bold"
        >
          📁 User Project List
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row" spacing={2}>
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                    },
                  }}
                  error={!!errors.search}
                  helperText={errors.search?.message}
                  fullWidth
                  label="Search GitHub Users"
                  variant="outlined"
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 3, height: 56 }}
            >
              Search
            </Button>
          </Stack>
        </form>

        {!isLoading && !isFetched && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              icon="solar:minimalistic-magnifer-line-duotone"
              width={24}
              color="#9e9e9e"
            />
            <Typography textAlign="center" color="text.secondary">
              Search GitHub user <strong>{query}</strong>.
            </Typography>
          </Stack>
        )}

        {isFetched && query && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              icon="solar:check-circle-bold-duotone"
              width={24}
              color="#4caf50"
            />
            <Typography textAlign="center" color="text.secondary">
              Showing results for <strong>{query}</strong>.
            </Typography>
          </Stack>
        )}

        {isLoading && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              icon="solar:atom-line-duotone"
              width={24}
              color="#1976d2"
              className="spin"
            />
            <Typography textAlign="center" color="text.secondary">
              Loading...
            </Typography>
          </Stack>
        )}

        <Stack spacing={2}>
          {isFetched && data && data?.length === 0 ? (
            <Typography textAlign="center" color="text.secondary">
              😕 No users found.
            </Typography>
          ) : (
            !!data &&
            data.map((user) => (
              <Accordion
                expanded={expanded === user.id}
                onChange={handleChange(user.id)}
                sx={{
                  ':before': { content: 'none' },
                  borderRadius: 3,
                  boxShadow: '0px 0px 8px 2px #eee',
                }}
                key={user.id}
                elevation={2}
              >
                <AccordionSummary
                  expandIcon={
                    <Icon
                      icon="solar:alt-arrow-down-outline"
                      width="24"
                      height="24"
                    />
                  }
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar src={user?.avatar_url} />
                    <Typography fontWeight={600}>{user.login}</Typography>
                  </Stack>
                </AccordionSummary>

                <AccordionDetail
                  username={user.login}
                  isOpen={expanded === user.id}
                />
              </Accordion>
            ))
          )}
        </Stack>
      </Stack>
      {isLoading && (
        <Box>
          <Skeleton height={75} />
          <Skeleton height={75} />
          <Skeleton height={75} />
          <Skeleton height={75} />
          <Skeleton height={75} />
        </Box>
      )}
    </Container>
  )
}
