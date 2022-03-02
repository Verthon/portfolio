import type { InputProps } from "../Input/Input.types";
import type { LabelProps } from "../Label/Label.types";

export type InputFieldProps = {
  value: InputProps["value"]
  error: InputProps["error"]
  onInput: InputProps["onInput"]
  label: LabelProps["label"]
}