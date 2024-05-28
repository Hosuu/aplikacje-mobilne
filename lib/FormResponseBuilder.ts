export type FieldState = "DEFAULT" | "ERROR" | "SUCCESS"

interface FieldStateEntry {
  state: FieldState
  message: string
}

export interface BaseFormResponse {
  field: Record<string, FieldStateEntry>
}

export default class FormResponseBuilder implements BaseFormResponse {
  public field: Record<string, FieldStateEntry>

  constructor(prevState?: BaseFormResponse) {
    this.field = {}
    Object.assign(this, prevState)
  }

  public setFieldState(name: string, state: FieldState, message: string) {
    this.field[name] = { state, message }
  }

  public get asPlain(): BaseFormResponse {
    const text = JSON.stringify(this)
    return JSON.parse(text)
  }
}
