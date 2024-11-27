"use client";

import { deleteProject } from "@/lib/actions";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

interface props {
  projectId: string;
}

export function DeleteProject({ projectId }: props) {
  const handleClick = async () => {
    const result = await deleteProject(projectId);
    if (result.success) {
      return redirect("/");
    }
  };
  return (
    <div>
      <Button onClick={handleClick} variant="destructive">
        Delete
      </Button>
    </div>
  );
}
