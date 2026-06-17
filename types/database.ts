export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          created_at: string
          height: number | null
          id: string
          owner_id: string
          place_id: string | null
          position: number
          storage_path: string
          trip_id: string | null
          updated_at: string
          width: number | null
        }
        Insert: {
          created_at?: string
          height?: number | null
          id?: string
          owner_id: string
          place_id?: string | null
          position?: number
          storage_path: string
          trip_id?: string | null
          updated_at?: string
          width?: number | null
        }
        Update: {
          created_at?: string
          height?: number | null
          id?: string
          owner_id?: string
          place_id?: string | null
          position?: number
          storage_path?: string
          trip_id?: string | null
          updated_at?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "photos_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          address: string | null
          category: Database["public"]["Enums"]["place_category"]
          cost: number | null
          created_at: string
          currency: string | null
          description: string | null
          id: string
          lat: number | null
          lng: number | null
          name: string
          position: number
          trip_day_id: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          category?: Database["public"]["Enums"]["place_category"]
          cost?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name: string
          position?: number
          trip_day_id: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          category?: Database["public"]["Enums"]["place_category"]
          cost?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string
          position?: number
          trip_day_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "places_trip_day_id_fkey"
            columns: ["trip_day_id"]
            isOneToOne: false
            referencedRelation: "trip_days"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          followers_count: number
          following_count: number
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          followers_count?: number
          following_count?: number
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          followers_count?: number
          following_count?: number
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      saves: {
        Row: {
          created_at: string
          trip_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          trip_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          trip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saves_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saves_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_days: {
        Row: {
          created_at: string
          date: string | null
          day_number: number
          id: string
          notes: string | null
          trip_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          day_number: number
          id?: string
          notes?: string | null
          trip_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string | null
          day_number?: number
          id?: string
          notes?: string | null
          trip_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_days_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          author_id: string
          budget_max: number | null
          budget_min: number | null
          city: string
          copy_count: number
          country_code: string
          cover_photo_id: string | null
          created_at: string
          currency: string | null
          description: string | null
          end_date: string | null
          forked_from: string | null
          id: string
          published_at: string | null
          save_count: number
          search_vector: unknown | null
          slug: string
          start_date: string | null
          status: Database["public"]["Enums"]["trip_status"]
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          author_id: string
          budget_max?: number | null
          budget_min?: number | null
          city: string
          copy_count?: number
          country_code: string
          cover_photo_id?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          end_date?: string | null
          forked_from?: string | null
          id?: string
          published_at?: string | null
          save_count?: number
          slug: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          author_id?: string
          budget_max?: number | null
          budget_min?: number | null
          city?: string
          copy_count?: number
          country_code?: string
          cover_photo_id?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          end_date?: string | null
          forked_from?: string | null
          id?: string
          published_at?: string | null
          save_count?: number
          slug?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "trips_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_cover_photo_fk"
            columns: ["cover_photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_forked_from_fkey"
            columns: ["forked_from"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      destination_stats: {
        Row: {
          city: string | null
          country_code: string | null
          latest_published_at: string | null
          trip_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      copy_trip: {
        Args: { p_source_trip_id: string }
        Returns: string
      }
      day_is_visible: {
        Args: { p_day_id: string }
        Returns: boolean
      }
      increment_trip_view: {
        Args: { p_trip_id: string }
        Returns: undefined
      }
      place_is_visible: {
        Args: { p_place_id: string }
        Returns: boolean
      }
      publish_trip: {
        Args: { p_trip_id: string }
        Returns: undefined
      }
      refresh_destination_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      trip_is_visible: {
        Args: { p_trip_id: string }
        Returns: boolean
      }
      user_owns_day: {
        Args: { p_day_id: string }
        Returns: boolean
      }
      user_owns_place: {
        Args: { p_place_id: string }
        Returns: boolean
      }
      user_owns_trip: {
        Args: { p_trip_id: string }
        Returns: boolean
      }
    }
    Enums: {
      place_category:
        | "accommodation"
        | "food"
        | "attraction"
        | "activity"
        | "transport"
        | "shopping"
        | "nature"
        | "nightlife"
        | "other"
      trip_status: "draft" | "published"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      place_category: [
        "accommodation",
        "food",
        "attraction",
        "activity",
        "transport",
        "shopping",
        "nature",
        "nightlife",
        "other",
      ],
      trip_status: ["draft", "published"],
    },
  },
} as const
