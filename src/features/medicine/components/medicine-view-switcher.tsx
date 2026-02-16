"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface MedicineViewSwitcherProps {
  currentView: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function MedicineViewSwitcher({
  currentView,
  onViewChange,
}: MedicineViewSwitcherProps) {
  return (
    <div className="flex items-center gap-1 border rounded-md p-1">
      <Button
        variant={currentView === "list" ? "default" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => onViewChange("list")}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={currentView === "grid" ? "default" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => onViewChange("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );
}
