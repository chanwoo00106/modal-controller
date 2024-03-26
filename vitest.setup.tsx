import React from 'react'
import { render } from '@testing-library/react'
import { ModalControllerProvider } from './src/ModalProvider'
import '@testing-library/jest-dom'
import { ModalController } from './src/ModalController'

beforeEach(() => {
  render(
    <ModalControllerProvider modalController={new ModalController()}>
      <div />
    </ModalControllerProvider>,
  )
})
