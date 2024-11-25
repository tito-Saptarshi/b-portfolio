import { CTA } from "@/components/landing/Cta";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
// import Header from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "./lib/db";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return data;
}

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user) {
    const data = await getData(user.id);
    redirect(`/profile/${data?.userName}`);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-grow">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
