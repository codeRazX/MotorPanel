
type FieldDetailsProps = {
  label: string,
  value: string,
  capitalize?: boolean,
  sm?: boolean
}

export default function FieldDetails({label, value, capitalize = true, sm= false} : FieldDetailsProps) {
  return (
    <p className={`${sm ? 'text-sm text-slate-600' : 'text-medium text-slate-700'} font-bold`}>
      {label}:{" "}
      <span className={`font-normal break-words ${capitalize ? 'capitalize' : ''} ${sm ? 'text-slate-700 text-sm' : 'text-slate-800 text-base'}`}>
        {value}
      </span>
    </p>

  )
}
