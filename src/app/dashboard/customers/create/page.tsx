import { CreateCustomerForm } from "@/entities/customer/ui/CreateCustomerForm";
import Link from "next/link";

export default function CreateCustomerPage() {
  return (
    <div className="flex-1 p-4">
      <div className="mb-6">
        <Link
          href="/dashboard/customers"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Back to Customers
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Create Customer</h1>
      <p className="mb-6 text-gray-600">
        Add a new customer to your database.
      </p>

      <CreateCustomerForm />
    </div>
  );
}
