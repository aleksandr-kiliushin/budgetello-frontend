import { css } from "@emotion/react"
import { ElementType, ForwardRefRenderFunction, ForwardedRef, forwardRef } from "react"

interface ILoaderProps {
  Component: ElementType
}

const _Loader: ForwardRefRenderFunction<HTMLDivElement, ILoaderProps> = (
  { Component },
  ref: ForwardedRef<HTMLDivElement>
) => (
  <Component
    css={css`
      height: 20px;
    `}
    ref={ref}
  />
)

export const Loader = forwardRef(_Loader)
