import { CUSTOMERS_PAGE_LIMIT } from "@/entities/customer/lib/customers-url";

export function CustomersSkeleton() {
  return (
    <ul className="animate-pulse">
      {Array.from({ length: CUSTOMERS_PAGE_LIMIT }).map((_, index) => (
        <li key={index} className="flex items-center gap-4 border-b py-2">
          <div className="h-10 w-10 rounded-full bg-gray-300" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-5 w-1/3 rounded bg-gray-300" />
            <div className="h-4 w-1/2 rounded bg-gray-300" />
          </div>
        </li>
      ))}
    </ul>
  );
}
