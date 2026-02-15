"use client";

import { useSellerMedicines } from "@/features/medicine/hooks/use-seller-medicines";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MedicineForm } from "@/features/medicine/components/medicine-form";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function SellerMedicinesPage() {
  const { data, isLoading } = useSellerMedicines();
  const [open, setOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);

  const handleEdit = (medicine: any) => {
    setSelectedMedicine(medicine);
    setOpen(true);
  };

  const handleAddNew = () => {
    setSelectedMedicine(null);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Medicines</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedMedicine ? "Edit Medicine" : "Add New Medicine"}
              </DialogTitle>
            </DialogHeader>
            <MedicineForm
              onSuccess={() => setOpen(false)}
              initialData={selectedMedicine}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand Name</TableHead>
              <TableHead>Generic Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              data?.data?.map((medicine: any) => (
                <TableRow key={medicine.id}>
                  <TableCell className="font-medium">
                    {medicine.brandName}
                  </TableCell>
                  <TableCell>{medicine.genericName}</TableCell>
                  <TableCell>
                    {medicine.stockQuantity < 10 ? (
                      <Badge variant="destructive">
                        {medicine.stockQuantity}
                      </Badge>
                    ) : (
                      medicine.stockQuantity
                    )}
                  </TableCell>
                  <TableCell>৳{medicine.price}</TableCell>
                  <TableCell>
                    {new Date(medicine.expiryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(medicine)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
