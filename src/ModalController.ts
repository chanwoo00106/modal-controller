import React from 'react'
import { Modal, ModalDefaultProps } from '.'
import notifyManager from './notifyManager'

export class ModalController {
  #modalStack: Modal[] = []

  unmount() {
    this.#modalStack = []
    notifyManager.flush()
  }

  get modalStack() {
    return [...this.#modalStack]
  }

  top() {
    return this.#modalStack.at(-1)
  }

  pop() {
    this.#modalStack.pop()
    notifyManager.run()
  }

  clear() {
    while (this.top()) this.pop()
    notifyManager.run()
  }

  async push<P extends object = any>(
    key: string,
    Component: (props: ModalDefaultProps) => React.ReactNode,
    props?: P,
  ) {
    if (this.#modalStack.find((modal) => modal.key === key))
      throw new Error('should not have modals with the same id')

    return new Promise((resolve) => {
      this.#modalStack.push(
        new Modal({
          key,
          Component,
          props,
          resolve: (value: any) => this.handlePromise(key, resolve, value),
        }),
      )

      notifyManager.run()
    })
  }

  private handlePromise(
    key: string,
    resolver: (value: any) => void,
    value: any,
  ) {
    resolver(value)
    this.#modalStack = this.#modalStack.filter((modal) => modal.key !== key)
    notifyManager.run()
  }
}
