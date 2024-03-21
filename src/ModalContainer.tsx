import React from 'react'
import { createPortal } from 'react-dom'
import notifyManager from './notifyManager'
import { useModalController } from '.'

const MODAL_ID = 'modal-supporter'

const ModalContainer = () => {
  const modalController = useModalController()
  const top = modalController.top()

  React.useEffect(() => {
    if (document.getElementById(MODAL_ID)) return

    const modalDOM = document.createElement('div')
    modalDOM.id = MODAL_ID
    document.body.append(modalDOM)
  }, [])

  React.useSyncExternalStore(
    (callback) => {
      notifyManager.add(callback)
      return () => notifyManager.flush()
    },
    () => JSON.stringify(modalController.modalStack),
  )

  if (!top) return null

  return createPortal(
    <React.Fragment>
      {modalController.modalStack.map((modal) => (
        <modal.Component
          key={modal.key}
          {...(modal.props ?? {})}
          resolve={modal.resolve}
        />
      ))}
    </React.Fragment>,
    window.document.getElementById(MODAL_ID) as HTMLElement,
  )
}

export default ModalContainer
