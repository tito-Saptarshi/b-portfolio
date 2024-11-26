import prisma from "@/app/lib/db";
import PersonalProjects from "@/components/AllProjects";
import { Hero } from "@/components/Hero";
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
  return (
  <div className="p-4">
    <Hero user={user}/>  
    <PersonalProjects username={params.id}/>
  </div>
  );
}
