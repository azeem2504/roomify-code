import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function RoomType({selectedRoomType}) {
  
  return (
    <div>
      <label className='text-slate-400 cursor-pointer'>Select Room Type *</label>
      <Select onValueChange={(value) => selectedRoomType(value)}>
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Bedroom">Bedroom</SelectItem>
          <SelectItem value="Living Room">Living Room</SelectItem>
          <SelectItem value="Kitchen">Kitchen</SelectItem>
          <SelectItem value="Washroom">Washroom</SelectItem>
          <SelectItem value="Office">Office</SelectItem>
        </SelectContent>
      </Select>

    </div>
  )
}

export default RoomType
