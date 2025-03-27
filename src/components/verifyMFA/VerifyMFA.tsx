"use client"

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface VerfiyMFAProps {
  type: string;
}

export const VerfiyMFA = ({ type }: VerfiyMFAProps) => {

  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter();
  const [code, setCode] = useState('');

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }


  const verifyCode = async () => {
    console.log('verifying code');
    if (type === "phone") {
      const phoneNumber = user.phoneNumbers.length === 1 ? user.phoneNumbers[0] : null;

      if (phoneNumber) {
        const phoneVerifyAttempt = await phoneNumber.attemptVerification({ code: code ?? "" });
        console.log(phoneVerifyAttempt);

        if (phoneVerifyAttempt?.verification.status === 'verified') {
          // This marks that two factor is enabled
          let phoneUpdated = await phoneNumber.setReservedForSecondFactor({ reserved: true });
          console.log(phoneUpdated);

          // This makes it the default if they may use the other form
          // of multifactor authentication
          phoneUpdated = await phoneNumber.makeDefaultSecondFactor();
          console.log(phoneUpdated);

          router.push("/onboard/choose-preferences");
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          console.error(JSON.stringify(phoneVerifyAttempt, null, 2))
        }
      } else {
        console.log("There are either too many phone numbers or NONE");
        console.log(user.phoneNumbers);
      }
    } else {
      console.log("WHAT TYPE!")
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4">
      <div className="flex flex-col">
        <label htmlFor="code">Verification Code</label>
        <input
          id="code"
          name="code"
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCode(e.target.value);
          }}
          className="border p-2 rounded"
        />
      </div>
      <div>
        <button
          onClick={() => {
            verifyCode();
          }}
          className="border-2 border-black cursor-pointer"
        >
          Verify Code
        </button>
      </div>
    </div>
  )
}