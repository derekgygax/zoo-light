"use client"

import { OrganizationSwitcher, useUser } from "@clerk/nextjs";

export const User = () => {
  const { user } = useUser();

  console.log(user);
  return (
    <div>
      <div>User: {user?.firstName}</div>
      <OrganizationSwitcher />
    </div>
  )
}
