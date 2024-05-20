import { FC, HTMLInputTypeAttribute } from "react"
import { useFormStatus } from "react-dom"

interface FormTextareaProps {
  label: string
  name: string
  type?: HTMLInputTypeAttribute
  className?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  minLength?: number
  defaultValue?: string
}

const FormTextarea: FC<FormTextareaProps> = ({
  label,
  name,
  type,
  placeholder,
  required,
  disabled,
  minLength,
  defaultValue,
}) => {
  const { pending } = useFormStatus()

  return (
    <div>
      <label className='mb-3 mt-5 block text-xs font-medium text-zinc-400' htmlFor={name}>
        {label}
      </label>
      <textarea
        className='peer block w-full rounded-md border  px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 border-zinc-800 bg-zinc-950 disabled:bg-zinc-900 disabled:text-zinc-400 disabled:cursor-not-allowed min-h-16'
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={pending || disabled}
        minLength={minLength}
      />
    </div>
  )
}

export default FormTextarea
