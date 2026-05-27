import { CustomerItemProps } from "@/entities/customer";
import Image from "next/image";

export function CustomerItem({ name, email, image_url }: CustomerItemProps) {
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
    </li>
  );
}
