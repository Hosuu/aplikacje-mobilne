"use client"

import { type FieldStateMap } from "@/lib/FieldStateBuilder"
import { createContext, type FC, type HTMLProps, type ReactNode } from "react"

interface FormContext {
  isSettled: boolean
  fieldState?: FieldStateMap
}

export const FormResponseContext = createContext<FormContext>({ isSettled: false })

interface FormWrapperProps extends Omit<HTMLProps<HTMLFormElement>, "label"> {
  label: ReactNode
  children: ReactNode
  result: FieldStateMap | undefined
}
export const FormWrapper: FC<FormWrapperProps> = ({ children, label, result, ...props }) => {
  const isSettled = result?.finalResult?.settled ?? false

  return (
    <FormResponseContext.Provider value={{ isSettled, fieldState: result }}>
      <form {...props}>
        <div className='flex flex-col p-6 pt-8 gap-4 rounded-lg border border-zinc-800 bg-zinc-950'>
          <h1 className='text-white text-2xl leading-8 font-bold'>{label}</h1>
          {children}
        </div>
      </form>
    </FormResponseContext.Provider>
  )
}
