import * as React from "react"

import { ScrollDispatchContext } from "../context/scroll/ScrollContext"


export const useScrollDispatch = () => {
  const context = React.useContext(ScrollDispatchContext)

  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider")
  }

  return context
}