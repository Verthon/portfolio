import type { ContactFormState } from '../components/Contact/Form/Form.const'
import { getJSON } from './async'

export const sendEmail = async ({ data }: { data: ContactFormState }) => {
  const URL = 'https://formspree.io/mzbjzzek'
  const CONFIG = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }

  const res = await fetch(URL, CONFIG)

  return getJSON(res)
}
