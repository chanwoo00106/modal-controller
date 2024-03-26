import React from 'react'
import { ModalController } from '.'
import ModalContainer from './ModalContainer'

export const ModalControllerContext = React.createContext<
  ModalController | undefined
>(undefined)

export const useModalController = () => {
  const modalController = React.useContext(ModalControllerContext)

  if (!modalController) throw new Error('not found ModalController')

  return modalController
}

interface Props {
  children: React.ReactNode
  modalController: ModalController
}

export const ModalControllerProvider = ({
  children,
  modalController,
}: Props) => {
  React.useEffect(() => {
    return () => modalController.unmount()
  }, [])

  return (
    <ModalControllerContext.Provider value={modalController}>
      {children}
      <ModalContainer />
    </ModalControllerContext.Provider>
  )
}
