import React from 'react'

export default function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="py-2 text-[12px] border-[#65656f] border-b-2 bg-transparent w-[15%] text-slate-300 outline-none">
      <option value="name">Item Name (Default)</option>
      <option value="higher">Higher Price</option>
      <option value="lower">Lower Price</option>
    </select>
  )
}
