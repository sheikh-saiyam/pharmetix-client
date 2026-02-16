import { CategoryGrid } from "@/components/home/category-grid";
import { HeroBanner } from "@/components/home/hero-banner";
import { ProductShowcase } from "@/components/home/product-showcase";
import { ReviewsSection } from "@/components/home/reviews";
import { Sidebar } from "@/components/home/sidebar";
import { categoryService } from "@/features/category/services/category.service";
import { reviewService } from "@/features/review/services/review.service";
import { medicineService } from "@/features/medicine/services/medicine.service";

export default async function Home() {
  const categories = await categoryService.getAll();
  const reviews = await reviewService.getAll();
  const otcMedicines = await medicineService.getAll({
    limit: 8,
  });
  const featuredMedicines = await medicineService.getAll({
    isFeatured: true,
    limit: 4,
  });

  return (
    <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] md:gap-10">
      <Sidebar
        categories={categories.data}
        className="hidden md:block sticky top-20 self-start"
      />
      <main className="mx-auto md:px-6 w-full overflow-hidden">
        <HeroBanner />
        <CategoryGrid categories={categories.data.slice(0, 12)} />
        <ProductShowcase
          title="Especially For You"
          products={otcMedicines.data}
          linkHref="/personalized"
          className="mt-4 bg-blue-50/50 p-6 rounded-xl border border-blue-100/50"
        />
        <ProductShowcase
          title="OTC Medicines"
          products={otcMedicines.data}
          linkHref="/otc"
          className="mt-8 bg-emerald-50/50 p-6 rounded-xl border border-emerald-100/50"
        />
        <ProductShowcase
          title="Featured Medicines"
          products={featuredMedicines.data}
          linkHref="/medicines?isFeatured=true"
          className="mt-4 bg-pink-50/50 p-6 rounded-xl border border-pink-100/50"
        />
        <ReviewsSection reviews={reviews.data} />
      </main>
    </div>
  );
}
