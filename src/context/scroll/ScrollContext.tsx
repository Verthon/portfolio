import * as React from "react";

import type { ScrollDispatch, ScrollState } from "./ScrollContext.types";

export const ScrollDispatchContext = React.createContext<ScrollDispatch | undefined>(undefined)
export const ScrollStateContext = React.createContext<ScrollState | undefined>(undefined)