import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function AdditionalReq({additionalReqInput}) {
  return (
    <div className='mt-3'>
        <label className='text-gray-500 mb-1'>Enter Additional Requirements (Optional)</label>
      <Textarea className='mt-2' onChange={(e) => additionalReqInput(e.target.value)}/>
    </div>
  )
}

export default AdditionalReq
