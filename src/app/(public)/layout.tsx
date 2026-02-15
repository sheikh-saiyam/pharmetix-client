import { Footer } from "@/components/layout/footer";
import ServerNavbar from "@/components/layout/navbar/server-navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ServerNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
