import React from 'react'
import { render } from '@testing-library/react'
import { ModalControllerProvider } from './src/ModalProvider'
import '@testing-library/jest-dom'

beforeEach(() => {
  render(
    <ModalControllerProvider>
      <div />
    </ModalControllerProvider>,
  )
})
