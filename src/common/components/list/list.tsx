import { component$ } from '@builder.io/qwik'

import { list, listItem } from './list.module.css'

type ListProps = {
  listItems: string[]
}

export default component$(({ listItems }: ListProps) => {
  return (
    <ul class={list}>
      {listItems.map((item) => (
        <li key={item} class={listItem}>
          {item}
        </li>
      ))}
    </ul>
  )
})
