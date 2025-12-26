import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonCard = ({card}) => {
  return Array(card).fill(0).map((item,index)=>(
    
    <div className='card-skeleton' key={index}>
        <div className='left-col'>
            <Skeleton/>
        </div>
        <div className='right-col'>
            <Skeleton/>
        </div>
      
    </div>
  )
)
}

export default SkeletonCard
