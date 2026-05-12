import { getCustomers } from "@/entities/customer";

export async function CustomerList() {
  const customers = await getCustomers({ page: 1, limit: 10 });

  console.log("Fetched customers:", customers);

  return (
    <div className="block">
      <p>This is where the list of customers will be displayed.</p>
    </div>
  );
}