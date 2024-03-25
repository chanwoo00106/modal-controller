# modal-controller

A library that helps with displaying modals in React.  
React에서 모달 띄우는 작업을 도와주는 라이브러리입니다.

## Installation

```bash
# npm
$ npm i modal-controller

# yarn
$ yarn add modal-controller

# pnpm
$ pnpm add modal-controller
```

## How to use

[CodeSandbox example code](https://codesandbox.io/p/devbox/introduce-modal-library-jzcdyv?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clu6ikdtr00073b6ggak9a810%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clu6ikdtr00023b6g5rck09wz%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clu6ikdtr00043b6goz89ucix%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clu6ikdtr00063b6g34enjxvh%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clu6ikdtr00023b6g5rck09wz%2522%253A%257B%2522id%2522%253A%2522clu6ikdtr00023b6g5rck09wz%2522%252C%2522tabs%2522%253A%255B%255D%257D%252C%2522clu6ikdtr00063b6g34enjxvh%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clu6ikdtr00053b6g7wmcnmzh%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clu6ikdtr00063b6g34enjxvh%2522%252C%2522activeTabId%2522%253A%2522clu6ikdtr00053b6g7wmcnmzh%2522%257D%252C%2522clu6ikdtr00043b6goz89ucix%2522%253A%257B%2522id%2522%253A%2522clu6ikdtr00043b6goz89ucix%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clu6ikdtr00033b6gs4ej5hpj%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clu6ikdtr00033b6gs4ej5hpj%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

```tsx
// main.tsx
import { ModalControllerProvider } from 'modal-controller'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalControllerProvider>
      <App />
    </ModalControllerProvider>
  </React.StrictMode>,
)
```

```tsx
// Modal.tsx
import { ModalDefaultProps } from 'modal-controller'

interface Props {
  title: string
}

const Modal = ({ resolve, title }: ModalDefaultProps<Props>) => {
  return (
    <div>
      <h1>{title}</h1>

      <button onClick={() => resolve(false)}>Cancel</button>
      <button onClick={() => resolve(true)}>Ok</button>
    </div>
  )
}

export default Modal
```

```tsx
// App.tsx
import { useModalController } from 'modal-controller'
import Modal from './Modal'

function App() {
  const modalController = useModalController()

  const onClick = async () => {
    const result = await modalController.push('Modal', Modal, {
      title: 'wow',
    })

    alert(result)
  }

  return (
    <main>
      <button onClick={onClick}>open modal</button>
    </main>
  )
}

export default App
```
