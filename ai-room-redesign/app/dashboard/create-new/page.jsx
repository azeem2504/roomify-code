"use client"
import React, { useContext, useState } from 'react'
import ImageSelection from './_components/ImageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ID, storage } from '@/config/appwriteConfig'
import { useUser } from '@clerk/nextjs'
import CustomLoading from './_components/CustomLoading'
import AiOutputDiag from '../_components/AiOutputDiag'
import { db } from '@/config/db'
import { UserDetailContext } from '@/app/_context/UserdetailContext'
import { Users } from '@/config/schema'

function CreateNew() {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [aiOutputImage, setAiOutputImage] = useState()
  const [openOutputDiag, setOpenOutputDiag] = useState(false)
  const { user } = useUser()
  const[orgImage, setOrgImage] = useState()
  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  const onHandleInputChange = (value, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const generateAiImage = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const rawImageUrl = await saveRawImageAppwrite()
      if (!rawImageUrl) return



      const response = await fetch('/api/redesign-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: rawImageUrl,
          roomType: formData?.roomType,
          designType: formData?.designType,
          additionalReq: formData?.additionalReq,
          userEmail: user?.primaryEmailAddress?.emailAddress
        })
      })

      if (!response.ok) {
        const errText = await response.text()
        throw new Error(errText)
      }

      // const blob = await response.blob()
      // const imageUrl = URL.createObjectURL(blob)
      // console.log('Generated image URL:', imageUrl)
      // setAiOutputImage(imageUrl)
      // setOpenOutputDiag(true)
      const result = await response.json();
      await updateUserCredits()
      setAiOutputImage(result.fileUrl);  // directly use the Appwrite URL
      setOpenOutputDiag(true);




    } catch (error) {
      console.error('Generation error:', error)
      setError(error.response?.data?.error || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserCredits = async () => {
     const result = await db.update(Users).set({
                credits: userDetail?.credits-1
            }).returning({id: Users.id})

            if(result){
              setUserDetail(prev => ({
                ...prev,
                credits: userDetail?.credits-1
              }))
              return result[0].id
            }
    
  }

  // const saveRawImageAppwrite = async () => {
  //   if (!formData.image) {
  //     alert("Please select an image first.")
  //     return null
  //   }

  //   try {
  //     const fileId = ID.unique()
  //     const response = await storage.createFile(
  //       process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
  //       fileId,
  //       formData.image
  //     )

  //     return await storage.getFileView(
  //       process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
  //       response.$id
  //     )
  //     setOrgImage()
  //   } catch (error) {
  //     console.error("Upload Error:", error)
  //     setError("Failed to upload image")
  //     return null
  //   }
  // }
  const saveRawImageAppwrite = async () => {
    if (!formData.image) {
      alert("Please select an image first.")
      return null
    }
  
    try {
      const fileId = ID.unique()
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        fileId,
        formData.image
      )
  
      const viewUrl = await storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        response.$id
      )
  
      setOrgImage(viewUrl) // ✅ Now it will run
      return viewUrl
    } catch (error) {
      console.error("Upload Error:", error)
      setError("Failed to upload image")
      return null
    }
  }
  

  return (
    <div>
      <h2 className='font-bold text-4xl text-[#303594] text-center'>Experience the Magic of AI Remodeling</h2>
      <p className='text-center text-gray-500'>Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
        <ImageSelection selectedImage={(value) => onHandleInputChange(value, 'image')} />
        <div>
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />
          <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'designType')} />
          <AdditionalReq additionalReqInput={(value) => onHandleInputChange(value, 'additionalReq')} /> {/* Fixed typo */}

          <Button
            className='w-full cursor-pointer mt-5 bg-[#303594] hover:bg-[#535BE9]'
            onClick={generateAiImage}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
          {error && (
            <p className='mt-2 text-sm text-red-500'>{error}</p>
          )}

          <p className='text-sm text-gray-400 mb-50'>NOTE: 1 Credit will use to redesign your room</p>
        </div>
      </div>
      <CustomLoading loading={isLoading}/>
      <AiOutputDiag openDiag={openOutputDiag}
      closeDiag={() => setOpenOutputDiag(false)}
      orgImage={orgImage}
      aiImage={aiOutputImage}
      />
    </div>
  )
}

export default CreateNew