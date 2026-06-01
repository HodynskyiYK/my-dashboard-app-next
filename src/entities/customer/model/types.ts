export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type CustomerItemProps = Pick<Customer, "id" | "name" | "email" | "image_url">;

export type GetCustomersParams = {
  query?: string;
  page?: number;
  limit?: number;
};

export type GetCustomersResult = {
  customers: Customer[];
  page: number;
  totalPages: number;
  total: number;
};
