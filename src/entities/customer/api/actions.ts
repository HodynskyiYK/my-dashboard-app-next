"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CUSTOMERS_API_URL =
  "https://6995aa9db081bc23e9c40229.mockapi.io/api/v1/users";

const CustomerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  image_url: z.string().url("Invalid image URL"),
});

type CustomerFormInput = z.infer<typeof CustomerFormSchema>;
type CustomerRequestMethod = "POST" | "PUT";

function parseCustomerFormData(formData: FormData): CustomerFormInput {
  const name = formData.get("name");
  const email = formData.get("email");
  const image_url = formData.get("image_url");

  return CustomerFormSchema.parse({
    name,
    email,
    image_url,
  });
}

async function sendCustomerRequest(
  url: string,
  method: CustomerRequestMethod,
  data: CustomerFormInput
) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to ${method === "POST" ? "create" : "update"} customer: ${res.status}`);
  }
}

function handleCustomerMutationSuccess() {
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function createCustomer(formData: FormData) {
  const parsed = parseCustomerFormData(formData);
  await sendCustomerRequest(CUSTOMERS_API_URL, "POST", parsed);
  handleCustomerMutationSuccess();
}

export async function updateCustomer(id: string, formData: FormData) {
  const parsed = parseCustomerFormData(formData);
  await sendCustomerRequest(`${CUSTOMERS_API_URL}/${id}`, "PUT", parsed);
  handleCustomerMutationSuccess();
}

export async function deleteCustomer(id: string) {
  const res = await fetch(`${CUSTOMERS_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete customer: ${res.status}`);
  }

  revalidatePath("/dashboard/customers");
}
