import { InvoiceItemProps } from "@/entities/invoice";


export function InvoiceItem({ title, formattedAmount }: InvoiceItemProps) {
  return (
    <li className="flex justify-between border-b py-2">
      <span>{title}</span>
      <span>{formattedAmount}</span>
    </li>
  );
}