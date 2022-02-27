import * as React from 'react'

import { Header } from '../Header/Header'
import type { Props } from './Layout.types'


export const Layout = ({ children }: Props) => {

  return (
    <>
      <Header/>
      {children}
    </>
  )
}
