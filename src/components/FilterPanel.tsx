import React from 'react'

export default function FilterPanel({
  pricing,
  toggle,
}: {
  pricing: Set<string>
  toggle: (s: string) => void
}) {
  const is = (name: string) => pricing.has(name)
  return (
    <div className=" text-[#b4b2b9] p-3 items-center flex gap-10 flex-wrap lg:flex-nowrap md:flex-nowrap  rounded shadow space-y-3">
      <div className="font-semibold text-[#777778]">Pricing Option</div>
      <div className="flex gap-3 !m-0">
        <label className="inline-flex items-center text-[#a7a6a8] gap-2">
          <input type="checkbox" className="appearance-none h-4 w-4 border-2 border-[#6f6e75] rounded bg-[#43424a] 
           relative checked:before:content-['✔'] 
           checked:before:absolute checked:before:text-white 
           checked:before:left-[-2px] checked:before:top-[-6px] 
           checked:before:text-sm" aria-label="Paid" checked={is('0')} onChange={() => toggle('0')} /> Paid
        </label>
        <label className="inline-flex items-center text-[#a7a6a8] gap-2">
          <input type="checkbox" aria-label="Free" className="appearance-none h-4 w-4  border-2 border-[#6f6e75] rounded bg-[#43424a] 
           relative checked:before:content-['✔'] 
           checked:before:absolute checked:before:text-white 
           checked:before:left-[-2px] checked:before:top-[-6px] 
           checked:before:text-sm"  checked={is('1')} onChange={() => toggle('1')} /> Free
        </label>
        <label className="inline-flex items-center text-[#a7a6a8] gap-2">
          <input type="checkbox" className="appearance-none h-4 w-4 rounded border-2 border-[#6f6e75] bg-[#43424a] 
           relative checked:before:content-['✔'] 
           checked:before:absolute checked:before:text-white 
           checked:before:left-[-2px] checked:before:top-[-6px] 
           checked:before:text-sm" aria-label="View Only" checked={is('2')} onChange={() => toggle('2')} /> View Only
        </label>
      </div>
    </div>
  )
}
