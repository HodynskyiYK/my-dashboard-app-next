import { Suspense } from "react";
import { InvoiceList } from "@/entities/invoice";


async function Invoices() {

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <h2 className="text-l font-bold mb-4">Here you can manage your invoices and view their details.</h2>
      <Suspense fallback={<div>Loading invoices list...</div>}>
        <InvoiceList />
      </Suspense>
    </div>
  );
}

export default Invoices;