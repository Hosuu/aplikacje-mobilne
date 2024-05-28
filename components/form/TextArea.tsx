"use client"

import { FieldState } from "@/lib/FormResponseBuilder"
import { FC, useContext, useEffect, useState, type HTMLProps } from "react"
import { useFormStatus } from "react-dom"
import { FormResponseContext } from "./FormWrapper"

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  label: string
  id: string
}

const stateAccentMap: Record<FieldState, string | undefined> = {
  DEFAULT: undefined,
  ERROR: "red-500",
  SUCCESS: "green-500",
}

export const TextArea: FC<TextAreaProps> = ({ label, id, name, ...props }) => {
  const [value, setValue] = useState<string>(String(props.value || ""))

  const { pending } = useFormStatus()
  const [state, setState] = useState<FieldState>("DEFAULT")
  const [stateMessage, setStateMessage] = useState<string | undefined>(undefined)
  const formResponseContext = useContext(FormResponseContext)

  useEffect(() => {
    if (formResponseContext && name && name in formResponseContext.field) {
      setState(formResponseContext.field[name].state)
      setStateMessage(formResponseContext.field[name].message)
    }
  }, [formResponseContext, name])

  const accentColor = !pending && stateAccentMap[state]

  return (
    <div className='flex flex-col gap-3 justify-stretch'>
      <label className={`text-xs leading-4 font-medium text-${accentColor || "zinc-400"}`} htmlFor={id}>
        {label}
      </label>
      <div className='flex flex-col gap-2 justify-stretch'>
        <textarea
          className={`p-2
          border border-${accentColor || "zinc-800"} rounded-md outline-none
          text-sm leading-5 font-normal
          text-${accentColor || "white"} ${pending && "text-zinc-400"} placeholder:text-zinc-500 disabled:text-zinc-500
          bg-transparent disabled:bg-zinc-900
          disabled:cursor-not-allowed`}
          disabled={pending}
          autoComplete='off'
          {...props}
          id={id}
          onChange={(e) => {
            setValue(e.target.value)
            props.onChange?.(e)
            setState("DEFAULT")
            setStateMessage(undefined)
          }}
          value={value}
        />
        <p className={`text-xs leading-4 font-normal text-${accentColor || "zinc-500"}`}>
          {state != "DEFAULT" && !pending && stateMessage}
        </p>
      </div>
    </div>
  )
}
