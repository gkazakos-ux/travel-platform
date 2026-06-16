// GENERATED placeholder — replace by running:
//   supabase gen types typescript --local > types/database.ts
// once the local Supabase stack is running and migrations are applied.
// Do not hand-edit once generated.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
