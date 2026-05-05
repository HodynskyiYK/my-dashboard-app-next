import { getInvoices } from "@/shared/api/invoices";
import { formatCurrency } from "@/shared/lib/formatCurrency";

export default async function Home() {
  const invoices = await getInvoices();

  return (
    <>
      <h1>Invoices</h1>
      <hr />
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <strong>{invoice.id}</strong> - {formatCurrency(invoice.amount)}
          </li>
        ))}
      </ul>
    </>
  );
}
