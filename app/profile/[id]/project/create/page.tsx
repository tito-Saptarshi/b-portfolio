"use client";

import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MDEditor from "@uiw/react-md-editor";

// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadDropzone } from "@/components/Uploadthing";
import { SubmitButton } from "@/components/SubmitButtons";
import { useToast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";
import { createProject } from "@/lib/actions";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  skills: z.string().min(2, "Skills must be at least 2 characters"),
  tools_used: z.string().min(2, "Skills must be at least 2 characters"),
  project_type: z.string().min(2, "Skills must be at least 2 characters"),
  project_link : z.string().min(2, "Project name must be at least 2 characters"),
  github_link : z.string().min(2, "Project name must be at least 2 characters"),
  image: z.string().url("Invalid image URL"),
  other_link: z.string().min(2, "Skills must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function ProjectUploadPage() {
  const { toast } = useToast();
  //   const [imageUrl, setImageUrl] = useState("");
  const [pitch, setPitch] = useState("");
  const [newImage, setNewImage] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tools_used: "",
      project_type: "",
      project_link: "",
      github_link: "",
      other_link: "",
      description: "",
      image: "",
    },
  });

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const result = await createProject(prevState, formData, pitch, newImage);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/`);
        return redirect("/");
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
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Your Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tools_used"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tools Used <span className="text-muted-foreground">(Optional)</span> </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. React, Node.js, TypeScript"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type <span className="text-muted-foreground">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Personal, Stakeholder, etc..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Link<span className="text-muted-foreground">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="www.projectNameHost.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Repo<span className="text-muted-foreground">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="www.gitHub.com/userName/projectName"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="other_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Link <span className="text-muted-foreground">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/abc.../xyz..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Image</FormLabel>
                    <FormControl>
                      <UploadDropzone
                        className="ut-button:w-28 ut-allowed-content:hidden"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setNewImage(res[0].url);
                        }}
                      />
                    </FormControl>
                    {newImage && (
                      <div className="mt-4">
                        <img
                          src={newImage ?? `https://avatar.vercel.sh/abc`}
                          alt="Uploaded project"
                          className="max-w-full h-auto rounded-lg"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem data-color-mode="light">
                    <FormLabel htmlFor="pitch">Project Description <span className="text-muted-foreground">(Optional)</span></FormLabel>
                    <FormControl>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton text="Submit Project" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
