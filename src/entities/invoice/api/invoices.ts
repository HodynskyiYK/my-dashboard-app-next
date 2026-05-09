import { Invoice } from "@/entities/invoice";
import { supabase } from "@/shared/lib";

export async function getInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase.from("invoices").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}