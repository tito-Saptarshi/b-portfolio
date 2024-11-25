"use server"

// https://ruizdelcarmen.me/

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "../app/lib/db";

export async function updateUserInfo(prevState: unknown, formData: FormData,  pitch: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      return redirect("/api/auth/login");
    }
    console.log();
    
    const username = formData.get("username") as string;
    const fullname = formData.get("fullname") as string;
    const bio = formData.get("bio") as string;
    const imageUrl = formData.get("imageUrl") as string;
  
    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          firstName: fullname,
          userName: username,
          bio: pitch,
          imageUrl: imageUrl,
        },
      });
      
      return {
        message: "Succesfully Updated",
        status: "green",
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return {
            message: "This username is already used",
            status: "error",
          };
        }
      }
      throw e;
    }
  }
  