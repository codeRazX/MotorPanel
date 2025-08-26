
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/20/solid"

type FieldDetailslLabelListProps = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  label: string
}

export default function FieldDetailslLabelList({show, setShow, label} : FieldDetailslLabelListProps) {
  
  return (
    <p className="text-medium font-bold text-slate-700 flex items-center gap-2">
      {label}{" "}
      {show ? 
      (
        <BarsArrowUpIcon
          className="size-6 text-slate-800 relative top-1 cursor-pointer hover:text-slate-900"
          onClick={() => setShow((prev) => !prev)}
        />

      ) : (
        <BarsArrowDownIcon
          className="size-6 text-slate-800 relative top-1 cursor-pointer hover:text-slate-900"
          onClick={() => setShow((prev) => !prev)}
        />
      )}
    </p>
  )
}
