import React from 'react'
import { Provider } from 'react-redux'

interface IProps {
    children: React.ReactNode
}

export const renderWrapper =
    (store: any) =>
    ({ children }: IProps) =>
        <Provider store={store}>{children}</Provider>
