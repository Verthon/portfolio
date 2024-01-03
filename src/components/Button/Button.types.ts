import type React from 'react'

export type ButtonProps = {
  variant: 'primary' | 'secondary'
  size?: 'regular' | 'large' | 'small'
  children: React.ReactNode
  link?: string
  href?: string
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined
  type?: 'submit' | 'button'
  loading?: boolean
  ariaLabel?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>
