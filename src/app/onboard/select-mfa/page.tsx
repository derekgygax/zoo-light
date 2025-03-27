
import { SelectMFA } from "@/components/selectMFA/SelectMFA";
import { currentUser } from "@clerk/nextjs/server";

export default async function SelectMFAPage() {
  const user = await currentUser();
  // console.log(user);
  return (
    <div className="flex justify-center">
      <SelectMFA />
    </div>
  )
}