import { TabHeaderName } from "../../types/tabs.types";

export type Props = {
  tabProps: {
    name: TabHeaderName
    description: string
  }
  active: boolean
  handleClick: React.MouseEventHandler<HTMLLIElement>
}