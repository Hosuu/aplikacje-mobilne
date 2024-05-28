export type FieldStatus = "DEFAULT" | "SUCCESS" | "ERROR"

export interface FieldState {
  state: FieldStatus
  message: string
}

export type FieldStateMap = Partial<Record<string, FieldState>> & { finalResult?: FieldState & { settled: boolean } }

export const statusAccentMap: Record<FieldStatus, string | undefined> = {
  DEFAULT: undefined,
  ERROR: "red-500",
  SUCCESS: "green-500",
}

export default class FieldStateBuilder {
  private fields: FieldStateMap

  constructor(prevState?: FieldStateMap) {
    this.fields = {}
    Object.assign(this, prevState)
  }

  public setFieldState(name: string, state: FieldStatus, message: string): void {
    this.fields[name] = { state, message }
  }

  public setFinalResult(state: FieldStatus, message: string, settled: boolean): void {
    this.fields.finalResult = { state, message, settled }
  }

  public hasAnyErrorFields(): boolean {
    return Object.values(this.fields).some((s) => s!.state === "ERROR")
  }

  public get jsonObject() {
    return this.fields
  }
}
