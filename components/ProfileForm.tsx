"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useActionState, useEffect, useState } from "react";

import { UploadButton } from "./Uploadthing";
import { useToast } from "@/hooks/use-toast";
import { SubmitButton } from "./SubmitButtons";
import { updateUserInfo } from "@/lib/actions";
import MDEditor from "@uiw/react-md-editor";
import { redirect, useRouter } from "next/navigation";
export interface iAppProps {
  userName: string | undefined | null | "";
  bio: string | undefined | null | "";
  imageUrl: string | undefined | null | "";
  fullName: string | undefined | null | "";
}

const initialState = {
  message: "",
  status: "",
};

export function ProfileForm({ userName, bio, imageUrl, fullName }: iAppProps) {
  const [pitch, setPitch] = useState("");
  const [newImage, setNewImage] = useState<string>("");
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    setNewImage(imageUrl ?? "");
  }, [imageUrl]);

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const result = await updateUserInfo(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/`);
        return redirect('/');
      }

      return result;
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-40 w-40">
              <AvatarImage
                src={newImage ?? `https://avatar.vercel.sh/${userName}`}
                alt="@shadcn"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <UploadButton
              className="ut-button:w-28 ut-allowed-content:hidden"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setNewImage(res[0].url);
              }}
            />
            <Button
              onClick={() => {
                setNewImage(imageUrl ?? "");
              }}
            >
              Cancel
            </Button>
            <input type="hidden" name="imageUrl" value={newImage} />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue={userName ?? ""}
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullname">Name</Label>
              <Input
                id="fullname"
                name="fullname"
                defaultValue={fullName ?? ""}
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div>

            <div className="space-y-2" data-color-mode="light">
              <Label htmlFor="pitch">Bio</Label>
              <MDEditor
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                id="bio"
                preview="edit"
                height={300}
                style={{ borderRadius: 20, overflow: "hidden" }}
                textareaProps={{
                  placeholder:
                    "Briefly describe your idea and what problem it solves",
                }}
                previewOptions={{
                  disallowedElements: ["style"],
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton text="Save" />
        </CardFooter>
      </Card>
    </form>
  );
}
