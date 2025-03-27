"use client"

import { useUser } from "@clerk/nextjs";


export const ChoosePreferences = () => {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }

  if (!user) {
    return <div>USER NOT THERE</div>
  }

  console.log(user);

  return (
    <div>ChoosePreferences</div>
  )
}
