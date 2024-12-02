
import axios from "axios";
import React from "react";

import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LucideImagePlus } from "lucide-react";

import FileUpload from "../FileUpload";
import { SingleImageDropzone } from "../SingleImageDropZone";
import { Form, FormControl, FormDescription, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Server } from "@prisma/client";
import { ModalData, useModal } from "@/hooks/UseModalStore";
import { useEdgeStore } from "@/lib/edgestore";

const formSchema = zod.object({
  name: zod.string().min(1, { message: "Server name is required." }),
  imageUrl: zod.string().min(1, { message: "Server image is required." }),
});

export const ServerOverview = ({ server }:{ server?: Server}) => {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = React.useState<File>();

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: server?.name || "", imageUrl: server?.imageUrl || "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    if (file) {
      const res = await edgestore.publicImages.upload({file});
      if (res.url) { 
        data.imageUrl = res.url;
      } 
    }

    console.log("form val: ", data);
    try {
      await axios.patch(`/api/servers/${server?.id}`, data);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="sectionTitle">
        <div className="text-xl capitalize font-semibold flex flex-1 cursor-default mb-5">Server Overview</div>
      </div>

      <div className="children flex flex-col text-muted-foreground">
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="flex gap-5">
                <div className="flex gap-5 basis-1/2 justify-start items-start">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="text-center">
                        <FormControl className="w-[120px] flex justify-center">
                          <div className="relative inline-block w-full">
                            <SingleImageDropzone {...field} width={100} height={100} value={file || server?.imageUrl} className="min-h-0 min-w-0 rounded-full"
                              onChange={(file) => { setFile(file) }}
                            />
                            <div className="absolute top-0 right-0 bg-white text-black rounded-full p-1.5 shadow">
                              <LucideImagePlus className="w-4 h-4" />
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="inline-block mt-2.5 text-[0.625rem]">Minimum Size: <strong>128x128</strong></FormDescription>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col items-start justify-start min-w-48">
                    <div className="text-sm font-normal mb-2 cursor-default">
                      We recommend an image of at least 512x512 for the server.
                    </div>
                    <Button type="button" variant={"outline"} className="rounded-sm mt-2 border-[#525458] bg-transparent hover:bg-[#525458]">Upload Image</Button>
                  </div>
                </div>

                <div className="flex gap-2 flex-1 justify-start items-start">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="min-w-full">
                        <div
                          className="text-xs"
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          Server Name
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            className="h-10 rounded-sm min-w-full"
                            style={{
                              background: "#1e1f22",
                              border: 0,
                              fontSize: "1rem",
                            }}
                            placeholder="Enter your server name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" variant={"default"} disabled={isLoading} className="font-medium rounded-sm px-7">
                Create
              </Button>
            </form>
          </Form>
        </div>
        <Separator className="my-10 bg-[#525458]"/>
      </div>
    </div>
  )
} 