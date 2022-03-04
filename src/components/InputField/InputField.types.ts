import type { InputProps } from "../Input/Input.types";
import type { LabelProps } from "../Label/Label.types";

export type InputFieldProps = {
  value: InputProps["value"]
  error: InputProps["error"]
  handleChange: InputProps["handleChange"]
  name: InputProps["name"]
  textarea?: InputProps["textarea"]
  label: LabelProps["label"]
  errorMessage?: string
} & InputProps