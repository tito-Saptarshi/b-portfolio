import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "../lib/db";
import { ProfileForm } from "@/components/ProfileForm";

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      bio: true,
      imageUrl: true,
    },
  });

  return data;
}

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/");
  const data = await getData(user.id);
  return (
    <>
      <div className="flex justify-between items-center mb-6 ml-5 pt-4">
        <div>
          <h1 className="text-2xl font-bold">Profile Page</h1>
          <p className="text-muted-foreground">
            Update your profile information.
          </p>
        </div>
      </div>
      <Separator className="mt-10 mb-2 " />
      <ProfileForm
        userName={data?.userName}
        bio={data?.bio}
        imageUrl={data?.imageUrl}
      />
    </>
  );
}
