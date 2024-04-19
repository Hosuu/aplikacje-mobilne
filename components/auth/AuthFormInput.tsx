import { FC, HTMLInputTypeAttribute } from "react"
import { useFormStatus } from "react-dom"

interface LoginInputProps {
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

const AuthFormInput: FC<LoginInputProps> = ({
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
      <input
        className='peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 disabled:cursor-not-allowed'
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={pending || disabled}
        minLength={minLength}
      />
    </div>
  )
}

export default AuthFormInput
