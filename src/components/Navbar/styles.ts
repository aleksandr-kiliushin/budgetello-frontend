import { SxProps, Theme } from '@mui/material/styles'

import { mediaQuery } from '#styles/media-queries'

export const bottomNavigationSx: SxProps<Theme> = ({ palette }) => ({
  borderTop: `1px solid ${palette.primary.light}`,
  boxShadow: `0px -30px 30px ${palette.primary.light}10`,
  height: '60px',
  [mediaQuery.below.sm]: {
    height: '48px',
  },
})

export const bottomNavigationActionSx: SxProps<Theme> = ({ palette }) => ({
  '& .MuiSvgIcon-root': {
    fill: palette.primary.light,
    height: '1.5rem',
    transition: 'height 0.2s linear, width 0.2s linear, fill 0.2s linear',
    width: '1.5rem',
  },
  '&.Mui-selected .MuiSvgIcon-root': {
    fill: palette.primary.dark,
    height: '2.2rem',
    width: '2.2rem',
  },
  '&:hover .MuiSvgIcon-root': {
    fill: palette.primary.dark,
    transition: 'fill 0.2s linear',
  },
  maxWidth: '100%',
  minWidth: '40px',
  padding: '8px',
})
