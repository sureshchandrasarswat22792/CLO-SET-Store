import React from 'react';
import type { ContentItem } from '../features/contents/contentsTypes';
import { Pricing } from '../features/contents/contentsTypes'

export default function ContentCard({ item }: { item: ContentItem }) {
  const RenderPrice = ():JSX.Element | null => {
    switch (item.pricingOption.toString()) {
      case Pricing.Paid:
        return <span className="text-[18px] font-semibold text-white">${item.price?.toFixed(2)}</span>
      case Pricing.Free:
        return <span className="text-[16px] font-semibold text-white">FREE</span>
      case Pricing.View_Only:
        return <span className="text-[16px] font-semibold text-white">View Only</span>
      default:
        return null
    }
  }
  return (
    <div className=" rounded-xl shadow flex flex-col">
      <div className="w-full rounded-md overflow-hidden h-full">
        <img src={item.imagePath} alt={item.title} className="object-cover h-full w-full" />
      </div>
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="font-semibold text-sm text-zinc-300 truncate">{item.title}</h3>
          <p className="text-xs text-pink-400">{item.creator}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <RenderPrice />
        </div>
      </div>
    </div>
  )
}
