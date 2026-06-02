import { getCustomerById } from "@/entities/customer/api/customers";
import { EditCustomerForm } from "@/entities/customer/ui/EditCustomerForm";
import Link from "next/link";
import { notFound } from "next/navigation";

type EditCustomerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCustomerPage({
  params,
}: EditCustomerPageProps) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  if (!customer) {
    notFound();
  }

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

      <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
      <p className="mb-6 text-gray-600">
        Update customer information.
      </p>

      <EditCustomerForm customer={customer} />
    </div>
  );
}
