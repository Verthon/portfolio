import type { Quote } from "../../types/quote.types";

export type QueryData = {
  site: {
    siteMetadata: {
      quote: Quote
      tabsHeaders: any
      tabsContent: any
    }
  }
}