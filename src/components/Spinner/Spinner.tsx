import * as React from "react"

import type { Props } from "./Spinner.types";

export const Spinner = ({ isActive }: Props) => {
  if(!isActive) {
    return null
  }

  return (
    <div className="lds-ring" role="progressbar">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};