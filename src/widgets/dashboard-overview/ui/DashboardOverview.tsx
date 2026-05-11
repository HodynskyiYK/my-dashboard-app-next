import { formatCurrency } from "@/shared/utils";
import {
    OverviewItem,
    getPaidInvoicesAmount,
    getPendingInvoicesAmount,
    getTotalInvoices,
    getTotalCustomers
} from "@/widgets/dashboard-overview";

export async function DashboardOverview() {
  const [totalCustomers, totalInvoices, paidInvoicesAmount, pendingInvoicesAmount] = await Promise.all([
    getTotalCustomers(),
    getTotalInvoices(),
    getPaidInvoicesAmount(),
    getPendingInvoicesAmount()
]);

  return (
    <div>
      <h3 className="text-l font-bold mb-4">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
        <OverviewItem title="Total invoices" value={totalInvoices} />
        <OverviewItem title="Total customers" value={totalCustomers} />
        <OverviewItem title="Paid invoices amount" value={formatCurrency(paidInvoicesAmount)} />
        <OverviewItem title="Pending invoices amount" value={formatCurrency(pendingInvoicesAmount)} />
      </div>
    </div>
  );
}