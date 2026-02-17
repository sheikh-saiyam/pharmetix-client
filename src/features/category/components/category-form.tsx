"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { Textarea } from "@/components/ui/textarea";
import {
  categorySchema,
  CategorySchema,
} from "@/features/category/schemas/category.schema";
import { ImageUploadField } from "@/components/form/image-upload-field";

interface CategoryFormProps {
  initialData?: {
    id: string;
    name: string;
    image?: string;
    description?: string;
  };
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
      description: initialData?.description || "",
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
                <Input placeholder="e.g. Tablets, Syrups" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ImageUploadField
          name="image"
          control={form.control}
          label="Category Image"
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe this category..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {createMutation.isPending || updateMutation.isPending
              ? "Saving..."
              : initialData
                ? "Update Category"
                : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
