"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubmitButton from "./forms/SubmitButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoriesSchema } from "@/validation/adminSchema";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { addCategory, updateCategory } from "../../_actions/category";
import { Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const CategoriesForm = ({ data }) => {
  const router = useRouter();

  const [mode, setMode] = useState(data?.categoryName ? "update" : "create");
  const [isPending, startTranstion] = useTransition();

  const form = useForm({
    resolver: zodResolver(CategoriesSchema),
    defaultValues: {
      categoryName: data?.categoryName || "",
    },
  });

  const onSubmitCreate = async (form) => {
    try {
      startTranstion(async () => {
        const result = await addCategory(form);

        if (result) {
          toast({
            description: (
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500" />
                <span className="ml-2 ">Category added successfully</span>
              </div>
            ),
          });

          router.push("/admin/categories");
        }
      });
    } catch (error) {
      const { response } = error;
      const { data, status } = response || {};

      if (status === 400 || status === 409) {
        const { message } = data || { message: "Something went wrong" };

        toast({
          title: "Error occurred",
          variant: "destructive",
          status: "error",
          description: message,
        });
      } else {
        console.log("err", error);
      }
    }
  };

  const onSubmitEdit = async (form) => {
    const formData = {
      ...form,
      id: data.id,
    };

    try {
      startTranstion(async () => {
        const result = await updateCategory(formData);

        if (result) {
          toast({
            description: (
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500" />
                <span className="ml-2 ">Category updated successfully</span>
              </div>
            ),
          });

          router.push("/admin/categories");
        }
      });
    } catch (error) {
      const { response } = error;
      const { data, status } = response || {};

      if (status === 400 || status === 409) {
        const { message } = data || { message: "Something went wrong" };

        toast({
          title: "Error occurred",
          variant: "destructive",
          status: "error",
          description: message,
        });
      } else {
        console.log("err", error);
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {data !== undefined ? "Edit Category" : "Create Category"}
          </CardTitle>
        </CardHeader>
        <hr className="mx-5 border-t border-slate-400 py-2" />
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={
                mode === "create"
                  ? form.handleSubmit(onSubmitCreate)
                  : form.handleSubmit(onSubmitEdit)
              }
              className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Category Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the category identifier.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <SubmitButton isPending={isPending} />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm italic">
            Please remember that any changes made will directly reflect on the
            front store page.
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default CategoriesForm;
