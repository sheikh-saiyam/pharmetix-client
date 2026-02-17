"use client";

import { ImageUploadField } from "@/components/form/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/features/category/hooks/use-categories";
import {
  useCreateMedicine,
  useUpdateMedicine,
} from "@/features/medicine/hooks/use-seller-medicines";
import {
  medicineSchema,
  MedicineSchema,
} from "@/features/medicine/schemas/medicine.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { IMedicine } from "../medicine.type";

interface MedicineFormProps {
  onSuccess?: () => void;
  initialData?: IMedicine;
}

export function MedicineForm({ onSuccess, initialData }: MedicineFormProps) {
  const { data: categories } = useCategories();
  const createMutation = useCreateMedicine();
  const updateMutation = useUpdateMedicine();

  const defaultValues: DefaultValues<MedicineSchema> = {
    brandName: initialData?.brandName || "",
    genericName: initialData?.genericName || "",
    strength: initialData?.strength || "",
    dosageForm: initialData?.dosageForm || "",
    price: initialData?.price || 0,
    stockQuantity: initialData?.stockQuantity || 0,
    categoryId: initialData?.category?.id || "",
    image: initialData?.image || "",
    description: initialData?.description || "",
    expiryDate: initialData?.expiryDate
      ? new Date(initialData.expiryDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    manufacturer: initialData?.manufacturer || "",
  };

  const form = useForm<MedicineSchema>({
    resolver: zodResolver(medicineSchema),
    defaultValues,
  });

  async function onSubmit(values: MedicineSchema) {
    if (initialData) {
      const payload: Partial<MedicineSchema> = {};
      (Object.keys(values) as Array<keyof MedicineSchema>).forEach((key) => {
        if (values[key] !== defaultValues[key]) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (payload as any)[key] = values[key];
        }
      });

      if (payload.expiryDate) {
        payload.expiryDate = new Date(payload.expiryDate).toISOString();
      }

      updateMutation.mutate(
        { id: initialData.id, payload: payload },
        {
          onSuccess: () => {
            form.reset();
            onSuccess?.();
          },
        },
      );
    } else {
      const payload = {
        ...values,
        expiryDate: new Date(values.expiryDate).toISOString(),
      };

      createMutation.mutate(payload, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      });
    }
  }

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ImageUploadField
              control={form.control}
              name="image"
              label="Medicine Image"
              previewClassName="w-full aspect-video border rounded-xl overflow-hidden"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-700">
                      Brand Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Napa" {...field} />
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
                    <FormLabel className="text-sm text-slate-700">
                      Generic Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Paracetamol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="strength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-700">
                      Strength
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 500mg" {...field} />
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
                    <FormLabel className="text-sm text-slate-700">
                      Dosage Form
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-12">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-700">
                      Price (BDT)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                    <FormLabel className="text-sm text-slate-700">
                      Stock Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-700">
                      Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-12">
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
                    <FormLabel className="text-sm text-slate-700">
                      Expiry Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-slate-700">
                    Manufacturer
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Square Pharmaceuticals Ltd."
                      {...field}
                    />
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
                  <FormLabel className="text-sm text-slate-700">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter medicine details..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="w-full md:w-auto h-12 px-8 bg-primary/60 hover:bg-primary/70 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                {initialData ? "Update Medicine" : "Add Medicine"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
