"use client"

import { BaseFormResponse } from "@/lib/FormResponseBuilder"
import { FC, createContext, type HTMLProps, type ReactNode } from "react"

interface FormWrapperProps extends HTMLProps<HTMLFormElement> {
  label: string
  children: ReactNode
  result: BaseFormResponse | undefined
}

export const FormResponseContext = createContext<BaseFormResponse | undefined>(undefined)

export const FormWrapper: FC<FormWrapperProps> = ({ children, label, result, ...props }) => {
  return (
    <FormResponseContext.Provider value={result}>
      <form action={props.action}>
        <div className='flex flex-col p-6 gap-4 rounded-lg border border-zinc-800 bg-zinc-950'>
          <h1 className='text-white text-2xl leading-8 font-bold'>{label}</h1>
          {children}
        </div>
      </form>
    </FormResponseContext.Provider>
  )
}
