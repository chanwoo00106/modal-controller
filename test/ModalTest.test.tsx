import React from 'react'
import { screen, render, act } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ModalControllerProvider } from '../src/ModalProvider'
import { ModalController } from '../src/ModalController'
import TestModal from './TestModal'

describe('Modal test', () => {
  const modalController = new ModalController()

  beforeEach(() => {
    render(
      <ModalControllerProvider modalController={modalController}>
        <div />
      </ModalControllerProvider>,
    )
  })

  afterEach(() => {
    modalController.unmount()
  })

  it('should display TestModal component when execute push method', async () => {
    act(() => {
      modalController.push('ModalTest', TestModal)
    })

    const btn = await screen.findByRole('button', { name: 'Ok' })

    expect(btn).toBeInTheDocument()
  })

  it('should undisplay TestModal component when click Ok button', async () => {
    act(() => {
      modalController.push('ModalTest', TestModal)
    })
    const btn = await screen.findByRole('button', { name: 'Ok' })

    await userEvent.click(btn)

    expect(btn).not.toBeInTheDocument()
  })

  it('should be true result when click Ok button', async () => {
    let result: Promise<unknown> | undefined
    act(() => {
      result = modalController.push('ModalTest', TestModal)
    })

    const btn = await screen.findByRole('button', { name: 'Ok' })

    await userEvent.click(btn)

    expect(await result).toBe(true)
  })
})
