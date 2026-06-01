"use client";

import { deleteCustomer } from "@/entities/customer/api/actions";
import { useState } from "react";

type DeleteCustomerButtonProps = {
  id: string;
  name: string;
};

export function DeleteCustomerButton({ id, name }: DeleteCustomerButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteWithId = deleteCustomer.bind(null, id);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setIsLoading(true);
    try {
      await deleteWithId();
    } catch (error) {
      console.error("Failed to delete customer:", error);
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="rounded-md bg-red-600 px-2 py-1 text-sm text-white font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}
