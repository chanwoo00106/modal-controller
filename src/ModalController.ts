import React from 'react'
import { Modal, ModalDefaultProps } from '.'
import notifyManager from './notifyManager'

type ComponentType = (props: ModalDefaultProps<any, any>) => React.ReactNode

type ComponentFirstParameter<T> = T extends (
  props: ModalDefaultProps<infer P>,
) => any
  ? P
  : never

type ComponentSecondParameter<T> = T extends (
  props: ModalDefaultProps<infer _P, infer R>,
) => any
  ? R
  : never

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

  async push<
    C extends ComponentType,
    P = ComponentFirstParameter<C>,
    R = ComponentSecondParameter<C>,
  >(key: string, Component: C, props?: P): Promise<R> {
    if (this.#modalStack.find((modal) => modal.key === key))
      throw new Error('should not have modals with the same id')

    return new Promise<R>((resolve) => {
      this.#modalStack.push(
        new Modal({
          key,
          Component,
          props,
          resolve: (value: R) => this.handlePromise<R>(key, resolve, value),
        }),
      )

      notifyManager.run()
    })
  }

  private handlePromise<R>(key: string, resolve: (value: R) => void, value: R) {
    resolve(value)
    this.#modalStack = this.#modalStack.filter((modal) => modal.key !== key)
    notifyManager.run()
  }
}
