export default function Section({
  id,
  title,
  children,
  className = '',
}: {
  id?: string
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`py-20 px-4 max-w-6xl mx-auto ${className}`}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}
