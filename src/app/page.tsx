import { OrganizationInvitation } from "@/components/organizationInvitation/OrganizationInvitation";
// import { currentUser } from "@clerk/nextjs/server";

import { createOrganization, createOrganizationAndSendInvite } from "@/actions/invitations";
import { CreateOrganization } from "@/components/createOrganization/CreateOrganization";
import { User } from "@/components/user/User";

export default async function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* <CreateOrganization
          createOrganization={createOrganization}
        /> */}
        <OrganizationInvitation
          createOrganizationAndSendInvite={createOrganizationAndSendInvite}
        />
        <User />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
