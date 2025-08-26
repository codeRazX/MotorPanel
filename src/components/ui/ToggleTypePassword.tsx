import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"

type ToggleTypePasswordProps = {
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ToggleTypePassword ({setShowPassword, showPassword}: ToggleTypePasswordProps) {
  

  return (
    <button 
      type="button"
      className="absolute right-2 top-14 cursor-pointer"
      onClick={() => setShowPassword(prev => !prev)}
    >
      {showPassword ?  (<EyeIcon className={`size-6 text-neutral-400 hover:text-neutral-300 `} />) : (<EyeSlashIcon className={`size-6 text-neutral-400 hover:text-neutral-300`} />)}
    </button>
  )
}