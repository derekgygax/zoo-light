"use server";

import { currentUser } from "@clerk/nextjs/server";

import { createClerkClient } from '@clerk/backend'


// TODO you should use the NextJS clerkClient
// TODO Also get rid of the hardcoding


// const redirectUrl = "https://zoo-light.vercel.app/sign-up";

export const createOrganizationAndSendInvite = async (
  organizationName: string,
  inviteeEmail: string
) => {
  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  try {
    // 1. Get current user (inviter)
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    // 2. Create the new organization
    const newOrganization = await clerkClient.organizations.createOrganization({
      name: organizationName,
      createdBy: user.id,
    });

    // 3. Send invitation to the new member
    const invitation = await clerkClient.organizations.createOrganizationInvitation({
      organizationId: newOrganization.id,
      inviterUserId: user.id,
      emailAddress: inviteeEmail,
      role: "org:member",
      // redirectUrl: redirectUrl
    });

    return {
      success: true,
      organizationId: newOrganization.id,
      organizationName: newOrganization.name,
      invitationId: invitation.id,
      message: `Organization created and invitation sent to ${inviteeEmail}`
    };

  } catch (error) {
    console.error("Error in createOrganizationAndSendInvite:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to create organization and send invite"
    };
  }
};









export const getInvitedEmail = async (ticket: string) => {
  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  try {
    // 1. Decode the JWT token (no verification needed for Clerk tokens)
    const decoded = JSON.parse(
      Buffer.from(ticket.split('.')[1], 'base64').toString()
    ) as {
      oid: string;  // Organization ID
      sid: string;  // Invitation ID
      st: 'organization_invitation';
    };

    // 2. Fetch invitation details from Clerk
    const invitation = await clerkClient.organizations.getOrganizationInvitation({
      organizationId: decoded.oid,
      invitationId: decoded.sid,
    });

    // 3. Return the email + verification status
    return {
      email: invitation.emailAddress,
      valid: invitation.status === 'pending', // Check if invitation is still active
      organizationId: decoded.oid
    };

  } catch (err) {
    console.error('Invalid invitation:', err);
    return { error: "Invalid or expired invitation" };
  }
};