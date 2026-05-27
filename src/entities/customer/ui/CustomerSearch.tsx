"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildCustomersUrl } from "@/entities/customer/lib/customers-url";

const DEBOUNCE_MS = 300;

export function CustomerSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("query") ?? "";
  const [value, setValue] = useState(queryFromUrl);

  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const trimmedValue = value.trim();
    const trimmedUrlQuery = queryFromUrl.trim();

    if (trimmedValue === trimmedUrlQuery) {
      return;
    }

    const timer = setTimeout(() => {
      router.replace(
        buildCustomersUrl(pathname, {
          query: trimmedValue || undefined,
          page: 1,
        })
      );
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value, queryFromUrl, pathname, router]);

  return (
    <input
      type="search"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Search by name..."
      className="mb-4 w-full max-w-md rounded-md border border-gray-300 px-3 py-2"
      aria-label="Search customers by name"
    />
  );
}
