import { MedicineCard } from "@/features/medicine/components/medicine-card";
import { IMedicine } from "@/features/medicine/medicine.type";
import Link from "next/link";

interface ProductShowcaseProps {
  title: string;
  products: IMedicine[];
  linkHref?: string;
  linkText?: string;
  className?: string;
}

export function ProductShowcase({
  title,
  products,
  linkHref = "/medicines",
  linkText = "See All",
  className,
}: ProductShowcaseProps) {
  return (
    <section className={`py-8 ${className || ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Link
          href={linkHref}
          className="text-sm font-medium text-primary hover:underline"
        >
          {linkText}
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <MedicineCard key={product.id} medicine={product} />
        ))}
      </div>
    </section>
  );
}
