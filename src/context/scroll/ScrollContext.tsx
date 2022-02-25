import * as React from "react";

import type { ScrollDispatch } from "./ScrollContext.types";

export const ScrollDispatchContext = React.createContext<ScrollDispatch | undefined>(undefined)