import { categoryService } from "@/features/category/services/category.service";
import ClientNavbar from "./client-navbar";
import { getSession } from "@/lib/get-session";
import { IUser } from "@/types/user.type";

const ServerNavbar = async () => {
  const { data: session } = await getSession();

  const categories = await categoryService.getAll({ limit: 8 });

  return (
    <ClientNavbar categories={categories.data} user={session?.user as IUser} />
  );
};

export default ServerNavbar;
