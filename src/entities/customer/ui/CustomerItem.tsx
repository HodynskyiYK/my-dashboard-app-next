import { CustomerItemProps } from "@/entities/customer";
import { DeleteCustomerButton } from "@/entities/customer/ui/DeleteCustomerButton";
import Image from "next/image";
import Link from "next/link";

export function CustomerItem({ id, name, email, image_url }: CustomerItemProps) {
  return (
    <li className="flex items-center gap-4 border-b py-2">
      <Image
        src={image_url}
        alt={name}
        className="h-10 w-10 rounded-full object-cover"
        width={40}
        height={40}
        loading="lazy"
      />
      <div className="flex flex-1 flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-gray-500">{email}</span>
      </div>
      <div className="flex gap-2">
        <Link
          href={`/dashboard/customers/${id}/edit`}
          className="rounded-md bg-blue-600 px-2 py-1 text-sm text-white font-medium hover:bg-blue-700"
        >
          Edit
        </Link>
        <DeleteCustomerButton id={id} />
      </div>
    </li>
  );
}
