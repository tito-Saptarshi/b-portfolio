import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { extractWords } from "@/lib/helper";

interface ProjectCardProps {
  project: Project;
  username: string;
}

export function ProjectCard({ project, username }: ProjectCardProps) {
  let tools_used;
  if (project.tools_used) {
    tools_used = extractWords(project.tools_used);
  }

  // const projectLink = project.project_link || "/";

  return (
    <Link
      href={`${username}/project/${project.id}`}
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-[2/1] w-full overflow-hidden">
            <Image
              src={
                project.imageUrl ||
                "https://t4.ftcdn.net/jpg/07/91/22/59/360_F_791225927_caRPPH99D6D1iFonkCRmCGzkJPf36QDw.jpg"
              }
              alt={"https://kzmk6r6a5yit05bhzgiy.lite.vusercontent.net/placeholder.svg?height=400&width=800"}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="line-clamp-1 text-xl">{project.name}</CardTitle>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools_used?.map((tool) => (
              <Badge key={tool} variant="secondary">
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>
        {project.project_link && (
          <CardFooter className="p-4 pt-0">
            <p className="text-sm text-muted-foreground">
              {project.project_link}
            </p>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
