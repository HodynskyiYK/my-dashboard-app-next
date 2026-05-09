export type Invoice = {
  id: string;
  title: string;
  amount: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export type InvoiceItemProps = Pick<Invoice, "title"> & {
    formattedAmount: string;
}

export type InvoiceListProps = {
    items: InvoiceItemProps[];
}