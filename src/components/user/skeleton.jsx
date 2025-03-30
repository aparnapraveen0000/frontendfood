import React from 'react'

function Cardskeleton() {
  return (
    <>
        <div className="flex w-80 flex-row gap-10">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
      
    </>
  )
}

export default Cardskeleton
