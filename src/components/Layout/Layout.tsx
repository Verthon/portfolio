import * as React from 'react'

import { Header } from '../Header/Header'


export const Layout = ({ children, scrollFunction }: Props) => {

  return (
    <>
      <Header
        scroll={scrollFunction}
      />
      {children}
    </>
  )
}
