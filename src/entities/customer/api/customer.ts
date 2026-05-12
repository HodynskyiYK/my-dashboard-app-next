// https://6995aa9db081bc23e9c40229.mockapi.io/api/v1/users - API for customers
import { Customer } from "@/entities/customer";

const API_BASE_URL = "https://6995aa9db081bc23e9c40229.mockapi.io/api/v1";

export async function getCustomers({
  query,
  page,
  limit
}: {
  query?: string;
  page: number;
  limit: number;
}): Promise<Customer[]> {
  const url = new URL("/users", API_BASE_URL);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());
  if (query) {
    url.searchParams.append("search", query);
  }
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Error fetching customers: ${response.statusText}`);
    }
    const data: Customer[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw error;
  }
}