"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/features/category/hooks/use-admin-categories";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type CategorySchema = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData?: { id: string; name: string; image?: string };
  onSuccess: () => void;
}

export function CategoryForm({ initialData, onSuccess }: CategoryFormProps) {
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      image: initialData?.image || "",
    },
  });

  async function onSubmit(values: CategorySchema) {
    if (initialData) {
      updateMutation.mutate(
        { id: initialData.id, payload: values },
        {
          onSuccess: () => {
            onSuccess();
            form.reset();
          },
        },
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          onSuccess();
          form.reset();
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Tablets" {...field} />
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
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {initialData ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
