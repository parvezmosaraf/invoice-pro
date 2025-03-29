import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, FileText, Users, Palette, Settings, Menu, X, LogOut, Receipt, LayoutGrid, FileEdit, Users2, FileIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "./PageTransition";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserService from "@/services/UserService";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const user = UserService.getCurrentUser();
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    UserService.clearUser();
    navigate('/login');
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutGrid },
    { name: "Invoices", path: "/invoice", icon: Receipt },
    { name: "Templates", path: "/templates", icon: FileEdit },
    { name: "Clients", path: "/clients", icon: Users2 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden lg:block w-72 border-r bg-card">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">ProInvoice</span>
            </Link>
            <ThemeToggle />
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 lg:hidden">
        <div className="flex h-16 items-center gap-4 border-b bg-background px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-full flex-col">
                <div className="border-b px-6 py-4 flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="text-xl font-semibold">ProInvoice</span>
                  </Link>
                  <ThemeToggle />
                </div>
                <nav className="flex-1 space-y-1 p-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                        )
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="min-h-screen p-4 pt-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
