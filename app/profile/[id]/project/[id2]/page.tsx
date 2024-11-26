import prisma from "@/app/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { extractWords } from "@/lib/helper";
// import { Separator } from "@/components/ui/separator"
import { FileText, Github } from "lucide-react";

import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import markdownit from "markdown-it";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const md = markdownit();

async function getData(id: string) {
  noStore();
  const data = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  return data;
}

export default async function Prid({
  params,
}: {
  params: { id: string; id2: string };
}) {
  const data = await getData(params.id2);
  if (!data) return redirect("/");

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let admin = false;
  if (user.id === data.userId) {
    admin = true;
  }

  let tools_used;
  if (data.tools_used) {
    tools_used = extractWords(data.tools_used);
  }

  let project_type;
  if (data.project_type) {
    project_type = extractWords(data.project_type);
  }

  const parsedContent = md.render(data?.details || "");

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          {data.name}
        </h1>
        {admin && (
          <>
          <Link href={"/"} className="p-4 pt-2">
            edit
          </Link>
          <Link href={"/"} className="p-4 pt-2">
            delete
          </Link>
          </>
        )}
        <div className="space-y-4">
          {data.tools_used && (
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground">
                Used
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="destructive">Tools: </Badge>
                {tools_used?.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
                {/* <Badge variant="secondary">SQL</Badge>
              <Badge variant="secondary">Tableau</Badge> */}
              </div>
            </div>
          )}

          {data.project_type && (
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground">
                Project:
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="destructive">Type:</Badge>
                {project_type?.map((tool) => (
                  <Badge
                    key={tool}
                    className="bg-purple-100 text-purple-800 hover:bg-purple-100/80"
                  >
                    {tool}
                  </Badge>
                ))}
                {/* <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100/80">
                Data Cleaning
              </Badge> */}
                {/* <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80">
                Exploratory Data Analysis
              </Badge>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80">
                Data Visualization
              </Badge> */}
              </div>
            </div>
          )}

          {/* <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Type:
            </h2>
            <Badge>Personal</Badge>
          </div> */}

          {data.project_link && (
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground">
                Relevant Link:
              </h2>
              <Link
                href={data.project_link}
                className="text-primary hover:underline break-all"
                target="_blank"
              >
                {data.project_link}
              </Link>
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detailed Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.github_link && (
            <div className="space-y-2">
              <div className="font-semibold flex items-center gap-2">
                <Github className="h-4 w-4" />
                Github Repo:
              </div>
              <Link
                href={data.github_link}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.github_link}
              </Link>
            </div>
          )}

          {data.other_link && (
            <div className="space-y-2">
              <div className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Other Links:
              </div>
              <Link
                href={data.other_link}
                className="text-primary hover:underline"
              >
                {data.other_link}
              </Link>
            </div>
          )}

          {/* <div className="space-y-2">
            <div className="font-semibold flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Tableau Dashboard:
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/placeholder.svg?height=20&width=20"
                alt="Tableau icon"
                className="h-5 w-5"
              />
              <span>Tableau Software LAcity.org Web Traffic</span>
            </div>
          </div> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Background</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-gray dark:prose-invert max-w-none">
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
