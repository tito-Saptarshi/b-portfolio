import prisma from "@/app/lib/db";
import { ProjectCard } from "./ProjectCard";
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

async function getProjects(id: string) {
  noStore();
  const data = await prisma.project.findMany({
    where: {
      userId: id,
    },
  });

  return data;
}

export default async function PersonalProjects({ username }: { username: string }) {
  const data = await getData(username);
  const projects = await getProjects(data?.id || "");

  return (
    <section className="container mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <h1 className="mb-10 text-4xl font-bold text-center text-gray-800">Personal Projects</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          
          <ProjectCard key={project.id} project={project} username={username}/>
         
        ))}
      </div>
      {projects.length === 0 && (
        <p className="mt-8 text-center text-lg text-gray-600">
          No projects found for this user.
        </p>
      )}
    </section>
  );
}
