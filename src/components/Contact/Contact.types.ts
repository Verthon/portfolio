export type SubmitStatus = "idle" | "loading" |  "complete" | "error"

export type FormSubmitProps = {
  status: SubmitStatus
}