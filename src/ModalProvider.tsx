import React, { useEffect } from 'react'
import { ModalController } from 'ModalController'
import ModalContainer from 'ModalContainer'

const modalController = new ModalController()
export const ModalControllerContext = React.createContext(modalController)

export const useModalController = () => {
  const modalController = React.useContext(ModalControllerContext)

  return modalController
}

interface Props {
  children: React.ReactNode
}

export const ModalControllerProvider = ({ children }: Props) => {
  useEffect(() => {
    return () => modalController.unmount()
  }, [])

  return (
    <ModalControllerContext.Provider value={modalController}>
      {children}
      <ModalContainer />
    </ModalControllerContext.Provider>
  )
}
