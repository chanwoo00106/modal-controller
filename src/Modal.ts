import React from 'react'

export type ModalDefaultProps<T extends object = object, R = any> = T & {
  resolve: (value: R) => void
}

interface ModalType {
  key: string
  Component: (props: ModalDefaultProps) => React.ReactNode
  props?: any
  resolve: (value: any) => void
}

export class Modal implements ModalType {
  readonly key: string
  readonly Component: (props: ModalDefaultProps) => React.ReactNode
  readonly props?: any
  readonly resolve: (value: any) => void

  constructor(config: ModalType) {
    this.key = config.key
    this.Component = config.Component
    this.props = config.props
    this.resolve = config.resolve
  }
}
