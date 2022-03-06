import * as React from 'react'

import { Header } from '../Header/Header'
import type { LayoutProps } from './Layout.types'


export const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <Header/>
      {children}
    </>
  )
}
