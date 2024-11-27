import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, Mail } from "lucide-react";
import { User } from "@/lib/types";
import { Separator } from "./ui/separator";
import markdownit from "markdown-it";
import Link from "next/link";

const md = markdownit();

export function Hero({ user, admin }: { user: User; admin: boolean }) {
  if (!user) {
    return <div className="text-center text-lg py-12">User not found</div>;
  }
  const parsedContent = md.render(user?.bio || "");
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          src="https://c4.wallpaperflare.com/wallpaper/990/547/605/digital-art-futuristic-city-car-artwork-wallpaper-preview.jpg"
          alt="Classical architecture background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold tracking-wide md:text-7xl">
            {user.firstName + " " + user.lastName}
          </h1>
          <p className="text-lg mt-4 text-gray-300 uppercase tracking-wider">
            Data Analyst
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto py-12 px-4 md:px-8 space-y-12">
        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          {/* About Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">About Me</h2>
            <Separator className="mb-6 py-0.5" />
            <div className="prose dark:prose-invert max-w-none space-y-4">
              {parsedContent ? (
                <article
                  className="prose max-w-4xl font-work-sans break-all"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
              ) : (
                <p className="no-result">No details provided</p>
              )}
            </div>
          </section>

          {/* Profile Section */}
          <aside className="space-y-8 text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg">
              <Image
                src={user.imageUrl || "/placeholder.svg"}
                alt="Profile photo"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Hello, I’m {user.firstName}!
            </p>
            {admin && (
              <Link href={`/profile/${user.userName}/update`}>update</Link>
            )}

            {/* Social Links */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Socials</h2>
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="#linkedin"
                    className="flex items-center gap-2 text-primary"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="mailto:example@email.com"
                    className="flex items-center gap-2 text-primary"
                  >
                    <Mail className="h-5 w-5" />
                    Email
                  </a>
                </Button>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
