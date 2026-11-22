import { createClient } from "@supabase/supabase-js";

export type OrderRow = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  quantity: number;
  color_primary: string;
  color_secondary: string | null;
  stripe_session_id: string;
  stripe_payment_intent: string | null;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  shipping_address: string;
  amount_total: number;
};

export type OrderInsert = Omit<OrderRow, "id" | "created_at">;
export type OrderUpdate = Partial<OrderInsert>;

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: OrderRow;
        Insert: OrderInsert;
        Update: OrderUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
