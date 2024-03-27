import React from 'react'

export type ModalDefaultProps<T extends object = object, R = any> = T & {
  resolve: (value: R) => void
}

interface ModalType<P extends object = any> {
  key: string
  Component: (props: ModalDefaultProps<P>) => React.ReactNode
  props?: P
  resolve: (value: any) => void
}

export class Modal<P extends object = any> implements ModalType<P> {
  readonly key: string
  readonly Component: (props: ModalDefaultProps<P>) => React.ReactNode
  readonly props?: P
  readonly resolve: (value: any) => void

  constructor(config: ModalType<P>) {
    this.key = config.key
    this.Component = config.Component
    this.props = config.props
    this.resolve = config.resolve
  }
}
