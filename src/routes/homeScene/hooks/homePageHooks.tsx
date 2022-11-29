import { useEffect, useState } from 'react'

export default () => {
  const [input1, setInput1] = useState<number>(0)
  const [input2, setInput2] = useState<number>(0)
  const [sum, setSum] = useState<number>(0)

  const onChangeInput1 = (text: string) => {
    setInput1(parseInt(text) || 0)
  }

  const onChangeInput2 = (text: string) => {
    setInput2(parseInt(text) || 0)
  }

  useEffect(() => {
    setSum(input1 + input2)
  }, [input1, input2])

  return {
    sum,
    onChangeInput1,
    onChangeInput2
  }
}
