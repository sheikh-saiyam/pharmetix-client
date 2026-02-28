import { categoryService } from "@/features/category/services/category.service";
import ClientNavbar from "./client-navbar";
import { getSession } from "@/lib/get-session";
import { IUser } from "@/types/user.type";

const ServerNavbar = async () => {
  const [categories, session] = await Promise.all([
    categoryService.getAll({ limit: 8 }),
    getSession(),
  ]);

  return (
    <ClientNavbar
      categories={categories.data}
      user={session?.data?.user as IUser}
    />
  );
};

export default ServerNavbar;
