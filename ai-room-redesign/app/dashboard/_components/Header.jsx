"use client"
import { UserDetailContext } from '@/app/_context/UserdetailContext'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

function Header() {
    const { user } = useUser()
    const {userDetail} = useContext(UserDetailContext)
    const router = useRouter();

    return (
        <div className='p-5 shadow-sm flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <Image src={'/logo.svg'} width={40} height={40} />
                <h2 className='font-bold text-lg text-black'>Roomify AI</h2>
            </div>
            {user ? (
                <>
                    <Button variant="ghost" onClick={() => router.push('/dashboard/buy-credits')} className="rounded-full cursor-pointer text-[#303594]">Buy More Credits</Button>
                    <div className='flex gap-7 items-center'>
                        <div className='flex gap-2 p-1 items-center bg-slate-200 rounded-full px-3'>
                            <Image src={'/star.png'} width={20} height={20} />
                            <h2 className='text-black'>{userDetail?.credits}</h2>
                        </div>
                        <UserButton />
                    </div>
                </>
            ) : (
                <Button variant="outline" 
                onClick={() => router.push('/dashboard')}
                className="bg-[#7C3AED] text-white px-6 py-3 rounded-lg hover:bg-[#6D28D9] hover:text-white">Log In / Sign Up
                </Button>
            )}
        </div>
    );
}

export default Header;