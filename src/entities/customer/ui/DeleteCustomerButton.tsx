import { deleteCustomer } from "@/entities/customer/api/actions";

type DeleteCustomerButtonProps = {
  id: string;
  name: string;
};

export function DeleteCustomerButton({ id }: DeleteCustomerButtonProps) {
  const deleteWithId = deleteCustomer.bind(null, id);

  return (
    <form action={deleteWithId}>
      <button
        type="submit"
        className="rounded-md bg-red-600 px-2 py-1 text-sm text-white font-medium hover:bg-red-700"
      >
        Delete
      </button>
    </form>
  );
}
