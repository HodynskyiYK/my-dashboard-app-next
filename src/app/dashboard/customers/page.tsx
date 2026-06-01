import { Suspense } from "react";
import {
  CustomerList,
  CustomerSearch,
  CustomersSkeleton,
} from "@/entities/customer";

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
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <p className="mb-4">
        Here you can manage your customers and view their information.
      </p>
      <Suspense
        fallback={
          <div className="mb-4 h-10 max-w-md animate-pulse rounded-md bg-gray-200" />
        }
      >
        <CustomerSearch />
      </Suspense>
      <Suspense key={suspenseKey} fallback={<CustomersSkeleton />}>
        <CustomerList query={query} page={page} />
      </Suspense>
    </div>
  );
}

export default Customers;
