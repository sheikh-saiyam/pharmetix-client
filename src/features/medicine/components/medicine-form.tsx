"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  medicineSchema,
  MedicineSchema,
} from "@/features/medicine/schemas/medicine.schema";
import { useCategories } from "@/features/category/hooks/use-categories";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateMedicine,
  useUpdateMedicine,
} from "@/features/medicine/hooks/use-seller-medicines";

interface MedicineFormProps {
  onSuccess?: () => void;
  initialData?: any; // Medicine type
}

export function MedicineForm({ onSuccess, initialData }: MedicineFormProps) {
  const { data: categories } = useCategories();
  const createMutation = useCreateMedicine();
  const updateMutation = useUpdateMedicine();

  const form = useForm<MedicineSchema>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      brandName: initialData?.brandName || "",
      genericName: initialData?.genericName || "",
      strength: initialData?.strength || "",
      dosageForm: initialData?.dosageForm || "",
      price: initialData?.price || 0,
      stockQuantity: initialData?.stockQuantity || 0,
      categoryId: initialData?.categoryId || "",
      image: initialData?.image || "",
      description: initialData?.description || "",
      expiryDate: initialData?.expiryDate
        ? new Date(initialData.expiryDate).toISOString().split("T")[0]
        : "",
      manufacturer: initialData?.manufacturer || "",
    },
  });

  async function onSubmit(values: MedicineSchema) {
    if (initialData) {
      updateMutation.mutate(
        { id: initialData.id, payload: values },
        {
          onSuccess: () => {
            form.reset();
            onSuccess?.();
          },
        },
      );
    } else {
      createMutation.mutate(values as any, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input placeholder="Napa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genericName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Generic Name</FormLabel>
                <FormControl>
                  <Input placeholder="Paracetamol" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="strength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strength</FormLabel>
                <FormControl>
                  <Input placeholder="500mg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dosageForm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosage Form</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select form" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TABLET">Tablet</SelectItem>
                    <SelectItem value="SYRUP">Syrup</SelectItem>
                    <SelectItem value="CAPSULE">Capsule</SelectItem>
                    <SelectItem value="INJECTION">Injection</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.data?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Saving..." : "Save Medicine"}
        </Button>
      </form>
    </Form>
  );
}
