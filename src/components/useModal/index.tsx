import React, { PropsWithChildren } from "react"

interface IModalProps {}

const OpenModal: React.FC<PropsWithChildren<IModalProps>> = ({ children }) => {
  return <>{children}</>
}
const ClosedModal: React.FC<PropsWithChildren<IModalProps>> = () => {
  return null
}

type IUseModal = (params: { isOpenInitially: boolean }) => [typeof OpenModal, () => void, () => void]

export const useModal: IUseModal = ({ isOpenInitially }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(() => isOpenInitially)

  const Modal = isModalOpen ? OpenModal : ClosedModal
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return [Modal, openModal, closeModal]
}
