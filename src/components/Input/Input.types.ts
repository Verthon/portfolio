export type InputProps = {
  error?: boolean
  onInput: React.FormEventHandler<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>