"use client"

import { FieldState } from "@/lib/FormResponseBuilder"
import { LucideLoader } from "lucide-react"
import { FC, type HTMLProps } from "react"
import { useFormStatus } from "react-dom"

interface SubmitButtonProps extends HTMLProps<HTMLButtonElement> {
  label: string
  state?: FieldState
  message?: string
}

const stateAccentMap: Record<FieldState, string | undefined> = {
  DEFAULT: undefined,
  ERROR: "red-500",
  SUCCESS: "green-500",
}

export const SubmitButton: FC<SubmitButtonProps> = ({ label, state = "DEFAULT", message, ...props }) => {
  const { pending } = useFormStatus()

  const accentColor = !pending && stateAccentMap[state]

  return (
    <button
      className={`flex justify-center px-2 py-2.5 rounded-md
      bg-${accentColor || "zinc-100"}
      text-sm leading-5 font-normal text-zinc-900
      disabled:cursor-wait ${props.className}`}
      {...props}
      type='submit'
      disabled={props.disabled || pending}>
      {pending ? <LucideLoader size={20} /> : state != "DEFAULT" ? message || label : label}
    </button>
  )
}
