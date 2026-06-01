export type {
  Customer,
  CustomerItemProps,
  GetCustomersParams,
  GetCustomersResult,
} from "./model/types";
export { getCustomers } from "./api/customers";
export { CUSTOMERS_PAGE_LIMIT, buildCustomersUrl } from "./lib/customers-url";
export { CustomerItem } from "./ui/CustomerItem";
export { CustomerList } from "./ui/CustomerList";
export { CustomerSearch } from "./ui/CustomerSearch";
export { CustomerPagination } from "./ui/CustomerPagination";
export { CustomersSkeleton } from "./ui/CustomersSkeleton";
