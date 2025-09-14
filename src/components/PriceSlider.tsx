import React, { useState, useEffect } from "react"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import type { ContentItem } from "../features/contents/contentsTypes"

interface PriceSliderProps {
    items?: ContentItem[],
    value: [number, number],
    onChange: (range: [number, number]) => void
}

export default function PriceSlider({ items = [], value, onChange }: PriceSliderProps) {
    const prices = items.map(it => it.price ?? 0)
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 200

    return (
        <div className="w-[80%] md:w-[40%] lg:w-[20%] flex items-center gap-6">
            {/* <label className="block text-sm font-medium mb-2">
                Price Range: ${value[0]} – ${value[1]}
            </label> */}
            <h6 className=" text-sm text-slate-800">${value[0]}</h6>
            <Slider
                range
                min={minPrice}
                max={200}
                step={5}
                value={value}
                onChange={(val) => onChange(val as [number, number])}
            />
            <h6 className=" text-sm text-slate-800">${value[1]}</h6>
        </div>
    )
}
