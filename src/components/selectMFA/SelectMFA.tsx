"use client"

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SelectMFA = () => {

  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter();
  const [mfaType, setMfaType] = useState('phone');

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }


  const sendCode = () => {
    console.log('sending code');
    if (mfaType === "phone") {
      try {
        // TODO to make the phone number the primary you need to do it using the backend API
        // TODO this may be a thing to do later
        const phoneNumber = user.phoneNumbers.length === 1 ? user.phoneNumbers[0] : null;
        if (phoneNumber) {
          // Send the user an SMS with the verification code
          phoneNumber?.prepareVerification()
          // If we get here, the SMS was sent successfully
          router.push("/onboard/verify-mfa/phone");
        } else {
          console.log("There are either too many phone numbers or NONE");
          console.log(user.phoneNumbers);
        }
      } catch (err) {
        console.error(JSON.stringify(err, null, 2))
      }
    } else {
      alert("CANT SUPPORT!");
      // router.push("/onboard/verify-mfa/one-time");
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4">
      <div className="flex flex-row gap-1">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="radio"
          id="phone"
          name="mfa_type"
          value="phone"
          checked={mfaType === "phone"}
          onChange={(e) => setMfaType(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-1">
        <label htmlFor="one_time">Generator</label>
        <input
          type="radio"
          id="one_time"
          name="mfa_type"
          value="one_time"
          checked={mfaType === "one_time"}
          onChange={(e) => setMfaType(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            sendCode();
          }}
          className="border-2 border-black cursor-pointer"
        >
          Send Code
        </button>
      </div>
    </div>
  )
}