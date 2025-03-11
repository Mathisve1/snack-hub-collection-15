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
      frituren: {
        Row: {
          "Address/ Zip code/ City/ Country": string | null
          "Business Name": string
          Category: string | null
          Email: string | null
          "Facebook Link": string | null
          Gemeente: string | null
          "Instagram link": string | null
          Land: string | null
          Latitued: number | null
          "Linkedin Link": string | null
          Longitued: string | null
          Number: string | null
          "Open & Close Time": string | null
          Postcode: number | null
          Provincie: string | null
          Rating: number | null
          Review: string | null
          Straat: string | null
          "Unnamed: 8": string | null
          Website: string | null
        }
        Insert: {
          "Address/ Zip code/ City/ Country"?: string | null
          "Business Name": string
          Category?: string | null
          Email?: string | null
          "Facebook Link"?: string | null
          Gemeente?: string | null
          "Instagram link"?: string | null
          Land?: string | null
          Latitued?: number | null
          "Linkedin Link"?: string | null
          Longitued?: string | null
          Number?: string | null
          "Open & Close Time"?: string | null
          Postcode?: number | null
          Provincie?: string | null
          Rating?: number | null
          Review?: string | null
          Straat?: string | null
          "Unnamed: 8"?: string | null
          Website?: string | null
        }
        Update: {
          "Address/ Zip code/ City/ Country"?: string | null
          "Business Name"?: string
          Category?: string | null
          Email?: string | null
          "Facebook Link"?: string | null
          Gemeente?: string | null
          "Instagram link"?: string | null
          Land?: string | null
          Latitued?: number | null
          "Linkedin Link"?: string | null
          Longitued?: string | null
          Number?: string | null
          "Open & Close Time"?: string | null
          Postcode?: number | null
          Provincie?: string | null
          Rating?: number | null
          Review?: string | null
          Straat?: string | null
          "Unnamed: 8"?: string | null
          Website?: string | null
        }
        Relationships: []
      }
      frituren_folder_items: {
        Row: {
          added_at: string
          business_name: string
          folder_id: string
          id: string
          team: string
        }
        Insert: {
          added_at?: string
          business_name: string
          folder_id: string
          id?: string
          team: string
        }
        Update: {
          added_at?: string
          business_name?: string
          folder_id?: string
          id?: string
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "frituren_folder_items_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "frituren_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      frituren_folders: {
        Row: {
          created_at: string
          id: string
          name: string
          team: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          team: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          team?: string
        }
        Relationships: []
      }
      frituur_attachments: {
        Row: {
          attachment_name: string | null
          attachment_type: string | null
          attachment_url: string | null
          business_name: string
          created_at: string
          id: string
          note: string | null
          team: string
        }
        Insert: {
          attachment_name?: string | null
          attachment_type?: string | null
          attachment_url?: string | null
          business_name: string
          created_at?: string
          id?: string
          note?: string | null
          team: string
        }
        Update: {
          attachment_name?: string | null
          attachment_type?: string | null
          attachment_url?: string | null
          business_name?: string
          created_at?: string
          id?: string
          note?: string | null
          team?: string
        }
        Relationships: []
      }
      team_access_codes: {
        Row: {
          access_code: string
          created_at: string
          id: string
          team: string
          updated_at: string
        }
        Insert: {
          access_code: string
          created_at?: string
          id?: string
          team: string
          updated_at?: string
        }
        Update: {
          access_code?: string
          created_at?: string
          id?: string
          team?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_selections: {
        Row: {
          business_name: string
          id: string
          selected_at: string | null
          team: string
        }
        Insert: {
          business_name: string
          id?: string
          selected_at?: string | null
          team: string
        }
        Update: {
          business_name?: string
          id?: string
          selected_at?: string | null
          team?: string
        }
        Relationships: []
      }
      voice_analysis: {
        Row: {
          analysis: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string | null
          id: string
          recording_url: string
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url: string
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url?: string
          status?: string
          team?: string
          transcript?: string | null
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
