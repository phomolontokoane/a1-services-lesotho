export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Best: {
        Row: {
          created_at: string | null
          id: number
          product: number
        }
        Insert: {
          created_at?: string | null
          id?: never
          product: number
        }
        Update: {
          created_at?: string | null
          id?: never
          product?: number
        }
        Relationships: [
          {
            foreignKeyName: "best_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
        ]
      }
      Comments: {
        Row: {
          created_at: string | null
          id: number
          message: string
          product: number
          rating: number
          user_id: number
        }
        Insert: {
          created_at?: string | null
          id?: never
          message: string
          product: number
          rating: number
          user_id: number
        }
        Update: {
          created_at?: string | null
          id?: never
          message?: string
          product?: number
          rating?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "comments_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["phonenumber"]
          },
        ]
      }
      Orders: {
        Row: {
          created_at: string | null
          delivered: boolean | null
          id: number
          isdone: boolean | null
          owners: string
          price: number
          products: Json
          user_id: number
        }
        Insert: {
          created_at?: string | null
          delivered?: boolean | null
          id?: never
          isdone?: boolean | null
          owners: string
          price: number
          products: Json
          user_id: number
        }
        Update: {
          created_at?: string | null
          delivered?: boolean | null
          id?: never
          isdone?: boolean | null
          owners?: string
          price?: number
          products?: Json
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["phonenumber"]
          },
        ]
      }
      Products: {
        Row: {
          created_at: string | null
          id: number
          img: string[]
          isfeatured: boolean | null
          name: string
          owners: string
          price: number
          qty: number
        }
        Insert: {
          created_at?: string | null
          id?: never
          img: string[]
          isfeatured?: boolean | null
          name: string
          owners: string
          price: number
          qty: number
        }
        Update: {
          created_at?: string | null
          id?: never
          img?: string[]
          isfeatured?: boolean | null
          name?: string
          owners?: string
          price?: number
          qty?: number
        }
        Relationships: [
          {
            foreignKeyName: "Products_owners_fkey"
            columns: ["owners"]
            isOneToOne: false
            referencedRelation: "Store"
            referencedColumns: ["owners"]
          },
        ]
      }
      Store: {
        Row: {
          contacts: string
          created_at: string
          id: number
          image: string | null
          name: string
          owners: string
        }
        Insert: {
          contacts: string
          created_at?: string
          id?: number
          image?: string | null
          name: string
          owners: string
        }
        Update: {
          contacts?: string
          created_at?: string
          id?: number
          image?: string | null
          name?: string
          owners?: string
        }
        Relationships: []
      }
      Users: {
        Row: {
          created_at: string | null
          firstname: string
          id: number
          lastname: string
          password: string
          phonenumber: number
        }
        Insert: {
          created_at?: string | null
          firstname: string
          id?: never
          lastname: string
          password: string
          phonenumber: number
        }
        Update: {
          created_at?: string | null
          firstname?: string
          id?: never
          lastname?: string
          password?: string
          phonenumber?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
