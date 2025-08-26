
import React from 'react'
import Skeleton from 'react-loading-skeleton'


export default function LoadingIcon() {
  return (
   <Skeleton  borderRadius={20} baseColor='#dddd' count={8}/>
  )
}
