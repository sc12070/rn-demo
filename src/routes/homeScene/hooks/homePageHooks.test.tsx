import useHomePageHooks from '../hooks/homePageHooks'
import { renderHook, act } from '@testing-library/react-hooks'

describe('sum', () => {
  test('useHomePageHooks', () => {
    const { result } = renderHook(() => useHomePageHooks())
    const { onChangeInput1, onChangeInput2 } = result.current

    act(() => {
      onChangeInput1('1')
    })
    expect(result.current.sum).toBe(1)

    act(() => {
      onChangeInput2('5')
    })
    expect(result.current.sum).toBe(6)

    act(() => {
      onChangeInput2('abc')
    })
    expect(result.current.sum).toBe(1)
  })
})
