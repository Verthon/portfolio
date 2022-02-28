export type Props = {
  variant: "primary" | "secondary"
  size: "regular" | "large" | "small"
  children: React.ReactNode
  link?: string
  href?: string
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
  type?: "submit" | "button"
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>