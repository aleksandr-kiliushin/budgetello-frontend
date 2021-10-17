import React, { ReactNode } from 'react'

// Styles
import s from './index.module.css'

export const Modal = ({ children }: IProps) => {
	return <div className={s.Modal}>{children}</div>
}

interface IProps {
	children: ReactNode
}
