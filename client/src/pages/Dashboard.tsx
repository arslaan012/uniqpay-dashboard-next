import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useTransactions, useDashboardStats } from "@/hooks/use-transactions";
import { Search, Bell, Globe, ChevronLeft, ChevronRight, Download, FileSpreadsheet, File as FilePdf, Filter, MoreHorizontal, Calendar as CalendarIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: transactions, isLoading: isLoadingTxns } = useTransactions();
  const { data: stats, isLoading: isLoadingStats } = useDashboardStats();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions?.filter(t => 
    searchTerm === "" || 
    Object.values(t).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Layout>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard 
          title="Total Balance" 
          value={stats?.totalBalance} 
          isLoading={isLoadingStats}
          gradient="from-indigo-500 to-blue-600"
          highlight
        />
        <StatsCard 
          title="Today Deposited" 
          value={stats?.todayDeposited} 
          isLoading={isLoadingStats}
          gradient="from-emerald-500 to-teal-500"
        />
      </div>

      {/* Filters & Actions Section */}
      <div className="bg-white p-5 rounded-xl border border-border shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                <SelectValue placeholder="Transaction Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payin">Payin</SelectItem>
                <SelectItem value="payout">Payout</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Select Dates
            </Button>
          </div>
          
          <Button className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200">
            Email Report
          </Button>
        </div>
      </div>

      {/* Transactions Table Section */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-2 text-green-700 bg-green-50 border-green-200 hover:bg-green-100 hover:text-green-800">
              <FileSpreadsheet className="w-4 h-4" /> Excel
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-2 text-red-700 bg-red-50 border-red-200 hover:bg-red-100 hover:text-red-800">
              <FilePdf className="w-4 h-4" /> PDF
            </Button>
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <span className="text-sm text-gray-500">Show</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px] h-9">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">entries</span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search transactions..." 
              className="pl-9 h-10 bg-white border-gray-200 focus:border-indigo-300 focus:ring-indigo-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100 font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Txn Ref</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Gross</th>
                <th className="px-6 py-4 text-right">MDR</th>
                <th className="px-6 py-4 text-right">Net</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoadingTxns ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16 ml-auto" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-12 ml-auto" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16 ml-auto" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-16 mx-auto rounded-full" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-8 w-8 mx-auto rounded-full" /></td>
                  </tr>
                ))
              ) : filteredTransactions && filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn, index) => (
                  <tr 
                    key={txn.id} 
                    className={cn(
                      "hover:bg-gray-50/50 transition-colors",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                    )}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{txn.user}</td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{txn.orderId}</td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{txn.txnRef}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {format(new Date(txn.date), "MMM d, yyyy HH:mm")}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-700">
                      {Number(txn.gross).toLocaleString('en-US', { style: 'currency', currency: txn.currency })}
                    </td>
                    <td className="px-6 py-4 text-right text-red-600 text-xs">
                      -{Number(txn.mdr).toLocaleString('en-US', { style: 'currency', currency: txn.currency })}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      {Number(txn.net).toLocaleString('en-US', { style: 'currency', currency: txn.currency })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn("status-badge", getStatusColor(txn.status))}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="h-10 w-10 text-gray-300" />
                      <p>No transactions found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">10</span> of <span className="font-medium text-gray-900">{filteredTransactions?.length || 0}</span> entries
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-indigo-600 text-white">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-gray-600">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-gray-600">3</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-gray-600">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Components Helper

function StatsCard({ 
  title, 
  value, 
  isLoading, 
  gradient, 
  highlight = false 
}: { 
  title: string, 
  value?: string, 
  isLoading: boolean, 
  gradient: string, 
  highlight?: boolean 
}) {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-6 border border-border shadow-[var(--shadow-card)] group hover:shadow-[var(--shadow-premium)] transition-all duration-300">
      {/* Decorative Gradient Blob */}
      <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 bg-gradient-to-br transition-opacity group-hover:opacity-20", gradient)}></div>
      
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{title}</h3>
      {isLoading ? (
        <Skeleton className="h-10 w-48 mt-2" />
      ) : (
        <div className="flex items-baseline gap-2">
          <span className={cn(
            "text-3xl font-heading font-bold tracking-tight",
            highlight ? "text-indigo-900" : "text-gray-900"
          )}>
            {value}
          </span>
          {highlight && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+2.4%</span>}
        </div>
      )}
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'success': return 'status-success';
    case 'pending': return 'status-pending';
    case 'failed': return 'status-failed';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}
