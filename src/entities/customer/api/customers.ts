import { cache } from "react";
import {
  Customer,
  GetCustomersParams,
  GetCustomersResult,
} from "@/entities/customer/model/types";
import { CUSTOMERS_PAGE_LIMIT } from "@/entities/customer/lib/customers-url";

const CUSTOMERS_API_URL =
  "https://6995aa9db081bc23e9c40229.mockapi.io/api/v1/users";

function buildCustomersApiUrl({
  query,
  page,
  limit,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();
  const trimmedQuery = query?.trim();

  if (trimmedQuery) {
    params.set("search", trimmedQuery);
  }

  if (page !== undefined && page > 0) {
    params.set("page", String(page));
  }

  if (limit && limit > 0) {
    params.set("limit", String(limit));
  }

  const qs = params.toString();
  return qs ? `${CUSTOMERS_API_URL}?${qs}` : CUSTOMERS_API_URL;
}

function getTotalFromHeaders(headers: Headers): number | undefined {
  const totalCount = headers.get("x-total-count");
  if (!totalCount) {
    return undefined;
  }

  const parsed = Number(totalCount);
  return Number.isFinite(parsed) ? parsed : undefined;
}

const fetchCustomersPage = cache(
  async (
    query: string,
    page: number,
    limit: number
  ): Promise<{ customers: Customer[]; total?: number }> => {
    const url = buildCustomersApiUrl({ query, page, limit });
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch customers: ${res.status}`);
    }

    const customers = (await res.json()) as Customer[];
    const total = getTotalFromHeaders(res.headers);

    return { customers, total };
  }
);

const fetchAllCustomers = cache(async (): Promise<Customer[]> => {
  const res = await fetch(CUSTOMERS_API_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch customers: ${res.status}`);
  }

  return res.json();
});

function filterCustomersByQuery(customers: Customer[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  return customers.filter((customer) =>
    customer.name.toLowerCase().includes(normalizedQuery) ||
    customer.email.toLowerCase().includes(normalizedQuery)
  );
}

export async function getCustomers({
  query = "",
  page = 1,
  limit = CUSTOMERS_PAGE_LIMIT,
}: GetCustomersParams = {}): Promise<GetCustomersResult> {
  const normalizedQuery = query.trim();
  const safePage = Math.max(1, page);

  let pageResult;
  try {
    pageResult = await fetchCustomersPage(normalizedQuery, safePage, limit);
  } catch (error) {
    if (
      normalizedQuery &&
      error instanceof Error &&
      error.message.includes("404")
    ) {
      const all = await fetchAllCustomers();
      const filtered = filterCustomersByQuery(all, normalizedQuery);
      const total = filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / limit));
      const currentPage = Math.min(safePage, totalPages);

      return {
        customers: filtered.slice((currentPage - 1) * limit, currentPage * limit),
        page: currentPage,
        totalPages,
        total,
      };
    }

    throw error;
  }

  let total = pageResult.total;
  let currentPage = safePage;
  let customers = pageResult.customers;

  if (total === undefined) {
    const all = await fetchAllCustomers();
    total = all.length;

    const totalPages = Math.max(1, Math.ceil(total / limit));
    currentPage = Math.min(safePage, totalPages);

    if (currentPage !== safePage) {
      const remappedPage = await fetchCustomersPage(
        normalizedQuery,
        currentPage,
        limit
      );
      customers = remappedPage.customers;
    }

    return {
      customers,
      page: currentPage,
      totalPages,
      total,
    };
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));
  currentPage = Math.min(safePage, totalPages);

  if (currentPage !== safePage) {
    const remappedPage = await fetchCustomersPage(
      normalizedQuery,
      currentPage,
      limit
    );
    customers = remappedPage.customers;
  }

  return {
    customers,
    page: currentPage,
    totalPages,
    total,
  };
}
