import prisma from "@/app/lib/db";
import { ProfileForm } from "@/components/ProfileForm";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

async function getData(userName: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });

  return data;
}

export default async function page({ params }: { params: { id: string } }) {
  const user = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const currUser = await getUser();

  if (!currUser) redirect(`/profile/${params.id}`);

  if (currUser.id !== user?.id) {
    const newData = await getData(currUser.id);
    const userName = newData?.userName;
    return redirect(`profile/${userName}`);
  }
  return (
    <>
      <div className="flex justify-between items-center mb-6 ml-5 pt-4">
        {/* <div>
          <h1 className="text-2xl font-bold">Profile Page</h1>
          <p className="text-muted-foreground">
            Update your profile information.
          </p>
        </div> */}
      </div>
      <Separator className="mt-10 mb-2 " />
      <ProfileForm
        userName={user?.userName}
        bio={user?.bio}
        firstName={user?.firstName}
        lastName={user?.lastName }
        imageUrl={user?.imageUrl}
        socialLinkedIn={user?.socialLinkedIn}
        socialMail={user?.socialMail}
        socialGithub={user?.socialGithub}
        socialOtherLink={user?.socialOtherLink}
      />
    </>
  );
}
