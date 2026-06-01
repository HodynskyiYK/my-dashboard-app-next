import { Suspense } from "react";
import {
  CustomerList,
  CustomerSearch,
  CustomersSkeleton,
} from "@/entities/customer";
import Link from "next/link";

type CustomersPageProps = {
  searchParams: Promise<{ query?: string; page?: string }>;
};

async function Customers({ searchParams }: CustomersPageProps) {
  const params = await searchParams;
  const query = params.query ?? "";
  const page = Math.max(1, Number(params.page) || 1);
  const suspenseKey = `${query}-${page}`;

  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Link
          href="/dashboard/customers/create"
          className="rounded-md bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700"
        >
          + Create Customer
        </Link>
      </div>
      <p className="mb-4">
        Here you can manage your customers and view their information.
      </p>
      <CustomerSearch />
      <Suspense key={suspenseKey} fallback={<CustomersSkeleton />}>
        <CustomerList query={query} page={page} />
      </Suspense>
    </div>
  );
}

export default Customers;
