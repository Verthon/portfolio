export type InputProps = {
  error?: boolean
  handleChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | React.ChangeEventHandler<HTMLTextAreaElement>
  textarea?: boolean
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
