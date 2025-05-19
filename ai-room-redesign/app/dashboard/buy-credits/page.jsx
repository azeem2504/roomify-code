"use client"

import { UserDetailContext } from "@/app/_context/UserdetailContext"
import { Button } from "@/components/ui/button"
import { db } from "@/config/db"
import { Users } from "@/config/schema"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

function BuyCredits() {
    const creditsOptions = [
        { credits: 5, amount: 0.99 },
        { credits: 10, amount: 1.99 },
        { credits: 25, amount: 3.99 },
        { credits: 50, amount: 6.99 },
        { credits: 100, amount: 9.99 },
    ]

    const [selectedOption, setSelectedOption] = useState(null)
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const router = useRouter()

    const onPaymentSuccess = async () => {
        console.log('Payment Success...')
        const result = await db.update(Users).set({
            credits: userDetail?.credits + selectedOption?.credits
        }).returning({ id: Users.id })

        if (result) {
            setUserDetail(prev => ({
                ...prev,
                credits: userDetail?.credits + selectedOption?.credits
            }))
            router.push('/dashboard')
        }
    }

    return (
        <div className="p-6">
            <h2 className="font-bold text-3xl mb-2">Buy More Credits</h2>
            <p className="text-gray-600 mb-6">
                Unlock endless possibilities – Buy more credits and transform your room with AI magic! ✨🛋️
            </p>

            <div className="flex gap-4 overflow-x-auto pb-2">
                {creditsOptions.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedOption(item)}
                        className={`min-w-[160px] cursor-pointer border p-4 rounded-xl flex flex-col items-center justify-between transition hover:shadow-md ${selectedOption?.credits === item.credits
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-200"
                            }`}
                    >
                        <h2 className="text-2xl font-extrabold">{item.credits}</h2>
                        <p className="text-sm text-gray-500 mb-3">Credits</p>
                        <Button
                            variant="default"
                            className="bg-[#7C3AED] hover:bg-[#6D28D9] cursor-pointer text-white w-full text-sm"
                        >
                            Select
                        </Button>
                        <p className="mt-3 text-sm font-medium text-gray-800">${item.amount}</p>
                    </div>
                ))}
            </div>

            <div className="mt-20">
                {selectedOption?.credits && (
                    <PayPalButtons

                        style={{
                            layout: "horizontal",  // Can be 'vertical' or 'horizontal'
                            size: "large",         // Can be 'small', 'medium', or 'large'
                            shape: "pill",         // Can be 'rect' or 'pill'
                            color: "blue",         // Can be 'gold', 'blue', 'silver', or 'black'
                            label: "checkout",     // Can be 'paypal', 'pay', 'checkout', 'buynow'
                            tagline: false         // Hide the tagline
                        }}
                        onApprove={() => onPaymentSuccess()}
                        onCancel={() => console.log('Payment Cancelled...')}
                        createOrder={(data, actions) => {
                            return actions?.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: selectedOption.amount.toFixed(2),
                                            currency_code: 'USD'
                                        }
                                    }
                                ]
                            })
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default BuyCredits
