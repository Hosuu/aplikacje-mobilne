"use client"
import { FC } from "react"

interface InputProps {
  name: string
  label: string
  className?: string
  disabled?: boolean
  value?: string
}

export const Input: FC<InputProps> = ({ name, label, className, disabled, value }) => {
  return (
    <div className={"relative " + className}>
      <input
        type='text'
        name={name}
        placeholder=''
        disabled={disabled}
        value={value}
        className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent disabled:cursor-not-allowed rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
      />

      <label className='absolute text-sm pointer-events-none text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
        {label}
      </label>
    </div>
  )
}
