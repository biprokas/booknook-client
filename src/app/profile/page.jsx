
import { headers } from "next/headers";
import { requireAuth } from "@/lib/auth-guard";
import { auth } from "@/lib/auth";
import ProfilePage from "@/components/profile/ProfilePage";

export const metadata = {
  title: "My Profile | BookNook",
};

export default async function Page() {
  await requireAuth();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <ProfilePage user={session.user} />;
}
