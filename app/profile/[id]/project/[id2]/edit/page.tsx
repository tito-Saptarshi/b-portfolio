import prisma from "@/app/lib/db";
import { DeleteProject } from "@/components/DeleteProject";
import { EditPostForm } from "@/components/EditPostForm";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
async function getProjects(id: string) {
  noStore();
  const data = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  return data;
}

export default async function ProjectUploadPage({
  params,
}: {
  params: { id2: string };
}) {
  const data = await getProjects(params.id2);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user.id !== data?.userId) {
    return redirect("/");
  }

  if (!data) {
    return redirect("/");
  }
  console.log(data);

  return (
//   <EditPostForm data={data} updateId={params.id2} />
    <div>
        <h1>Sorry! Project cannot be update now.</h1>
        <p>you have to delete this project and create a new one.</p>

        <p>Sorry for this inconvenience!</p>

        <DeleteProject projectId={data.id} />
    </div>
);
}
