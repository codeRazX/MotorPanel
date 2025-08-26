

export default function Logo() {
  return (
    <picture className="w-full" role="img" aria-label="Logo MotorPanel">
      <source srcSet="/logo.webp"/>
      <img src="/logo.png" alt="Logo MotorPanel"/>
    </picture>
  )
}
