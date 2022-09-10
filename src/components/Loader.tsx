import { css } from "@emotion/react"
import { ElementType, ForwardRefRenderFunction, ForwardedRef, forwardRef } from "react"

const _Loader: ForwardRefRenderFunction<HTMLDivElement, Props> = ({ Component }, ref: ForwardedRef<HTMLDivElement>) => (
  <Component
    css={css`
      height: 20px;
    `}
    ref={ref}
  />
)

const Loader = forwardRef(_Loader)

interface Props {
  Component: ElementType
}

export default Loader
