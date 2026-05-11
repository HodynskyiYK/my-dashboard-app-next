import { supabase } from "@/shared/lib";

export async function getTotalInvoices(): Promise<number> {
    const { data, error } = await supabase.from("invoices").select("*", { count: "exact" });
    if (error) {
        throw new Error(error.message);
    }
    return data ? data.length : 0;
}

export async function getPaidInvoicesAmount(): Promise<number> {
    const { data, error } = await supabase.from("invoices").select("amount").eq("status", "paid");
    if (error) {
        throw new Error(error.message);
    }
    return data ? data.reduce((total, invoice) => total + invoice.amount, 0) : 0;
}

export async function getPendingInvoicesAmount(): Promise<number> {
    const { data, error } = await supabase.from("invoices").select("amount").eq("status", "pending");
    if (error) {
        throw new Error(error.message);
    }
    return data ? data.reduce((total, invoice) => total + invoice.amount, 0) : 0;
}
