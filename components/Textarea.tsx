import { FC } from "react"

interface TextareaProps {
  name: string
  label: string
  className: string
  disabled?: boolean
}

export const Textarea: FC<TextareaProps> = ({ name, label, className, disabled }) => {
  return (
    <div className={"relative " + className}>
      <textarea
        name={name}
        placeholder=''
        disabled={disabled}
        className='block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:cursor-not-allowed'
      />

      <label className='absolute pointer-events-none text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[1.5rem] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
        {label}
      </label>
    </div>
  )
}
