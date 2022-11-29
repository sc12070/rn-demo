import React from 'react'
import { Provider } from 'react-redux'

interface Props {
  children: React.ReactNode
}

export const renderWrapper =
  (store: any) =>
  ({ children }: Props) =>
    <Provider store={store}>{children}</Provider>
