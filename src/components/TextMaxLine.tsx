import { ReactNode } from 'react'
import { Typography } from '@mui/material'

interface IProp {
  children: ReactNode
  line?: number
  sx?: object
  variant?:
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
  [key: string]: any // to support extra props like `data-testid`
}

const TextMaxLine = ({
  variant = 'body1',
  line = 2,
  children,
  sx,
  ...other
}: IProp) => {
  const style = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: line,
    WebkitBoxOrient: 'vertical',

    ...sx,
  }

  return (
    <Typography variant={variant} sx={{ ...style }} {...other}>
      {children}
    </Typography>
  )
}

export default TextMaxLine
