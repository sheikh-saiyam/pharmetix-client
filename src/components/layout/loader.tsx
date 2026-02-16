import { Skeleton } from "../ui/skeleton";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary/60" />
    </div>
  );
};

const CustomerPageLoader = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-[200px]" />
      <Skeleton className="h-[500px] w-full" />
    </div>
  );
};

export { PageLoader, CustomerPageLoader };
