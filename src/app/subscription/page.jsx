"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import SpecialOfferCard from "../../components/ui/specialOfferCard"
import { toast } from "sonner"
import { LucideLoader2 } from "lucide-react"
import { api, ENDPOINT } from "@/lib/api"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { updateUserPremium } from "@/redux/userSlice"

const offers = [
  {
    title: "Premium Monthly",
    features: [
      "Ad-Free (except sports & live)",
      "Includes all Premium content",
      "Any 1 device at a time (up to Asli 4K quality)",
      "Download and watch anytime"
    ],
    price: "29",
    originalPrice: "59",
    discountLabel: "51% OFF",
    duration: "1 Month"
  },
  {
    title: "Family",
    features: ["Enjoy all Premium plan benefits on up to 4 devices"],
    price: "89",
    originalPrice: "149",
    discountLabel: "40% OFF",
    duration: "1 Month"
  }
]

const SubscriptionPage = () => {
  const [activePrice, setActivePrice] = useState("");
  const [loading, setLoading] = useState(false)
  const userData = useSelector(state => state.user)
  const dispatch = useDispatch()
  const router = useRouter()

  function loadCheckoutScript() {
    return new Promise(function(resolve, reject){
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve();
      }

      script.onerror = () => {
        reject();
      }
      document.body.appendChild(script);
    })
}

const handlePaymentClick = async () => {
    setLoading(true);
    
    try {

      if (userData.user?.isPremium) {
        toast("Looks like you're already a JioCinema Premium member!");
        return;
      }
      if (activePrice === "") {
        toast("Select a card to join premium");
        return;
      }

      if (!userData.isLoggedIn) {
        toast("Login to get premium");
        router.push("/login");
        return;
      }
      const res = await api.post(`${ENDPOINT.payment}`, {
        email: userData.user?.email,
        amount: activePrice 
      })

      await loadCheckoutScript();

      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID ?? "",
        amount: res.data.amount,
        currency: "INR",
        name: "Jio Corp",
        description: "Test JIO CINEMA Transaction",
        order_id: res.data.orderId,
        handler: async function(response) {
          toast(`Payment Successful ${response.razorpay_order_id}`);
          try {
            const updatePremium = await api.patch(ENDPOINT.updatePremium, {
              email: userData.user?.email
            })
            if (updatePremium.status === 200) {
              dispatch(updateUserPremium(true));
              setTimeout(() => {
                toast("Premium access updated successfully");
              }, 4000);
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
      
      const rzp1 = new Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", function(response) {
        toast(response.error.reason);
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);  
    }
}

  return (
    <div className="h-screen mt-[74px] w-full">
      <Image
        src="/motu-patlu.png"
        alt="Background Image"
        fill={true}
        quality={100}
        className="-z-50 hidden md:block"
      />

      <div className="p-4 md:pt-8">
        <div className="flex items-center justify-between md:mb-8">
          <Link
            href="/"
            className="hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            ←
          </Link>
        </div>

        <div className="md:mx-16">
          <h2 className="text-2xl font-black">{userData?.user?.isPremium && "✅ You are subscribed to JioCinema Premium."}<br/><br/></h2>
          <h1 className="md:text-4xl text-2xl font-black mb-4">
            JioCinema Premium
          </h1>
          <p className="text-lg mb-8 w-[70%] text-wrap hidden md:block">
            Entertainment Redefined - The best of Hollywood, Before TV
            premieres, Blockbuster movies, Exclusive series, India{`'`}s biggest
            Kids & Family hub + 365 days of reality!
          </p>
          <div className="flex flex-col md:flex-row w-full md:gap-8 gap-2">
            {offers.map((offer, index) => (
              <SpecialOfferCard
                key={index}
                title={offer.title}
                features={offer.features}
                price={offer.price}
                originalPrice={offer.originalPrice}
                discountLabel={offer.discountLabel}
                duration={offer.duration}
                isActive={activePrice === offer.price}
                onClick={() => setActivePrice(offer.price)}
              />
            ))}
          </div>
          <button
            className="bg-pink-600 p-3 md:mt-10 flex font-medium rounded-lg"
            onClick={handlePaymentClick}
          >
            Continue & Pay
            {loading && <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage