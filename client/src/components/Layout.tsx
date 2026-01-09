import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Wallet, 
  ArrowDownToLine, 
  FileText, 
  Upload, 
  BookOpen,
  Bell,
  Search,
  User,
  Menu,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
}

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: PlusCircle, label: "Create MID", href: "/create-mid" },
  { icon: Wallet, label: "Money Wallet", href: "/wallet" },
  { icon: ArrowDownToLine, label: "My Withdrawals", href: "/withdrawals" },
  { icon: FileText, label: "Payin Ledger", href: "/ledger", active: true },
  { icon: Upload, label: "Payout Ledger", href: "/payouts" },
  { icon: FileText, label: "Bulk Payout", href: "/bulk" },
  { icon: BookOpen, label: "Webhook Guide", href: "/webhooks" },
];

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar - Dark & Premium */}
      <aside className="w-72 bg-[#1e293b] text-gray-300 flex-shrink-0 hidden lg:flex flex-col border-r border-gray-800">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              F
            </div>
            <span className="text-xl font-heading font-bold text-white tracking-tight">FinDashboard</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = location === item.href || (item.active && location === "/");
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-600/80 text-white shadow-md shadow-indigo-900/20 border-l-4 border-teal-400 pl-2" 
                    : "hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h4 className="text-sm font-semibold text-white mb-1">Need Help?</h4>
            <p className="text-xs text-gray-400 mb-3">Check our docs or contact support.</p>
            <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-medium text-white transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 hidden md:block">
              Payin Ledger
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold hover:bg-indigo-100 transition-colors border border-indigo-100">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Try Demo APIs
            </button>

            <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                    JD
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-bold text-gray-700">John Doe</p>
                    <p className="text-[10px] text-gray-500">Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
