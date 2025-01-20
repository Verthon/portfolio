import { component$ } from '@builder.io/qwik'

import { footer, footerWrapper } from './footer.module.css'
import FooterSocials from '../footer-socials/footer-socials'

export default component$(() => {
  return (
    <footer class={footer} role="contentinfo">
      <div class={footerWrapper}>
        <FooterSocials />
      </div>
    </footer>
  )
})
