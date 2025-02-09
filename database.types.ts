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
      ingredients: {
        Row: {
          allergens: string[] | null
          calories: number | null
          carbohydrates: number | null
          category: string | null
          common_in: string[] | null
          created_at: string
          default_unit: string | null
          dietary_flags: string[] | null
          fat: number | null
          fiber: number | null
          functions: string[] | null
          id: string
          name: string
          notes: string | null
          protein: number | null
          search_count: number | null
          sodium: number | null
          sugar: number | null
          updated_at: string
        }
        Insert: {
          allergens?: string[] | null
          calories?: number | null
          carbohydrates?: number | null
          category?: string | null
          common_in?: string[] | null
          created_at?: string
          default_unit?: string | null
          dietary_flags?: string[] | null
          fat?: number | null
          fiber?: number | null
          functions?: string[] | null
          id: string
          name: string
          notes?: string | null
          protein?: number | null
          search_count?: number | null
          sodium?: number | null
          sugar?: number | null
          updated_at?: string
        }
        Update: {
          allergens?: string[] | null
          calories?: number | null
          carbohydrates?: number | null
          category?: string | null
          common_in?: string[] | null
          created_at?: string
          default_unit?: string | null
          dietary_flags?: string[] | null
          fat?: number | null
          fiber?: number | null
          functions?: string[] | null
          id?: string
          name?: string
          notes?: string | null
          protein?: number | null
          search_count?: number | null
          sodium?: number | null
          sugar?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      substitution_ingredients: {
        Row: {
          amount: number
          created_at: string
          id: string
          ingredient_id: string
          notes: string | null
          substitution_id: string
          unit: Database["public"]["Enums"]["unit_type"]
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          ingredient_id: string
          notes?: string | null
          substitution_id: string
          unit: Database["public"]["Enums"]["unit_type"]
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          ingredient_id?: string
          notes?: string | null
          substitution_id?: string
          unit?: Database["public"]["Enums"]["unit_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "substitution_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "substitution_ingredients_substitution_id_fkey"
            columns: ["substitution_id"]
            isOneToOne: false
            referencedRelation: "substitutions"
            referencedColumns: ["id"]
          },
        ]
      }
      substitutions: {
        Row: {
          allergens: string[]
          amount: number
          baking_tips: string[] | null
          best_for: Database["public"]["Enums"]["substitution_best_for"][]
          common_uses: string[] | null
          created_at: string
          dietary_flags: string[]
          effects: Json | null
          id: string
          name: string
          notes: string | null
          original_ingredient_id: string
          rating: number
          rating_count: number | null
          unit: Database["public"]["Enums"]["unit_type"]
          updated_at: string
        }
        Insert: {
          allergens?: string[]
          amount?: number
          baking_tips?: string[] | null
          best_for: Database["public"]["Enums"]["substitution_best_for"][]
          common_uses?: string[] | null
          created_at?: string
          dietary_flags: string[]
          effects?: Json | null
          id: string
          name?: string
          notes?: string | null
          original_ingredient_id: string
          rating: number
          rating_count?: number | null
          unit?: Database["public"]["Enums"]["unit_type"]
          updated_at?: string
        }
        Update: {
          allergens?: string[]
          amount?: number
          baking_tips?: string[] | null
          best_for?: Database["public"]["Enums"]["substitution_best_for"][]
          common_uses?: string[] | null
          created_at?: string
          dietary_flags?: string[]
          effects?: Json | null
          id?: string
          name?: string
          notes?: string | null
          original_ingredient_id?: string
          rating?: number
          rating_count?: number | null
          unit?: Database["public"]["Enums"]["unit_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "substitutions_from_ingredient_id_fkey"
            columns: ["original_ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      increment_search_count: {
        Args: {
          ingredient_id: string
        }
        Returns: undefined
      }
      search_ingredients: {
        Args: {
          search_term: string
          similarity_threshold?: number
        }
        Returns: {
          id: string
          name: string
          similarity: number
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
    }
    Enums: {
      substitution_best_for:
        | "cookies"
        | "muffins"
        | "pie_crusts"
        | "breads"
        | "cakes"
        | "pastries"
      unit_type:
        | "g"
        | "ml"
        | "cup"
        | "tbsp"
        | "tsp"
        | "oz"
        | "pint"
        | "quart"
        | "piece"
        | "fl oz"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
