"use server";

// https://ruizdelcarmen.me/

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "../app/lib/db";

export async function updateUserInfo(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  console.log();

  const username = formData.get("username") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  // const bio = formData.get("bio") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const pitch = formData.get("pitch") as string;
  const socialLinkedIn = formData.get("sociallinkedin") as string;
  const socialMail = formData.get("socialmail") as string;
  const socialGithub = formData.get("socialgithub") as string;
  const socialOtherLink = formData.get("socialotherlink") as string;

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
        firstName: firstname,
        lastName: lastname,
        bio: pitch,
        imageUrl: imageUrl,
        socialLinkedIn: socialLinkedIn,
        socialMail: socialMail,
        socialGithub: socialGithub,
        socialOtherLink: socialOtherLink,
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

export async function createProject(
  prevState: unknown,
  formData: FormData,
  pitch: string,
  imageUrl: string
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  console.log();

  const name = formData.get("name") as string;
  const tools_used = formData.get("tools_used") as string;
  const project_type = formData.get("project_type") as string;
  const project_link = formData.get("project_link") as string;
  const other_link = formData.get("other_link") as string;
  const github_link = formData.get("github_link") as string;
  // const bio = formData.get("bio") as string;
  // const imageUrl = formData.get("imageUrl") as string;

  try {
    await prisma.project.create({
      data: {
        userId: user.id,
        name: name,
        tools_used: tools_used,
        project_type: project_type,
        project_link: project_link,
        other_link: other_link,
        github_link: github_link,
        imageUrl: imageUrl,
        details: pitch,
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

export async function deleteProject(projectId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return {
      message: "Succesfully Updated",
      status: "green",
      success: true,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is already used",
          status: "error",
          success: false,
        };
      }
    }
    throw e;
  }
}

// export async function updateProject(
//   prevState: unknown,
//   formData: FormData,
//   pitch: string,
//   imageUrl: string,
//   updateId: string
// ) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/api/auth/login");
//   }

//   // Get all form data
//   const name = formData.get("name") as string;
//   const tools_used = formData.get("tools_used") as string;
//   const project_type = formData.get("project_type") as string;
//   const project_link = formData.get("project_link") as string;
//   const other_link = formData.get("other_link") as string;
//   const github_link = formData.get("github_link") as string;

//   // Create an update object with only non-empty values
//   const updateData: Record<string, unknown> = {
//     ...(name && { name }),
//     ...(tools_used && { tools_used }),
//     ...(project_type && { project_type }),
//     ...(project_link && { project_link }),
//     ...(other_link && { other_link }),
//     ...(github_link && { github_link }),
//     ...(imageUrl && { imageUrl }), // Ensure image is updated only if provided
//     ...(pitch && { details: pitch }),
//   };

//   try {
//     await prisma.project.update({
//       where: { id: updateId },
//       data: updateData, // Only non-empty fields are sent for updating
//     });

//     return {
//       message: "Successfully Updated",
//       status: "green",
//     };
//   } catch (e) {
//     if (e instanceof Prisma.PrismaClientKnownRequestError) {
//       if (e.code === "P2002") {
//         return {
//           message: "This username is already used",
//           status: "error",
//         };
//       }
//     }
//     throw e;
//   }
// }

// export async function updateProject(
//   prevState: unknown,
//   formData: FormData,
//   pitch: string,
//   imageUrl: string,
//   updateId: string,
// ) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/api/auth/login");
//   }
//   console.log();

//   const name = formData.get("name") as string;
//   const tools_used = formData.get("tools_used") as string;
//   const project_type = formData.get("project_type") as string;
//   const project_link = formData.get("project_link") as string;
//   const other_link = formData.get("other_link") as string;
//   const github_link = formData.get("github_link") as string;
//   // const bio = formData.get("bio") as string;
//   // const imageUrl = formData.get("imageUrl") as string;

//   try {
//     await prisma.project.update({
//       where: { id: updateId },
//       data: {
//         name: name,
//         tools_used: tools_used,
//         project_type: project_type,
//         project_link: project_link,
//         other_link: other_link,
//         github_link: github_link,
//         imageUrl: imageUrl,
//         details: pitch,
//       },
//     });

//     return {
//       message: "Succesfully Updated",
//       status: "green",
//     };
//   } catch (e) {
//     if (e instanceof Prisma.PrismaClientKnownRequestError) {
//       if (e.code === "P2002") {
//         return {
//           message: "This username is already used",
//           status: "error",
//         };
//       }
//     }
//     throw e;
//   }
// }
