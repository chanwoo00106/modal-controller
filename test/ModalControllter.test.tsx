import React from 'react'
import { ModalController } from '../src/ModalController'
import { Modal } from '../src/Modal'
import notifyManager from '../src/notifyManager'

const TestModal = () => <div>hello world</div>

describe('ModalController Test', () => {
  const modalController = new ModalController()

  beforeEach(() => {
    modalController.unmount()
  })

  it('should have a modal with an id of "test1" when execute push method', () => {
    const modalId = 'test1'
    expect(modalController.top()).toBeUndefined()

    modalController.push(modalId, TestModal)

    const top = modalController.top()

    expect(modalController.modalStack.length).toBe(1)
    expect(top).toBeInstanceOf(Modal)
    expect(top?.key).toBe(modalId)
  })

  it('should not have modals with the same id', async () => {
    const modalId = 'test1'
    modalController.push(modalId, TestModal)

    await expect(() =>
      modalController.push(modalId, TestModal),
    ).rejects.toThrowError('should not have modals with the same id')
  })

  it('should not have a modal when execute unmount method', () => {
    modalController.push('test1', TestModal)
    expect(modalController.modalStack.length).toBe(1)

    modalController.unmount()

    expect(modalController.modalStack.length).toBe(0)
    expect(modalController.top()).toBeUndefined()
  })

  it("should run notifyManager's callback when execute push method", () => {
    const callback = vi.fn()
    notifyManager.add(callback)

    modalController.push('test1', TestModal)

    expect(callback).toHaveBeenNthCalledWith(1)
  })

  it("should run twice notifyManager's callback when execute push method and pop method", () => {
    const callback = vi.fn()
    notifyManager.add(callback)

    modalController.push('test1', TestModal)
    modalController.pop()

    expect(callback).toHaveBeenNthCalledWith(2)
  })

  it('should remove every modal on modalController when execute clear method', () => {
    modalController.push('test1', TestModal)
    modalController.push('test2', TestModal)
    modalController.push('test3', TestModal)
    modalController.push('test4', TestModal)
    modalController.push('test5', TestModal)

    expect(modalController.modalStack.length).toBe(5)

    modalController.clear()

    expect(modalController.modalStack.length).toBe(0)
  })
})
