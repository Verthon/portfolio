import * as React from "react"

import { ScrollStateContext } from "../context/scroll/ScrollContext"


export const useScrollState = () => {
  const context = React.useContext(ScrollStateContext)

  if (context === undefined) {
    throw new Error("useScrollState must be used within a ScrollProvider")
  }

  return context
}