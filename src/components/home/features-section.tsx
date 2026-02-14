import { Truck, ShieldCheck, Headphones, Clock } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Delivery within 24 hours in Dhaka",
    },
    {
      icon: ShieldCheck,
      title: "100% Genuine",
      description: "All medicines are sourced directly",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Pharmacists available for consultation",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Order anytime, anywhere",
    },
  ];

  return (
    <section className="py-8 border-t border-b bg-muted/10 my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-2 p-4">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <feature.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
