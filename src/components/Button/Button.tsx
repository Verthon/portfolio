import * as React from "react";
import { Spinner } from "../Spinner/Spinner";
// import { Link } from "gatsby";

import type { Props } from "./Button.types";
import * as styles from "./Button.module.css"



const generateClassName = (variant: Props["variant"], size: Props["size"], className?: string) => {
  if (className) {
    return [styles.btn, styles[size], styles[variant], className].join(" ")
  }
  return [styles.btn, styles[size], styles[variant]].join(" ")
}

export const Button = ({ variant, size = "regular", children, href, type, onClick, loading, className, rel, ariaLabel, target }: Props) => {
  if (href) {
    return (
      <a className={generateClassName(variant, size)} href={href} rel={rel} aria-label={ariaLabel} target={target}>
        {children}
      </a>
    )
  }
  const cls = generateClassName(variant, size)
  console.log(cls)
  return (
    <button className={generateClassName(variant, size, className)} type={type} onClick={onClick} disabled={loading}>
      {children} {loading ? <Spinner isActive={loading} /> : null}
    </button>
  )
}