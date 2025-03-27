import { ChoosePreferences } from "@/components/choosePreferences/ChoosePreferences";
import { currentUser } from "@clerk/nextjs/server";

export default async function ChoosePreferencesPage() {
  const user = await currentUser();
  // console.log(user);
  return (
    <div className="flex justify-center">
      <ChoosePreferences />
    </div>
  )
}