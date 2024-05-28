"use client"

import { statusAccentMap, type FieldStatus } from "@/lib/FieldStateBuilder"
import { FC, useContext, useEffect, useState, type HTMLProps } from "react"
import { useFormStatus } from "react-dom"
import { FormResponseContext } from "./FormWrapper"

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  id: string
}

export const Input: FC<InputProps> = ({ label, id, name, ...props }) => {
  const [value, setValue] = useState<string>(String(props.defaultValue || ""))

  const { pending } = useFormStatus()
  const [status, setStatus] = useState<FieldStatus>("DEFAULT")
  const [message, setMessage] = useState<string | undefined>(undefined)
  const { isSettled, fieldState } = useContext(FormResponseContext)

  useEffect(() => {
    if (fieldState && name && name in fieldState) {
      setStatus(fieldState[name]!.state)
      setMessage(fieldState[name]!.message)
    }
  }, [fieldState, name])

  const accentColor = !pending && statusAccentMap[status]
  const shouldBeDisabled = pending || isSettled || props.disabled

  return (
    <div className='flex flex-col gap-3 justify-stretch'>
      <label className={`text-xs leading-4 font-medium text-${accentColor || "zinc-400"}`} htmlFor={id}>
        {label}
      </label>
      <div className='flex flex-col gap-2 justify-stretch'>
        <input
          className={`p-2
          border border-${accentColor || "zinc-800"} rounded-md outline-none
          text-sm leading-5 font-normal
          text-${accentColor || "white"} ${pending && "text-zinc-400"} placeholder:text-zinc-500 disabled:text-zinc-500
          bg-transparent disabled:bg-zinc-900
          disabled:cursor-not-allowed`}
          {...props}
          id={id}
          onChange={(e) => {
            props.onChange?.(e)
            setValue(e.target.value)
            setStatus("DEFAULT")
            setMessage(undefined)
          }}
          value={value}
          name={name}
          disabled={shouldBeDisabled}
        />
        <p className={`text-xs leading-4 font-normal text-${accentColor || "zinc-500"}`}>
          {status != "DEFAULT" && !pending && message}
        </p>
      </div>
    </div>
  )
}
