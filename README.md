# modal-supporter

This is a library that helps with popping up modals in React.
react에서 모달 띄우는 작업을 도와주는 라이브러리입니다.

## Installation

```bash
# npm
$ npm i modal-supporter

# yarn
$ yarn add modal-supporter

# pnpm
$ pnpm add modal-supporter
```

## How to use

```tsx
// main.tsx
import { ModalControllerProvider } from 'modal-supporter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalControllerProvider>
      <App />
    </ModalControllerProvider>
  </React.StrictMode>,
)
```

```tsx
// TestModal.tsx
import { ModalDefaultProps } from 'modal-supporter'

const TestModal = ({ resolve }: ModalDefaultProps) => {
  return (
    <div>
      <h1>hello world</h1>

      <button onClick={() => resolve(false)}>No</button>
      <button onClick={() => resolve(true)}>Ok</button>
    </div>
  )
}

export default TestModal
```

```tsx
// App.tsx
import TestModal from './TestModal'
import { useModalController } from 'modal-supporter'

function App() {
  const modalController = useModalController()

  const onClick = async () => {
    const result = await modalController.push('TestModal', TestModal)

    console.log(result)
  }

  return (
    <main>
      <button onClick={onClick}>open</button>
    </main>
  )
}

export default App
```
