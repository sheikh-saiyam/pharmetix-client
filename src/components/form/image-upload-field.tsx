"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader2, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { toast } from "sonner";

interface ImageUploadFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  noLabel?: boolean;
  className?: string;
  previewClassName?: string;
  noPreviewClassName?: string;
}

export function ImageUploadField<TFieldValues extends FieldValues>({
  control,
  name,
  label = "Upload Image",
  noLabel = false,
  className,
  previewClassName,
  noPreviewClassName,
}: ImageUploadFieldProps<TFieldValues>) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Upload to our API
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setPreview(null);
        onChange("");

        toast.error(data.error || "Failed to upload image");
        control.setError(name, {
          type: "manual",
          message: data.error || "Failed to upload image",
        });
      }

      if (data.url) {
        onChange(data.url);
      }
    } catch {
      setPreview(null);
      onChange("");
      toast.error("Failed to upload image");
      control.setError(name, {
        type: "manual",
        message: "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (onChange: (value: string) => void) => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const displayImage = preview || field.value;

        return (
          <FormItem className={cn("space-y-2", className)}>
            {!noLabel && (
              <FormLabel className="text-slate-700">{label}</FormLabel>
            )}
            <FormControl>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, field.onChange)}
                />

                {!displayImage ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "w-full h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition-all gap-2 group",
                      noPreviewClassName,
                    )}
                  >
                    <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-slate-500 group-hover:text-primary">
                      Click to upload
                    </span>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "relative w-full aspect-video max-h-[200px] border-2 border-slate-100 rounded-xl overflow-hidden group",
                      previewClassName,
                    )}
                  >
                    <Image
                      src={displayImage}
                      alt="Preview"
                      fill
                      className={cn("object-cover")}
                      unoptimized={displayImage.startsWith("blob:")}
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white gap-2">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="text-xs font-medium">
                          Uploading...
                        </span>
                      </div>
                    )}
                    {!isUploading && (
                      <button
                        type="button"
                        onClick={() => removeImage(field.onChange)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
