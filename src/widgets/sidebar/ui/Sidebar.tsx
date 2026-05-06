'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/invoices", label: "Invoices" },
  { path: "/dashboard/customers", label: "Customers" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <nav>
        <ul>
          {ROUTES.map((route) => (
            <li key={route.path} className="mb-2">
              <Link
                href={route.path}
                className={`block px-4 py-2 rounded ${
                  pathname === route.path ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}