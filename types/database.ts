// GENERATED placeholder derived from supabase/migrations/
// Replace by running:  supabase gen types typescript --project-id <id> > types/database.ts
// Do not hand-edit beyond keeping it in sync with migrations.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          bio: string | null;
          avatar_path: string | null;
          followers_count: number;
          following_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          display_name?: string | null;
          bio?: string | null;
          avatar_path?: string | null;
          followers_count?: number;
          following_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          display_name?: string | null;
          bio?: string | null;
          avatar_path?: string | null;
          followers_count?: number;
          following_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      trips: {
        Row: {
          id: string;
          author_id: string;
          slug: string;
          title: string;
          description: string | null;
          cover_photo_id: string | null;
          country_code: string;
          city: string;
          start_date: string | null;
          end_date: string | null;
          budget_min: number | null;
          budget_max: number | null;
          currency: string | null;
          status: "draft" | "published";
          forked_from: string | null;
          published_at: string | null;
          view_count: number;
          save_count: number;
          copy_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          slug: string;
          title: string;
          description?: string | null;
          cover_photo_id?: string | null;
          country_code: string;
          city: string;
          start_date?: string | null;
          end_date?: string | null;
          budget_min?: number | null;
          budget_max?: number | null;
          currency?: string | null;
          status?: "draft" | "published";
          forked_from?: string | null;
          published_at?: string | null;
          view_count?: number;
          save_count?: number;
          copy_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          cover_photo_id?: string | null;
          country_code?: string;
          city?: string;
          start_date?: string | null;
          end_date?: string | null;
          budget_min?: number | null;
          budget_max?: number | null;
          currency?: string | null;
          status?: "draft" | "published";
          forked_from?: string | null;
          published_at?: string | null;
          view_count?: number;
          save_count?: number;
          copy_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      trip_days: {
        Row: {
          id: string;
          trip_id: string;
          day_number: number;
          date: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trip_id: string;
          day_number: number;
          date?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          trip_id?: string;
          day_number?: number;
          date?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      places: {
        Row: {
          id: string;
          trip_day_id: string;
          name: string;
          category: string;
          description: string | null;
          lat: number | null;
          lng: number | null;
          address: string | null;
          cost: number | null;
          currency: string | null;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trip_day_id: string;
          name: string;
          category: string;
          description?: string | null;
          lat?: number | null;
          lng?: number | null;
          address?: string | null;
          cost?: number | null;
          currency?: string | null;
          position: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          trip_day_id?: string;
          name?: string;
          category?: string;
          description?: string | null;
          lat?: number | null;
          lng?: number | null;
          address?: string | null;
          cost?: number | null;
          currency?: string | null;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      photos: {
        Row: {
          id: string;
          owner_id: string;
          trip_id: string | null;
          place_id: string | null;
          storage_path: string;
          width: number | null;
          height: number | null;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          trip_id?: string | null;
          place_id?: string | null;
          storage_path: string;
          width?: number | null;
          height?: number | null;
          position: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          trip_id?: string | null;
          place_id?: string | null;
          storage_path?: string;
          width?: number | null;
          height?: number | null;
          position?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      saves: {
        Row: { user_id: string; trip_id: string; created_at: string };
        Insert: { user_id: string; trip_id: string; created_at?: string };
        Update: { user_id?: string; trip_id?: string; created_at?: string };
        Relationships: [];
      };
      follows: {
        Row: { follower_id: string; following_id: string; created_at: string };
        Insert: { follower_id: string; following_id: string; created_at?: string };
        Update: { follower_id?: string; following_id?: string; created_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      trip_status: "draft" | "published";
      place_category:
        | "accommodation"
        | "food"
        | "attraction"
        | "activity"
        | "transport"
        | "shopping"
        | "nature"
        | "nightlife"
        | "other";
    };
    CompositeTypes: Record<string, never>;
  };
};
