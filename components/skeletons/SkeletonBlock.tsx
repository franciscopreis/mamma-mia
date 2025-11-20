interface SkeletonBlockProps {
  height: number | string
  width?: number | string
  className?: string
}

export default function SkeletonBlock({
  height,
  width,
  className = '',
}: SkeletonBlockProps) {
  const heightValue = typeof height === 'number' ? `${height}px` : height
  const widthValue =
    typeof width === 'number' ? `${width}px` : (width ?? '100%')

  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className}`}
      style={{
        height: heightValue,
        width: widthValue,
      }}
    />
  )
}
