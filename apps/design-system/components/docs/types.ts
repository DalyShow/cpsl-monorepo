export type SelectControl<T extends string = string> = {
  type:        "select"
  prop:        string
  label:       string
  options:     readonly T[]
  default:     T
  description?: string
}

export type SwitchControl = {
  type:        "switch"
  prop:        string
  label:       string
  default:     boolean
  description?: string
}

export type TextControl = {
  type:        "text" | "textarea"
  prop:        string
  label:       string
  default:     string
  placeholder?: string
  description?: string
}

export type Control = SelectControl | SwitchControl | TextControl

export type ControlsState = Record<string, string | boolean>

export type PropDoc = {
  name:     string
  type:     string
  default?: string
  required?: boolean
  description: string
}
