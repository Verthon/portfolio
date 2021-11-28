export type Props = {
  tabProps: {
    tab: string
    name: string
    description: string
  }
  activeHeader: string
  handleClick: React.MouseEventHandler<HTMLLIElement>
}