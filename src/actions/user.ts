"use server";

import { clerkClient, currentUser, PhoneNumber } from '@clerk/nextjs/server';

export const sendPhoneVerfication = async () => {
  const user = await currentUser();
  const phoneNumber: PhoneNumber | undefined = user?.phoneNumbers[0];
  console.log(phoneNumber);
}



