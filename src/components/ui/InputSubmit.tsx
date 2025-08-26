

export default function InputSubmit({value}: {value: string}) {
  return (
    <input
      type="submit"
      value={value}
      className="py-3 bg-gradient-to-tl from-cyan-500 via-cyan-600 to-cyan-700 hover:contrast-125 w-full text-white font-extrabold uppercase cursor-pointer text-xl text-shadow-md"
    />
  )
}
