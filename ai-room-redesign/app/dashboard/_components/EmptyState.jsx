"use client"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

function EmptyState() {
    return (
        <div className='flex items-center gap-2 justify-center mt-10 flex-col'>
            <Image className='rounded-3xl' src={'/placeholder.jpg'} width={300} height={300} />
            <h2 className='font-medium text-lg text-gray-500'>Create New AI Interior Design for your room</h2>
            <Link href={'/dashboard/create-new'} >
                <Button className='bg-[#303594] cursor-pointer hover:bg-[#535BE9]'>+ Redesign Room</Button>
            </Link>
        </div>
    )
}

export default EmptyState
