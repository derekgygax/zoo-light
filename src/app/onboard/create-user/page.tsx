

import { getInvitedEmail } from "@/actions/invitations";
import { CreateUser } from "@/components/createUser/CreateUser";

interface SignUpPageProps {
  searchParams: Promise<{
    __clerk_status: string;
    __clerk_ticket: string;
  }>
}

export default async function SignUpPage(props: SignUpPageProps) {

  const { __clerk_ticket } = await props.searchParams;

  const invitation = await getInvitedEmail(__clerk_ticket);

  return (
    <div>
      <CreateUser
        email={invitation.email ?? "NO FIND"}
        invitationToken={__clerk_ticket}
      />
    </div>
  );
}