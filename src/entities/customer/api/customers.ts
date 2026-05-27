import { cache } from "react";
import {
  Customer,
  GetCustomersParams,
  GetCustomersResult,
} from "@/entities/customer/model/types";
import { CUSTOMERS_PAGE_LIMIT } from "@/entities/customer/lib/customers-url";

const CUSTOMERS_API_URL =
  "https://6995aa9db081bc23e9c40229.mockapi.io/api/v1/users";

const fetchAllCustomers = cache(async (): Promise<Customer[]> => {
  const res = await fetch(CUSTOMERS_API_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch customers: ${res.status}`);
  }

  return res.json();
});

export async function getCustomers({
  query = "",
  page = 1,
  limit = CUSTOMERS_PAGE_LIMIT,
}: GetCustomersParams = {}): Promise<GetCustomersResult> {
  const all = await fetchAllCustomers();
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = normalizedQuery
    ? all.filter((customer) =>
        customer.name.toLowerCase().includes(normalizedQuery)
      )
    : all;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;

  return {
    customers: filtered.slice(start, start + limit),
    page: safePage,
    totalPages,
    total,
  };
}
