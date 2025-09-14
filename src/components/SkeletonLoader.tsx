import React from 'react'

export default function SkeletonLoader({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white rounded p-3">
          <div className="h-80 bg-gray-200 rounded" />
          <div className="h-3 mt-3 bg-gray-200 rounded w-3/4" />
          <div className="h-3 mt-2 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}
