import { CustomerList } from "@/entities/customer";
import { Suspense } from "react";

async function Customers() {

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <Suspense fallback={<div>Loading customers...</div>}>
        <CustomerList />
      </Suspense>
    </div>
  );
}

export default Customers;