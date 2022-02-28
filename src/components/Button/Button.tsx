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

export const Button = ({ variant, size, children, link, href, type, onClick, loading, className }: Props) => {
  // if (link) {
  //   return (
  //     <Link to={link}>
  //       <a className={generateClassName(variant, size)}>{children}</a>
  //     </Link>
  //   )
  // }
  if (href) {
    return (
      <a className={generateClassName(variant, size)} href={href}>
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