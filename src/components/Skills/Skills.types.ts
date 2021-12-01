import type { Quote } from "../../types/quote.types";
import type { TabsContentTuple, TabsHeader } from "../../types/tabs.types";

export type QueryData = {
  site: {
    siteMetadata: {
      quote: Quote
      tabsHeaders: TabsHeader[]
      tabsContent: TabsContentTuple
    }
  }
}