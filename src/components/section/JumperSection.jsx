import React from 'react'
import Link from 'next/link'

function JumperSection({ list }) {
  return (
    <div className="p-6 flex gap-4 mt-[64px] text-nowrap overflow-scroll scrollbar-hide" >
    {
        list.map((item) => (<Link
            key={item.href}
            className="px-3 py-2 rounded-full bg-white/15 text-sm"
            href={`#${item.href}`}
        >
            {item.label}
        </Link>
        ))
    }
    </div>
  )
}

export default JumperSection