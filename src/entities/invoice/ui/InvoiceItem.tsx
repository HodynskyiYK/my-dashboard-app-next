import { InvoiceItemProps } from "@/entities/invoice";


export function InvoiceItem({ customer_id, formattedAmount }: InvoiceItemProps) {
  return (
    <li className="flex justify-between border-b py-2">
      <span>{customer_id}</span>
      <span>{formattedAmount}</span>
    </li>
  );
}