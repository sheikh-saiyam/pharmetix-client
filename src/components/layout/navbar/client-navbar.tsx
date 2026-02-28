"use client";

import Logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMedicines } from "@/features/medicine/hooks/use-medicines";
import { ICategory } from "@/features/medicine/medicine.type";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/store/cart.store";
import { IUser, UserRole } from "@/types/user.type";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  PhoneCall,
  Pill,
  Search,
  ShoppingCart,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/**
 * MOBILE MENU COMPONENT
 */
const MobileMenu = ({
  categories,
  user,
  onClose,
  onLogout,
}: {
  categories: ICategory[];
  user: IUser;
  onClose: () => void;
  onLogout: () => void;
}) => (
  <div className="flex flex-col gap-4 p-4">
    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
        Navigation
      </p>
      <Link
        href="/medicines"
        onClick={onClose}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors font-semibold"
      >
        <Pill className="h-5 w-5 text-primary" />
        Medicines
      </Link>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
        Categories
      </p>
      <div className="grid grid-cols-1 gap-1">
        {categories.map((cat) => (
          <Link
            key={`mobile-categories-${cat.id}`}
            href={`/medicines?categoryId=${cat.id}`}
            onClick={onClose}
            className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600 font-medium"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>

    <div className="mt-auto pt-4 border-t flex flex-col gap-4">
      <Button
        variant="outline"
        className="w-full text-red-500 border-red-200 hover:bg-red-50 gap-2"
      >
        <PhoneCall className="h-4 w-4" />
        Call for Order
      </Button>

      {!user || !user.id ? (
        <Link
          href="/auth/login"
          onClick={onClose}
          className="flex items-center justify-center w-full py-2.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition-opacity"
        >
          Login / Signup
        </Link>
      ) : (
        <div className="flex flex-col gap-2 pb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Account
          </p>
          <Link
            href={
              user.role === UserRole.ADMIN
                ? "/dashboard/admin"
                : user.role === UserRole.SELLER
                  ? "/dashboard/seller"
                  : "/customer"
            }
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors font-medium text-slate-700"
          >
            <LayoutDashboard className="h-5 w-5 text-blue-500" />
            Dashboard
          </Link>
          <Link
            href={
              user.role === UserRole.CUSTOMER
                ? "/customer/profile"
                : "/dashboard/profile"
            }
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors font-medium text-slate-700"
          >
            <UserIcon className="h-5 w-5 text-slate-500" />
            Profile
          </Link>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium text-red-600 text-left"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  </div>
);

const ClientNavbar = ({
  categories,
  user,
}: {
  categories: ICategory[];
  user: IUser;
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const { items } = useCartStore();

  const handleLogout = async () => {
    toast.success("Logged out successfully");
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      {/* TOP ROW: Logo, Search, Auth */}
      <div className="container mx-auto px-4 h-16 lg:h-20 flex items-center justify-between gap-2 lg:gap-4">
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] flex flex-col [&>button]:hidden"
            >
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="text-left flex items-center gap-2 select-none">
                  <Image src={Logo} alt="Arogga" width={150} height={50} />
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto">
                <MobileMenu
                  categories={categories}
                  user={user}
                  onClose={() => setIsOpen(false)}
                  onLogout={handleLogout}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="shrink-0 select-none mr-auto lg:mr-0">
          <Image
            src={Logo}
            alt="Arogga"
            width={120}
            height={40}
            className="lg:w-[140px] lg:h-[50px]"
            priority
          />
        </Link>

        {/* Search Bar - Hidden on mobile */}
        {pathName != "/medicines" && (
          <div className="hidden lg:block flex-1 max-w-3xl">
            <SearchDialog
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 lg:gap-6">
          {/* Mobile Search Icon */}
          {pathName != "/medicines" && (
            <div className="lg:hidden">
              <SearchDialog
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isMobileTrigger
              />
            </div>
          )}

          {/* User Profile / Auth */}
          <div className="flex items-center gap-2">
            {user && user.id ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <Link
                href="/auth/login"
                className="hidden lg:block text-sm font-semibold hover:text-primary transition-colors"
              >
                Login / Signup
              </Link>
            )}
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative group">
            <div className="p-2 rounded-full hover:bg-slate-100 transition-colors">
              <ShoppingCart className="h-6 w-6 lg:h-7 lg:w-7 text-slate-700" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {items.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* BOTTOM ROW: Categories Navigation - Hidden on mobile */}
      <div className="hidden lg:block border-t bg-white overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex items-center justify-between h-12 text-[13px] font-medium whitespace-nowrap">
          <div className="flex items-center gap-6">
            {/* Medicines (Replaced Shop by Category) */}
            <Link
              href="/medicines"
              className="flex items-center gap-2 hover:text-primary font-bold hover:opacity-80 transition-colors"
            >
              <Pill className="h-5 w-5 -mt-0.5" />
              Medicines
            </Link>

            {/* Dynamic Categories */}
            {categories.map((cat) => (
              <Link
                key={`navbar-categories-${cat.id}`}
                href={`/medicines?categoryId=${cat.id}`}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Call to Order */}
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2 h-8"
          >
            <PhoneCall className="h-4 w-4" />
            Call for Order
          </Button>
        </div>
      </div>
    </header>
  );
};

/** * FULLSCREEN SEARCH DIALOG COMPONENT
 */
function SearchDialog({
  searchQuery,
  setSearchQuery,
  isMobileTrigger = false,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMobileTrigger?: boolean;
}) {
  const { data: searchResults, isLoading } = useMedicines({
    search: searchQuery,
    limit: 6,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isMobileTrigger ? (
          <Button variant="ghost" size="icon" className="shrink-0">
            <Search className="h-6 w-6 text-slate-700" />
          </Button>
        ) : (
          <div className="relative w-full cursor-pointer group bg-sidebar-rin">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
              <Search className="h-5 w-5" />
            </div>
            <div className="w-full h-11 bg-sidebar-ring/5 rounded-md border border-sidebar-ring/10 group-hover:border-slate-300 flex items-center px-10 text-slate-700">
              Search for &quot;healthcare products&quot;
            </div>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen rounded-none h-screen border-0 border-t-0 flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              autoFocus
              placeholder="Search for medicines, brands or generics..."
              className="pl-10 h-12 text-lg border-none focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 w-full bg-slate-50 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {searchQuery ? "Search Results" : "Suggested Products"}
              </h3>
              {searchResults?.data.map((medicine) => (
                <Link
                  key={`navbar-search-medicine-${medicine.id}`}
                  href={`/medicine/${medicine.slug}`}
                  className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded shrink-0 overflow-hidden">
                    {medicine.image && (
                      <Image
                        src={medicine.image}
                        alt={medicine.brandName}
                        className="object-cover w-full h-full"
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">
                      {medicine.brandName} {medicine.strength}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {medicine.genericName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">৳{medicine.price}</p>
                    <p className="text-[10px] text-slate-400">
                      {medicine.dosageForm}
                    </p>
                  </div>
                </Link>
              ))}
              {searchQuery && searchResults?.data.length === 0 && (
                <p className="text-center py-10 text-slate-500">
                  No medicines found matching &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * USER MENU DROPDOWN
 */
function UserMenu({ user, onLogout }: { user: IUser; onLogout: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center ring-sidebar-ring/50 ring-3 gap-2 px-2 py-4 h-12 hover:bg-slate-100"
        >
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={user.image || ""} className="object-cover" />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm text-slate-500 leading-tight">
              Hello,{" "}
              <span className="text-slate-600">{user.name?.split(" ")[0]}</span>
            </p>
            <p className="text-xs font-bold text-slate-700 leading-tight">
              Go to Dashboard
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="w-54 p-2 shadow-xl rounded-xl border-slate-200"
      >
        {/* User Info Header */}
        <div className="px-3 py-3 mb-1 rounded-lg">
          <p className="text-sm font-bold text-slate-700 truncate">
            {user.email}
          </p>
        </div>

        <DropdownMenuSeparator className="mx-1 my-1 border" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            asChild
            className="rounded-md cursor-pointer py-1.5 focus:bg-slate-100"
          >
            <Link
              href={
                user.role === UserRole.ADMIN
                  ? "/dashboard/admin"
                  : user.role === UserRole.SELLER
                    ? "/dashboard/seller"
                    : "/customer"
              }
              className="flex w-full items-center"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600 mr-2">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-700">Dashboard</span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="rounded-md cursor-pointer py-1.5 focus:bg-slate-100"
          >
            <Link
              href={
                user.role === UserRole.CUSTOMER
                  ? "/customer/profile"
                  : "/dashboard/profile"
              }
              className="flex w-full items-center"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600 mr-2">
                <UserIcon className="h-4 w-4" />
              </div>
              <span className="font-semibold text-slate-700">Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-1 my-1 border" />

        <DropdownMenuItem
          onClick={onLogout}
          className="rounded-md cursor-pointer py-1.5 text-red-600 focus:bg-red-50 focus:text-red-700 transition-colors"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-red-100/50 mr-2">
            <LogOut className="h-4 w-4 text-red-600" />
          </div>
          <span className="font-bold">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ClientNavbar;
