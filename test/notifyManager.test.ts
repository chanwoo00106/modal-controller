import { Mock } from 'vitest'
import notifyManager from '../src/notifyManager'

describe('notifyManager test', () => {
  let mockFn: Mock<any, any>

  beforeEach(() => {
    mockFn = vi.fn()
    notifyManager.add(mockFn)
  })

  afterEach(() => {
    notifyManager.flush()
  })

  it('should run callback function when execute run method', () => {
    notifyManager.run()

    expect(mockFn).toHaveBeenCalledOnce()
  })

  it('should twice run callback function when execute flush method', () => {
    notifyManager.flush()

    expect(mockFn).toHaveBeenCalledOnce()
  })

  it('should not be called callback function after flush is executed', () => {
    notifyManager.flush()

    notifyManager.run()

    expect(mockFn).toHaveBeenCalledOnce()
  })
})
