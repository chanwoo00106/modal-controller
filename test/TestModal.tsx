import React from 'react'
import { ModalDefaultProps } from '../src/Modal'

const TestModal = ({ resolve }: ModalDefaultProps) => {
  return (
    <div>
      <button onClick={() => resolve(true)}>Ok</button>
    </div>
  )
}

export default TestModal
