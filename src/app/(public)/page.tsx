import { Sidebar } from "@/components/home/sidebar";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryGrid } from "@/components/home/category-grid";
import { ProductShowcase } from "@/components/home/product-showcase";
import { ReviewsSection } from "@/components/home/reviews";
import { FeaturesSection } from "@/components/home/features-section";

export default function Home() {
  const genericProducts = [
    {
      id: "1",
      name: "Napa Extend 665mg",
      category: "Fever & Pain",
      price: 25,
      originalPrice: 30,
      image: "",
      isNew: true,
    },
    {
      id: "2",
      name: "Sergel 20mg",
      category: "Gastric",
      price: 70,
      image: "",
      discount: 10,
    },
    { id: "3", name: "Monas 10mg", category: "Asthma", price: 150, image: "" },
    {
      id: "4",
      name: "Tylace",
      category: "Pain Relief",
      price: 45,
      originalPrice: 50,
      image: "",
    },
    {
      id: "5",
      name: "Alatrol 10mg",
      category: "Allergy",
      price: 35,
      image: "",
    },
  ];

  const otcProducts = [
    {
      id: "101",
      name: "Savlon Antiseptic",
      category: "First Aid",
      price: 120,
      image: "",
    },
    {
      id: "102",
      name: "Band Aid Box",
      category: "First Aid",
      price: 250,
      image: "",
    },
    {
      id: "103",
      name: "Dettol Liquid",
      category: "Antiseptic",
      price: 95,
      image: "",
    },
    {
      id: "104",
      name: "Hexisol Hand Rub",
      category: "Disinfectant",
      price: 180,
      image: "",
      discount: 15,
    },
    {
      id: "105",
      name: "Cotton Roll 50g",
      category: "First Aid",
      price: 40,
      image: "",
    },
  ];

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] gap-6 md:px-6 py-6">
      <Sidebar className="hidden md:block sticky top-20 self-start" />
      <main className="flex w-full flex-col overflow-hidden pl-0 md:pl-2">
        <HeroBanner />
        <FeaturesSection />
        <CategoryGrid />
        <ProductShowcase
          title="Especially For You"
          products={genericProducts}
          linkHref="/personalized"
          className="mt-4"
        />
        <ProductShowcase
          title="OTC Medicines"
          products={otcProducts}
          linkHref="/otc"
          className="mt-4 bg-muted/20 p-6 rounded-xl"
        />
        <ProductShowcase
          title="Everyday Essentials"
          products={genericProducts}
          linkHref="/essentials"
          className="mt-4"
        />
        <ReviewsSection />
      </main>
    </div>
  );
}
