import {
  Customer,
  GetCustomersParams,
  GetCustomersResult,
} from "@/entities/customer/model/types";
import { CUSTOMERS_PAGE_LIMIT } from "@/entities/customer/lib/customers-url";

const CUSTOMERS_API_URL =
  "https://6995aa9db081bc23e9c40229.mockapi.io/api/v1/users";

function filterCustomersByQuery(customers: Customer[], query: string) {
  if (!query.trim()) {
    return customers;
  }

  const normalizedQuery = query.trim().toLowerCase();
  return customers.filter((customer) =>
    customer.name.toLowerCase().includes(normalizedQuery) ||
    customer.email.toLowerCase().includes(normalizedQuery)
  );
}

function resolvePaginationMeta(
  total: number,
  safePage: number,
  limit: number
) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(safePage, totalPages);

  return { totalPages, currentPage };
}

export async function getCustomers({
  query = "",
  page = 1,
  limit = CUSTOMERS_PAGE_LIMIT,
}: GetCustomersParams = {}): Promise<GetCustomersResult> {
  const res = await fetch(CUSTOMERS_API_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch customers: ${res.status}`);
  }

  const allCustomers = (await res.json()) as Customer[];
  const filtered = filterCustomersByQuery(allCustomers, query);

  const safePage = Math.max(1, page);
  const { totalPages, currentPage } = resolvePaginationMeta(
    filtered.length,
    safePage,
    limit
  );

  const start = (currentPage - 1) * limit;
  const customers = filtered.slice(start, start + limit);

  return {
    customers,
    page: currentPage,
    totalPages,
    total: filtered.length,
  };
}
