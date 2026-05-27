"use client";

import { usePathname, useRouter } from "next/navigation";
import { buildCustomersUrl } from "@/entities/customer/lib/customers-url";

type CustomerPaginationProps = {
  currentPage: number;
  totalPages: number;
  query: string;
};

export function CustomerPagination({
  currentPage,
  totalPages,
  query,
}: CustomerPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page: number) => {
    router.push(
      buildCustomersUrl(pathname, {
        query: query.trim() || undefined,
        page,
      })
    );
  };

  return (
    <nav
      className="mt-4 flex items-center gap-4"
      aria-label="Customers pagination"
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-md border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-md border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}
