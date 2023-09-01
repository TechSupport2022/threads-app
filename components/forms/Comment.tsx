"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter } from "next/navigation";

import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
// import { createThread } from "@/lib/actions/thread.actions";
// import { updateUser } from "@/lib/actions/user.actions";



interface Props {
   threadId: string;
   currentUserImg: string;
   currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId, }: Props) => {
   const router = useRouter()
   const pathName = usePathname()

   // console.log(currentUserImg)


   const form = useForm({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
         thread: '',
      }
   })


   const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      await addCommentToThread({
        threadId,
        commentText: values.thread,
        userId: JSON.parse(currentUserId),
        path: pathName

      });

      form.reset();
   };


   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}
            className="comment-form">

            <FormField
               control={form.control}
               name="thread"
               render={({ field }) => (
                  <FormItem className="flex gap-3 items-center w-full">
                     <FormLabel>
                        <Image 
                           src={`${currentUserImg}`}
                           alt="Profile image"
                           width={48}
                           height={48}
                           className="rounded-full object-cover"
                        />
                     </FormLabel>
                     <FormControl className="border-none bg-transparent">
                        <Input
                           placeholder="Comment..."
                           type="text"
                           className="no-focus text-light-1 outline-none"
                           {...field}
                        />
                     </FormControl>
                  </FormItem>
               )}
            />
            <Button type="submit" className="comment-form_btn">
               Reply
            </Button>
         </form>
      </Form>
   )
}

export default Comment;