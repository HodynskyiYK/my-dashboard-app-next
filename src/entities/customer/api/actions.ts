"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CUSTOMERS_API_URL =
  "https://6995aa9db081bc23e9c40229.mockapi.io/api/v1/users";

const CreateCustomerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  image_url: z.string().url("Invalid image URL"),
});

const UpdateCustomerSchema = CreateCustomerSchema;

type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>;

export async function createCustomer(formData: FormData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const image_url = formData.get("image_url");

    const parsed = CreateCustomerSchema.parse({
      name,
      email,
      image_url,
    });

    const res = await fetch(CUSTOMERS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed),
    });

    if (!res.ok) {
      throw new Error(`Failed to create customer: ${res.status}`);
    }

    revalidatePath("/dashboard/customers");
    redirect("/dashboard/customers");
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      throw new Error(`Validation error: ${firstError?.message || 'Invalid input'}`);
    }
    throw error;
  }
}

export async function updateCustomer(id: string, formData: FormData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const image_url = formData.get("image_url");

    const parsed = UpdateCustomerSchema.parse({
      name,
      email,
      image_url,
    });

    const res = await fetch(`${CUSTOMERS_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed),
    });

    if (!res.ok) {
      throw new Error(`Failed to update customer: ${res.status}`);
    }

    revalidatePath("/dashboard/customers");
    redirect("/dashboard/customers");
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      throw new Error(`Validation error: ${firstError?.message || 'Invalid input'}`);
    }
    throw error;
  }
}

export async function deleteCustomer(id: string) {
  try {
    const res = await fetch(`${CUSTOMERS_API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete customer: ${res.status}`);
    }

    revalidatePath("/dashboard/customers");
  } catch (error) {
    throw error;
  }
}
