import { useEffect, useState } from 'react'
import { selectSum } from '../../../store/reducer/home/homeSelector'
import { setFirstInput, setSecondInput } from '../../../store/reducer/home/homeSlice'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'

export default () => {
  const sum: number = useAppSelector(selectSum)
  const dispatch = useAppDispatch()

  const onChangeInput1 = (text: string) => dispatch(setFirstInput(parseInt(text) || 0))
  const onChangeInput2 = (text: string) => dispatch(setSecondInput(parseInt(text) || 0))

  return {
    sum,
    onChangeInput1,
    onChangeInput2
  }
}
