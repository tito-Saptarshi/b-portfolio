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
import { Textarea } from "@/components/ui/textarea";

import { useActionState, useEffect, useState } from "react";

import { UploadButton } from "./Uploadthing";
import { useToast } from "@/hooks/use-toast";
import { SubmitButton } from "./SubmitButtons";
import { updateUserInfo } from "@/lib/actions";

interface iAppProps {
  userName: string | undefined | null | "";
  bio: string | undefined | null | "";
  imageUrl: string | undefined | null | "";
}

const initialState = {
  message: "",
  status: "",
};

export function ProfileForm({ userName, bio, imageUrl }: iAppProps) {
  const [newImage, setNewImage] = useState<string>("");
  const [state, formAction] = useActionState(updateUserInfo, initialState);
  const { toast } = useToast();

  useEffect(() => {
    setNewImage(imageUrl ?? "");
  }, [imageUrl]);

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Succesfull",
        description: state.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  
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
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={bio ?? "Lorem ipsum dolor sit amet."}
                className="min-h-[100px]"
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

