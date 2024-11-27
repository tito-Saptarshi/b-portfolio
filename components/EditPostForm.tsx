// "use client";

// import { useActionState, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import MDEditor from "@uiw/react-md-editor";

// // import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { UploadDropzone } from "@/components/Uploadthing";
// import { SubmitButton } from "@/components/SubmitButtons";
// import { useToast } from "@/hooks/use-toast";
// import { redirect, useRouter } from "next/navigation";
// import { createProject, updateProject } from "@/lib/actions";
// import { Project } from "@/lib/types";

// // Define the form schema
// const formSchema = z.object({
//   name: z.string().min(2, "Project name must be at least 2 characters"),
//   skills: z.string().min(2, "Skills must be at least 2 characters"),
//   tools_used: z.string().min(2, "Skills must be at least 2 characters"),
//   project_type: z.string().min(2, "Skills must be at least 2 characters"),
//   project_link: z.string().min(2, "Project name must be at least 2 characters"),
//   github_link: z.string().min(2, "Project name must be at least 2 characters"),
//   image: z.string().url("Invalid image URL"),
//   other_link: z.string().min(2, "Skills must be at least 2 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
// });

// interface props {
//   data: Project;
//   updateId: string;
// }

// export function EditPostForm({ data, updateId }: props) {
//   const { toast } = useToast();
//   //   const [imageUrl, setImageUrl] = useState("");
//   const [pitch, setPitch] = useState("");
//   const [newImage, setNewImage] = useState<string>("");
//   const router = useRouter();
//   useEffect(() => {
//     if (data.details) {
//       setPitch(data.details);
//     }
//   }, [data.details]);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: data.name || "",
//       tools_used: data.tools_used || "",
//       project_type: data.project_type || "",
//       project_link: data.project_link || "",
//       github_link: data.github_link || "",
//       other_link: data.other_link || "",
//     },
//   });

//   const handleFormSubmit = async (prevState: any, formData: FormData) => {
//     try {
//       // Filter out unchanged or empty fields
//       const updatedData = Object.fromEntries(
//         Object.entries(formData).filter(([key, value]) => {
//           // Exclude fields that are empty or unchanged
//           return value && value !== data[key];
//         })
//       );
  
//       const result = await updateProject(
//         prevState,
//         updatedData,
//         pitch,
//         newImage,
//         updateId
//       );
  
//       if (result.status == "SUCCESS") {
//         toast({
//           title: "Success",
//           description: "Your startup pitch has been updated successfully",
//         });
  
//         router.push(`/`);
//         return redirect("/");
//       }
  
//       return result;
//     } catch (error) {
//       console.log(error);
  
//       toast({
//         title: "Error",
//         description: "An unexpected error has occurred",
//         variant: "destructive",
//       });
  
//       return {
//         ...prevState,
//         error: "An unexpected error has occurred",
//         status: "ERROR",
//       };
//     }
//   };
  

//   const [state, formAction, isPending] = useActionState(handleFormSubmit, {
//     error: "",
//     status: "INITIAL",
//   });
//   return (
//     <div className="container mx-auto py-10">
//       <Card className="w-full max-w-3xl mx-auto">
//         <CardHeader>
//           <CardTitle>Upload Your Project</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form action={formAction} className="space-y-8">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Project Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder={data.name || ""} {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="tools_used"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Tools Used{" "}
//                       <span className="text-muted-foreground">(Optional)</span>{" "}
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder={data.tools_used || ""} {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="project_type"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Project Type{" "}
//                       <span className="text-muted-foreground">(Optional)</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder={data.project_type || ""} {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="project_link"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Project Link
//                       <span className="text-muted-foreground">(Optional)</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g. React, Node.js, TypeScript"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="github_link"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Github Repo
//                       <span className="text-muted-foreground">(Optional)</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g. React, Node.js, TypeScript"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="other_link"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Other Link{" "}
//                       <span className="text-muted-foreground">(Optional)</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="https://github.com/abc.../xyz..."
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="image"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Project Image</FormLabel>
//                     <FormControl>
//                       <UploadDropzone
//                         className="ut-button:w-28 ut-allowed-content:hidden"
//                         endpoint="imageUploader"
//                         onClientUploadComplete={(res) => {
//                           setNewImage(res[0].url);
//                         }}
//                       />
//                     </FormControl>
//                     {newImage && (
//                       <div className="mt-4">
//                         <img
//                           src={newImage ?? `https://avatar.vercel.sh/abc`}
//                           alt="Uploaded project"
//                           className="max-w-full h-auto rounded-lg"
//                         />
//                       </div>
//                     )}
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem data-color-mode="light">
//                     <FormLabel htmlFor="pitch">
//                       Project Description{" "}
//                       <span className="text-muted-foreground">(Optional)</span>
//                     </FormLabel>
//                     <FormControl>
//                       <MDEditor
//                         value={pitch}
//                         onChange={(value) => setPitch(value as string)}
//                         id="bio"
//                         preview="edit"
//                         height={300}
//                         style={{ borderRadius: 20, overflow: "hidden" }}
//                         textareaProps={{
//                           placeholder:
//                             "Briefly describe your idea and what problem it solves",
//                         }}
//                         previewOptions={{
//                           disallowedElements: ["style"],
//                         }}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <SubmitButton text="Submit Project" />
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
