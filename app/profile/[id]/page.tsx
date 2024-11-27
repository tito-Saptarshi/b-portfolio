import prisma from "@/app/lib/db";
import PersonalProjects from "@/components/AllProjects";
import { Hero } from "@/components/Hero";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userName: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });

  return data;
}

export default async function page({params} : {params : {id : string}}) {
  const user = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const data = await getUser();
  let admin = false;
  if(data.id === user?.id) {
    admin=true;
  }
  return (
  <div className="p-4">
    <Hero user={user} admin={admin}/>  
    <PersonalProjects username={params.id}/>
  </div>
  );
}
