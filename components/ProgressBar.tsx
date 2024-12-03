'use client'
import React from 'react'

function ProgressBar({ maxItem = 10, availableItem = 1 }) {
  return (
    <div className='progressBarWrap'>
      <div className='progress' style={{ width: 100 - (availableItem * 100) / maxItem }} />
    </div>
  )
}

export default ProgressBar
