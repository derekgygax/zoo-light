"use client"

import { useSignIn } from "@clerk/nextjs"

export default function CheckerPage() {
  const { isLoaded, signIn, setActive } = useSignIn()

  console.log(signIn);
  return ((
    <div></div>
  ))
}