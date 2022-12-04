import { renderHook, act } from '@testing-library/react-hooks'
import { renderWrapper } from 'utils/providerWrapper'
import { store } from 'store/store'

import useHomePageHooks from '../hooks/homePageHooks'

describe('Home page', () => {
    test('useHomePageHooks', () => {
        const { result } = renderHook(() => useHomePageHooks(), {
            wrapper: renderWrapper(store)
        })
        // expect(result.current.sum).toBe(0)

        // const { onChangeInput1, onChangeInput2 } = result.current

        // act(() => {
        //   onChangeInput1('1')
        // })
        // expect(result.current.sum).toBe(1)

        // act(() => {
        //   onChangeInput2('5')
        // })
        // expect(result.current.sum).toBe(6)

        // act(() => {
        //   onChangeInput2('abc')
        // })
        // expect(result.current.sum).toBe(1)
    })
})
