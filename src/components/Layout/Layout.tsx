import * as React from 'react'

import { Header } from '../Header/Header'
import type { Props } from './Layout.types'


export const Layout = ({ children, scrollToComponent }: Props) => {

  return (
    <>
      <Header
        scrollToComponent={scrollToComponent}
      />
      {children}
    </>
  )
}
