import { VerfiyMFA } from "@/components/verifyMFA/VerifyMFA";
// import { currentUser } from "@clerk/nextjs/server";

interface VerifyMFAPage {
  params: Promise<{
    type: string;
  }>
}
export default async function VerifyMFAPage(props: VerifyMFAPage) {

  const { type } = await props.params;

  // const user = await currentUser();

  return (
    <div className="flex justify-center">
      <VerfiyMFA
        type={type}
      />
    </div>
  )
}