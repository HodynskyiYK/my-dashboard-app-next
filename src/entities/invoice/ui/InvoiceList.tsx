import { InvoiceItem, getInvoices } from "@/entities/invoice";
import { formatCurrency } from "@/shared/utils/formatCurrency";


export async function InvoiceList() {
  const invoices = await getInvoices();

  return (
    <ul>
      {invoices.map((invoice) => (
        <InvoiceItem
          key={invoice.id}
          customer_id={invoice.customer_id}
          formattedAmount={formatCurrency(Number(invoice.amount))}
        />
      ))}
    </ul>
  );
}