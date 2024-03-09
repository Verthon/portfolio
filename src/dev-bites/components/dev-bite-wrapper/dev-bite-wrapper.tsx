import { Slot, component$ } from '@builder.io/qwik'

import DevBiteContainer from '../dev-bite-container/dev-bite-container'

import { devBiteWrapper } from './dev-bite-wrapper.module.css'

export default component$(() => {
  return (
    <div class={devBiteWrapper}>
      <DevBiteContainer>
        <Slot />
      </DevBiteContainer>
    </div>
  )
})
