"use client"

import { statusAccentMap, type FieldStatus } from "@/lib/FieldStateBuilder"
import { LucideLoader } from "lucide-react"
import { FC, useContext, useEffect, useState, type HTMLProps } from "react"
import { useFormStatus } from "react-dom"
import { FormResponseContext } from "./FormWrapper"

interface SubmitButtonProps extends HTMLProps<HTMLButtonElement> {
  label: string
}

export const SubmitButton: FC<SubmitButtonProps> = ({ label, ...props }) => {
  const { pending } = useFormStatus()

  const [status, setStatus] = useState<FieldStatus>("DEFAULT")
  const [message, setMessage] = useState<string | undefined>(undefined)
  const { isSettled, fieldState } = useContext(FormResponseContext)
  const name = "finalResult"

  useEffect(() => {
    if (fieldState && name && name in fieldState) {
      setStatus(fieldState.finalResult!.state)
      setMessage(fieldState.finalResult!.message)
    }
  }, [fieldState, name])

  const accentColor = !pending && statusAccentMap[status]
  const shouldBeDisabled = pending || isSettled || props.disabled

  return (
    <button
      className={`flex justify-center px-2 py-2.5 rounded-md
      bg-${accentColor || "zinc-100"}
      text-sm leading-5 font-bold text-zinc-900
      ${!isSettled && "disabled:cursor-wait"} ${props.className}`}
      {...props}
      type='submit'
      disabled={shouldBeDisabled}>
      {pending && <LucideLoader size={20} />}
      {!pending && (message || label)}
    </button>
  )
}
