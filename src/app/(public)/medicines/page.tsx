import { PageLoader } from "@/components/layout/loader";
import { Suspense } from "react";
import MedicinesClientPage from "./client-page";

export default function MedicinesPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <MedicinesClientPage />
    </Suspense>
  );
}
