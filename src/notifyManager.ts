type Callback = () => void

const notifyManager = () => {
  let func: Callback = () => {}

  const add = (callback: Callback) => {
    func = callback
  }

  const run = () => {
    func()
  }

  const flush = () => {
    func()
    func = () => {}
  }

  return {
    add,
    run,
    flush,
  } as const
}

export default notifyManager()
