export const CUSTOMERS_PAGE_LIMIT = 5;

export function buildCustomersUrl(
  pathname: string,
  { query, page }: { query?: string; page?: number }
) {
  const params = new URLSearchParams();
  const trimmedQuery = query?.trim();

  if (trimmedQuery) {
    params.set("query", trimmedQuery);
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
