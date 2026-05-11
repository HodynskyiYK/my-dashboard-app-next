import { supabase } from "@/shared/lib";

export async function getTotalCustomers(): Promise<number> {
    const { data, error } = await supabase.from("customers").select("*", { count: "exact" });
    if (error) {
        throw new Error(error.message);
    }
    return data ? data.length : 0;
}