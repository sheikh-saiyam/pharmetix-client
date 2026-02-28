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
    unit: initialData?.unit || "mg",
    packSize: initialData?.packSize || 1,
    dosageInfo: initialData?.dosageInfo || "",
    price: initialData?.price || 0,
    piecePrice: initialData?.piecePrice || 0,
    stockQuantity: initialData?.stockQuantity || 0,
    categoryId: initialData?.category?.id || "",
    image: initialData?.image || "",
    description: initialData?.description || "",
    expiryDate: initialData?.expiryDate
      ? new Date(initialData.expiryDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    manufacturer: initialData?.manufacturer || "",
    isFeatured: initialData?.isFeatured || false,
  };

  const form = useForm<MedicineSchema>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(medicineSchema as any),
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
            <div className="flex flex-col gap-6">
              <div className="flex-1">
                <ImageUploadField
                  control={form.control}
                  name="image"
                  label="Medicine Image"
                  previewClassName="w-full aspect-[4/3] border rounded-xl overflow-hidden"
                />
              </div>
              <div className="flex-1 flex flex-col justify-end">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4 shadow-sm bg-slate-50/50">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base font-semibold text-slate-800">
                          Featured Medicine
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Display this on home page
                        </p>
                      </div>
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Brand Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Napa"
                        className="h-11"
                        {...field}
                      />
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
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Generic Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Paracetamol"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="strength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Strength
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 500mg"
                        className="h-11"
                        {...field}
                      />
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
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Dosage Form
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-11">
                          <SelectValue placeholder="Select form" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="TABLET">Tablet</SelectItem>
                        <SelectItem value="CAPSULE">Capsule</SelectItem>
                        <SelectItem value="SYRUP">Syrup</SelectItem>
                        <SelectItem value="SUSPENSION">Suspension</SelectItem>
                        <SelectItem value="DROPS">Drops</SelectItem>
                        <SelectItem value="CREAM">Cream</SelectItem>
                        <SelectItem value="OINTMENT">Ointment</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Unit
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. mg, ml, pack"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Pack Price (BDT)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-11"
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
                name="piecePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Unit Price (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-11"
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
                name="packSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Pack Size (e.g. 10)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-11"
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
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-11">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
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
                name="stockQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Stock Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-11"
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
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Manufacturer
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Square Pharmaceuticals Ltd."
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Expiry Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dosageInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Dosage Info (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 1+0+1 after meal"
                      className="h-11"
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
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Detailed Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter medicine details, side effects, etc..."
                      className="min-h-[120px] rounded-xl"
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
                className="w-full md:w-auto h-12 px-10 bg-primary/80 hover:bg-primary text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                {initialData ? "Update Medicine" : "Register Medicine"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
