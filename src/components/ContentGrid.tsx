import React from 'react'
import ContentCard from './ContentCard'
import type { ContentItem } from '../features/contents/contentsTypes';

interface ContentGridProps {
  items?: ContentItem []
}

export default function ContentGrid({ items = [] }: ContentGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((it) => (
        <ContentCard key={it.id} item={it} />
      ))}
    </div>
  )
}
