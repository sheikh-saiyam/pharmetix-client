import { categoryService } from "@/features/category/services/category.service";
import ClientNavbar from "./client-navbar";
import { getSession } from "@/lib/get-session";

const ServerNavbar = async () => {
  const { data: session } = await getSession();

  const categories = await categoryService.getAll({ limit: 10 });

  return <ClientNavbar categories={categories.data} user={session?.user} />;
};

export default ServerNavbar;
