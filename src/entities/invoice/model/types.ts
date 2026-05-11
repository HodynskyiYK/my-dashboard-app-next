export type Invoice = {
  id: string;
  amount: number;
  customer_id: string;
  date: string;
  status: "paid" | "pending" | "overdue";
}

export type InvoiceItemProps = Pick<Invoice, "customer_id"> & {
    formattedAmount: string;
}

export type InvoiceListProps = {
    items: InvoiceItemProps[];
}