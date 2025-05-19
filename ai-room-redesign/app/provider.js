"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from './_context/UserdetailContext'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

function Provider({ children }) {

  const { user, isSignedIn } = useUser()
  const [userDetail, setUserDetail] = useState([])
  useEffect(() => {
    if (isSignedIn && user?.id) {
      verifyUser();
    }
  }, [isSignedIn, user?.id]);

  const verifyUser = async () => {
    try {
      const dataResult = await axios.post('/api/verify-user', {
        user: user
      });
      setUserDetail(dataResult.data.result)
    } catch (error) {
      console.error("Axios Error:", error.response ? error.response.data : error.message);
    }
  };


  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        
        <div>
          {children}
        </div>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  )
}

export default Provider
