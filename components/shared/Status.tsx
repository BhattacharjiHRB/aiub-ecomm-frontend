import clsx from 'clsx'
import React from 'react'

export default function Status({ status }: { status: any }) {
  return <p 
    className={clsx('text-lg font-semibold',{
        "text-green-600": status === "available",
        "text-red-600": status === "unavailable"
    })} 
  >{status}</p>
}
