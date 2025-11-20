export default function SkeletonBlock({
  height,
  className = '',
}: {
  height: number | string
  className?: string
}) {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className}`}
      style={{ height }}
    />
  )
}
