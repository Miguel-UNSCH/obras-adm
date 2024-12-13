import Sidebar from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="p-4 flex-1 overflow-y-auto">
      {children}
      </div>
    </div>
  );
}