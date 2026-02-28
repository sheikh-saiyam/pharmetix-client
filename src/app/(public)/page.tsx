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

  const personalCareMedicines = await medicineService.getAll({
    page: 2,
    limit: 4,
  });
  const otcMedicines = await medicineService.getAll({
    limit: 8,
  });
  const featuredMedicines = await medicineService.getAll({
    isFeatured: true,
    limit: 4,
  });

  return (
    <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] md:gap-10 px-6 md:px-0">
      <Sidebar
        categories={categories.data}
        className="hidden md:block sticky top-20 self-start"
      />
      <main className="mx-auto md:px-6 w-full overflow-hidden">
        <HeroBanner />
        <CategoryGrid categories={categories.data.slice(0, 12)} />
        <ProductShowcase
          title="Especially For You"
          products={personalCareMedicines.data}
          linkHref="/medicines"
          className="mt-4"
          barBgColor="bg-blue-500"
          actionButtonClassname="bg-blue-500 text-white hover:text-white"
          medicineCardColor="oklch(62.3% 0.214 259.815)"
        />
        <ProductShowcase
          title="OTC Medicines"
          products={otcMedicines.data}
          linkHref="/medicines"
          className="mt-8"
          barBgColor="bg-primary"
          actionButtonClassname="bg-primary text-white hover:text-white"
          medicineCardColor="oklch(0.58 0.23 145)"
        />
        <ProductShowcase
          title="Featured Medicines"
          products={featuredMedicines.data}
          linkHref="/medicines?isFeatured=true"
          className="mt-4"
          barBgColor="bg-pink-500"
          actionButtonClassname="bg-pink-500 text-white hover:text-white"
          medicineCardColor="oklch(65.6% 0.241 354.308)"
        />
        <ReviewsSection reviews={reviews.data} />
      </main>
    </div>
  );
}
