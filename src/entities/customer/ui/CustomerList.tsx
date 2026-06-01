import {
  CustomerItem,
  CustomerPagination,
  getCustomers,
} from "@/entities/customer";

type CustomerListProps = {
  query: string;
  page: number;
};

export async function CustomerList({ query, page }: CustomerListProps) {
  const { customers, totalPages, page: currentPage } = await getCustomers({
    query,
    page,
  });

  if (customers.length === 0) {
    return (
      <p className="text-gray-500">
        No customers found{query ? ` for "${query}"` : ""}.
      </p>
    );
  }

  return (
    <>
      <ul>
        {customers.map((customer) => (
          <CustomerItem
            key={customer.id}
            id={customer.id}
            name={customer.name}
            email={customer.email}
            image_url={customer.image_url}
          />
        ))}
      </ul>
      <CustomerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        query={query}
      />
    </>
  );
}
