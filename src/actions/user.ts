"use server";

// import { clerkClient, currentUser, User } from "@clerk/nextjs/server";

// export const enableMFA = async (user?: User) => {
//   // If no user provided, get the current user
//   const targetUser = user ?? await currentUser();

//   if (!targetUser) {
//     throw new Error("User not authenticated");
//   }

//   const client = await clerkClient();

//   // Enable MFA for this user
//   await client.users.updateUser(
//     targetUser.id,
//     {
//       two_factor_enabled: true
//     }
//   );

//   return { success: true };
// };