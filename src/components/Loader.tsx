import { css } from '@emotion/react'
import { ElementType, ForwardedRef, forwardRef } from 'react'

const _Loader = ({ Component }: Props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Component
      css={css`
        height: 20px;
      `}
      ref={ref}
    />
  )
}

const Loader = forwardRef(_Loader)

interface Props {
  Component: ElementType
}

export default Loader
