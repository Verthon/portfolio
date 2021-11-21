import * as React from "react"

export const Spinner = ({ isActive }) => {
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