import React from 'react'

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="w-full p-3 rounded text-slate-400 bg-[#201f25]"
      />
    </div>
  )
}
