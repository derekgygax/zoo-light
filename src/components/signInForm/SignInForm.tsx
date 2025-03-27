'use client'


// This does MFA for using the phone
// it is hardcoded very strangely so needs to fixed up but for now it works

import { useSignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';


export default function SignInForm() {
  const { isSignedIn, user } = useUser()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [displayMFA, setDisplayMFA] = useState(false)
  const router = useRouter()

  // First stage - email/password
  const handleFirstStage = async () => {
    if (!isLoaded) return

    try {
      const attemptFirstFactor = await signIn.create({
        identifier: email,
        password,
      });
      console.log(attemptFirstFactor);

      if (attemptFirstFactor.status === 'complete') {
        await setActive({ session: attemptFirstFactor.createdSessionId })
        router.replace('/')
      } else if (attemptFirstFactor.status === 'needs_second_factor') {
        const phoneNumberId = attemptFirstFactor.supportedSecondFactors?.find((factors) => {
          return factors.strategy === "phone_code";
        })?.phoneNumberId;
        attemptFirstFactor.prepareSecondFactor({
          strategy: "phone_code",
          phoneNumberId: phoneNumberId
        });
        setDisplayMFA(true)
      } else {
        console.error(JSON.stringify(attemptFirstFactor, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle SMS code verification
  const handleMFA = useCallback(async () => {
    if (!isLoaded) return

    try {
      const attemptSecondFactor = await signIn.attemptSecondFactor({
        strategy: 'phone_code',
        code: code,
      })

      if (attemptSecondFactor.status === 'complete') {
        await setActive({ session: attemptSecondFactor.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(attemptSecondFactor, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, code]);


  if (displayMFA) {
    return (
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Verify your account</h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <input
              onChange={(e) => setCode(e.target.value)}
              id="code"
              name="code"
              type="text"
              value={code}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleMFA}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="w-80 max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign in</h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Enter email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              value={email}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Enter password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              value={password}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
              onClick={handleFirstStage}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  )
}