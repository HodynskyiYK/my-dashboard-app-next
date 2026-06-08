import Link from "next/link";

export default function NotFound() {
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

      <div className="rounded-md border border-amber-200 bg-amber-50 p-6">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">
          Customer not found
        </h1>
        <p className="text-amber-700 mb-4">
          The customer you&apos;re looking for doesn&apos;t exist or has been deleted.
        </p>
        <Link
          href="/dashboard/customers"
          className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go to Customers
        </Link>
      </div>
    </div>
  );
}
