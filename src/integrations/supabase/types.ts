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
      frituren_contact_info: {
        Row: {
          business_name: string
          created_at: string
          email: string | null
          id: string
          phone_number: string | null
          team: string
          updated_at: string
        }
        Insert: {
          business_name: string
          created_at?: string
          email?: string | null
          id?: string
          phone_number?: string | null
          team: string
          updated_at?: string
        }
        Update: {
          business_name?: string
          created_at?: string
          email?: string | null
          id?: string
          phone_number?: string | null
          team?: string
          updated_at?: string
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
      frituren_interviews: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string | null
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url?: string | null
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string | null
          status?: string
          team?: string
          transcript?: string | null
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
      street_interviews: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url: string
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string
          status?: string
          team?: string
          transcript?: string | null
        }
        Relationships: []
      }
      Team_13_buyer_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string | null
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url?: string | null
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string | null
          status?: string
          team?: string
          transcript?: string | null
        }
        Relationships: []
      }
      Team_13_frituren_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string | null
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url?: string | null
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string | null
          status?: string
          team?: string
          transcript?: string | null
        }
        Relationships: []
      }
      Team_13_street_interviews_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string | null
          id: string
          recording_url: string | null
          status: string
          team: string | null
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url?: string | null
          status?: string
          team?: string | null
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url?: string | null
          status?: string
          team?: string | null
          transcript?: string | null
        }
        Relationships: []
      }
      Team_14_buyer_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string | null
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url?: string | null
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string | null
          status?: string
          team?: string
          transcript?: string | null
        }
        Relationships: []
      }
      Team_14_frituren_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string | null
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url?: string | null
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string | null
          status?: string
          team?: string
          transcript?: string | null
        }
        Relationships: []
      }
      Team_14_street_interviews_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string | null
          id: string
          recording_url: string | null
          status: string
          team: string | null
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url?: string | null
          status?: string
          team?: string | null
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url?: string | null
          status?: string
          team?: string | null
          transcript?: string | null
        }
        Relationships: []
      }
      Team_3_buyer_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string | null
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url?: string | null
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string | null
          status?: string
          team?: string
          transcript?: string | null
        }
        Relationships: []
      }
      Team_3_frituren_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string | null
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url?: string | null
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string | null
          status?: string
          team?: string
          transcript?: string | null
        }
        Relationships: []
      }
      Team_3_street_interviews_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string | null
          id: string
          recording_url: string | null
          status: string
          team: string | null
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url?: string | null
          status?: string
          team?: string | null
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url?: string | null
          status?: string
          team?: string | null
          transcript?: string | null
        }
        Relationships: []
      }
      Team_38_buyer_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string | null
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url?: string | null
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string | null
          status?: string
          team?: string
          transcript?: string | null
        }
        Relationships: []
      }
      Team_38_frituren_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          id: string
          recording_url: string | null
          status: string
          team: string
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          id?: string
          recording_url?: string | null
          status?: string
          team: string
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          id?: string
          recording_url?: string | null
          status?: string
          team?: string
          transcript?: string | null
        }
        Relationships: []
      }
      Team_38_street_interviews_analysis: {
        Row: {
          analysis: string | null
          bucket_id: string | null
          created_at: string | null
          duration_seconds: number | null
          file_name: string | null
          id: string
          recording_url: string | null
          status: string
          team: string | null
          transcript: string | null
        }
        Insert: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url?: string | null
          status?: string
          team?: string | null
          transcript?: string | null
        }
        Update: {
          analysis?: string | null
          bucket_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string | null
          id?: string
          recording_url?: string | null
          status?: string
          team?: string | null
          transcript?: string | null
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
      Team13buyingpersonasforwebsite: {
        Row: {
          buying_persona: string
          consumptie_situatie: string | null
          frequentie_frituurbezoek: string | null
          geslacht: string | null
          id: string
          leeftijd: number | null
          marketing: string | null
          motivatie_kiezen_proteine_snack: string | null
          openheid_nieuwe_snack: boolean | null
          prijs: number | null
        }
        Insert: {
          buying_persona: string
          consumptie_situatie?: string | null
          frequentie_frituurbezoek?: string | null
          geslacht?: string | null
          id?: string
          leeftijd?: number | null
          marketing?: string | null
          motivatie_kiezen_proteine_snack?: string | null
          openheid_nieuwe_snack?: boolean | null
          prijs?: number | null
        }
        Update: {
          buying_persona?: string
          consumptie_situatie?: string | null
          frequentie_frituurbezoek?: string | null
          geslacht?: string | null
          id?: string
          leeftijd?: number | null
          marketing?: string | null
          motivatie_kiezen_proteine_snack?: string | null
          openheid_nieuwe_snack?: boolean | null
          prijs?: number | null
        }
        Relationships: []
      }
      Team13friturenforwebsite: {
        Row: {
          aankoopprijs: number | null
          aankoopprijs_proteine_snacks: number | null
          absolute_marges: number | null
          belangrijke_factor_1: string | null
          belangrijke_factor_2: string | null
          bereidheid_aanbieden: string | null
          bestseller_1: string
          bestseller_2: string | null
          bestseller_3: string | null
          extra_groothandel: string | null
          gemiddlede_marges: number | null
          groothandel: string | null
          id: string
          marketing_1: string | null
          marketing_2: string | null
          trends_1: string | null
          trends_2: string | null
          waarom_niet_verkopen: string | null
          waarom_niet_verkopen_2: string | null
        }
        Insert: {
          aankoopprijs?: number | null
          aankoopprijs_proteine_snacks?: number | null
          absolute_marges?: number | null
          belangrijke_factor_1?: string | null
          belangrijke_factor_2?: string | null
          bereidheid_aanbieden?: string | null
          bestseller_1: string
          bestseller_2?: string | null
          bestseller_3?: string | null
          extra_groothandel?: string | null
          gemiddlede_marges?: number | null
          groothandel?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          trends_1?: string | null
          trends_2?: string | null
          waarom_niet_verkopen?: string | null
          waarom_niet_verkopen_2?: string | null
        }
        Update: {
          aankoopprijs?: number | null
          aankoopprijs_proteine_snacks?: number | null
          absolute_marges?: number | null
          belangrijke_factor_1?: string | null
          belangrijke_factor_2?: string | null
          bereidheid_aanbieden?: string | null
          bestseller_1?: string
          bestseller_2?: string | null
          bestseller_3?: string | null
          extra_groothandel?: string | null
          gemiddlede_marges?: number | null
          groothandel?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          trends_1?: string | null
          trends_2?: string | null
          waarom_niet_verkopen?: string | null
          waarom_niet_verkopen_2?: string | null
        }
        Relationships: []
      }
      Team13streetinterviewsforwebsite: {
        Row: {
          belang_van_krokantheid: string | null
          belangrijkst_aankoopbariere: string | null
          bereidingsvoorkeur: string | null
          branding: string | null
          eerste_reactie: string | null
          eiwitgehalte: number | null
          frituurbezoek_frequentie: string | null
          hogere_prijs: boolean | null
          hogere_prijs_factoren: string | null
          id: string
          marketing_1: string | null
          marketing_2: string | null
          motivatie_frituur: string | null
          populaire_snack_1: string | null
          populaire_snack_2: string | null
          prijs: number | null
          ruimte_voor_innovatie: boolean | null
          smaakvoorkeuren: string | null
          verkoopskanalen: string | null
          vervangen_traditionele_snack: boolean | null
          welke_coating: string | null
        }
        Insert: {
          belang_van_krokantheid?: string | null
          belangrijkst_aankoopbariere?: string | null
          bereidingsvoorkeur?: string | null
          branding?: string | null
          eerste_reactie?: string | null
          eiwitgehalte?: number | null
          frituurbezoek_frequentie?: string | null
          hogere_prijs?: boolean | null
          hogere_prijs_factoren?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          motivatie_frituur?: string | null
          populaire_snack_1?: string | null
          populaire_snack_2?: string | null
          prijs?: number | null
          ruimte_voor_innovatie?: boolean | null
          smaakvoorkeuren?: string | null
          verkoopskanalen?: string | null
          vervangen_traditionele_snack?: boolean | null
          welke_coating?: string | null
        }
        Update: {
          belang_van_krokantheid?: string | null
          belangrijkst_aankoopbariere?: string | null
          bereidingsvoorkeur?: string | null
          branding?: string | null
          eerste_reactie?: string | null
          eiwitgehalte?: number | null
          frituurbezoek_frequentie?: string | null
          hogere_prijs?: boolean | null
          hogere_prijs_factoren?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          motivatie_frituur?: string | null
          populaire_snack_1?: string | null
          populaire_snack_2?: string | null
          prijs?: number | null
          ruimte_voor_innovatie?: boolean | null
          smaakvoorkeuren?: string | null
          verkoopskanalen?: string | null
          vervangen_traditionele_snack?: boolean | null
          welke_coating?: string | null
        }
        Relationships: []
      }
      Team14buyingpersonasforwebsite: {
        Row: {
          buying_persona: string
          consumptie_situatie: string | null
          frequentie_frituurbezoek: string | null
          geslacht: string | null
          id: string
          leeftijd: number | null
          marketing: string | null
          motivatie_kiezen_proteine_snack: string | null
          openheid_nieuwe_snack: boolean | null
          prijs: number | null
        }
        Insert: {
          buying_persona: string
          consumptie_situatie?: string | null
          frequentie_frituurbezoek?: string | null
          geslacht?: string | null
          id?: string
          leeftijd?: number | null
          marketing?: string | null
          motivatie_kiezen_proteine_snack?: string | null
          openheid_nieuwe_snack?: boolean | null
          prijs?: number | null
        }
        Update: {
          buying_persona?: string
          consumptie_situatie?: string | null
          frequentie_frituurbezoek?: string | null
          geslacht?: string | null
          id?: string
          leeftijd?: number | null
          marketing?: string | null
          motivatie_kiezen_proteine_snack?: string | null
          openheid_nieuwe_snack?: boolean | null
          prijs?: number | null
        }
        Relationships: []
      }
      Team14friturenforwebsite: {
        Row: {
          aankoopprijs: number | null
          aankoopprijs_proteine_snacks: number | null
          absolute_marges: number | null
          belangrijke_factor_1: string | null
          belangrijke_factor_2: string | null
          bereidheid_aanbieden: string | null
          bestseller_1: string
          bestseller_2: string | null
          bestseller_3: string | null
          extra_groothandel: string | null
          gemiddlede_marges: number | null
          groothandel: string | null
          id: string
          marketing_1: string | null
          marketing_2: string | null
          trends_1: string | null
          trends_2: string | null
          waarom_niet_verkopen: string | null
          waarom_niet_verkopen_2: string | null
        }
        Insert: {
          aankoopprijs?: number | null
          aankoopprijs_proteine_snacks?: number | null
          absolute_marges?: number | null
          belangrijke_factor_1?: string | null
          belangrijke_factor_2?: string | null
          bereidheid_aanbieden?: string | null
          bestseller_1: string
          bestseller_2?: string | null
          bestseller_3?: string | null
          extra_groothandel?: string | null
          gemiddlede_marges?: number | null
          groothandel?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          trends_1?: string | null
          trends_2?: string | null
          waarom_niet_verkopen?: string | null
          waarom_niet_verkopen_2?: string | null
        }
        Update: {
          aankoopprijs?: number | null
          aankoopprijs_proteine_snacks?: number | null
          absolute_marges?: number | null
          belangrijke_factor_1?: string | null
          belangrijke_factor_2?: string | null
          bereidheid_aanbieden?: string | null
          bestseller_1?: string
          bestseller_2?: string | null
          bestseller_3?: string | null
          extra_groothandel?: string | null
          gemiddlede_marges?: number | null
          groothandel?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          trends_1?: string | null
          trends_2?: string | null
          waarom_niet_verkopen?: string | null
          waarom_niet_verkopen_2?: string | null
        }
        Relationships: []
      }
      Team14streetinterviewsforwebsite: {
        Row: {
          belang_van_krokantheid: string | null
          belangrijkst_aankoopbariere: string | null
          bereidingsvoorkeur: string | null
          branding: string | null
          eerste_reactie: string | null
          eiwitgehalte: number | null
          frituurbezoek_frequentie: string | null
          hogere_prijs: boolean | null
          hogere_prijs_factoren: string | null
          id: string
          marketing_1: string | null
          marketing_2: string | null
          motivatie_frituur: string | null
          populaire_snack_1: string | null
          populaire_snack_2: string | null
          prijs: number | null
          ruimte_voor_innovatie: boolean | null
          smaakvoorkeuren: string | null
          verkoopskanalen: string | null
          vervangen_traditionele_snack: boolean | null
          welke_coating: string | null
        }
        Insert: {
          belang_van_krokantheid?: string | null
          belangrijkst_aankoopbariere?: string | null
          bereidingsvoorkeur?: string | null
          branding?: string | null
          eerste_reactie?: string | null
          eiwitgehalte?: number | null
          frituurbezoek_frequentie?: string | null
          hogere_prijs?: boolean | null
          hogere_prijs_factoren?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          motivatie_frituur?: string | null
          populaire_snack_1?: string | null
          populaire_snack_2?: string | null
          prijs?: number | null
          ruimte_voor_innovatie?: boolean | null
          smaakvoorkeuren?: string | null
          verkoopskanalen?: string | null
          vervangen_traditionele_snack?: boolean | null
          welke_coating?: string | null
        }
        Update: {
          belang_van_krokantheid?: string | null
          belangrijkst_aankoopbariere?: string | null
          bereidingsvoorkeur?: string | null
          branding?: string | null
          eerste_reactie?: string | null
          eiwitgehalte?: number | null
          frituurbezoek_frequentie?: string | null
          hogere_prijs?: boolean | null
          hogere_prijs_factoren?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          motivatie_frituur?: string | null
          populaire_snack_1?: string | null
          populaire_snack_2?: string | null
          prijs?: number | null
          ruimte_voor_innovatie?: boolean | null
          smaakvoorkeuren?: string | null
          verkoopskanalen?: string | null
          vervangen_traditionele_snack?: boolean | null
          welke_coating?: string | null
        }
        Relationships: []
      }
      Team38buyingpersonasforwebsite: {
        Row: {
          buying_persona: string
          consumptie_situatie: string | null
          frequentie_frituurbezoek: string | null
          geslacht: string | null
          id: string
          leeftijd: number | null
          marketing: string | null
          motivatie_kiezen_proteine_snack: string | null
          openheid_nieuwe_snack: boolean | null
          prijs: number | null
        }
        Insert: {
          buying_persona: string
          consumptie_situatie?: string | null
          frequentie_frituurbezoek?: string | null
          geslacht?: string | null
          id?: string
          leeftijd?: number | null
          marketing?: string | null
          motivatie_kiezen_proteine_snack?: string | null
          openheid_nieuwe_snack?: boolean | null
          prijs?: number | null
        }
        Update: {
          buying_persona?: string
          consumptie_situatie?: string | null
          frequentie_frituurbezoek?: string | null
          geslacht?: string | null
          id?: string
          leeftijd?: number | null
          marketing?: string | null
          motivatie_kiezen_proteine_snack?: string | null
          openheid_nieuwe_snack?: boolean | null
          prijs?: number | null
        }
        Relationships: []
      }
      Team38friturenforwebsite: {
        Row: {
          aankoopprijs: number | null
          aankoopprijs_proteine_snacks: number | null
          absolute_marges: number | null
          belangrijke_factor_1: string | null
          belangrijke_factor_2: string | null
          bereidheid_aanbieden: string | null
          bestseller_1: string
          bestseller_2: string | null
          bestseller_3: string | null
          extra_groothandel: string | null
          gemiddlede_marges: number | null
          groothandel: string | null
          id: string
          marketing_1: string | null
          marketing_2: string | null
          trends_1: string | null
          trends_2: string | null
          waarom_niet_verkopen: string | null
          waarom_niet_verkopen_2: string | null
        }
        Insert: {
          aankoopprijs?: number | null
          aankoopprijs_proteine_snacks?: number | null
          absolute_marges?: number | null
          belangrijke_factor_1?: string | null
          belangrijke_factor_2?: string | null
          bereidheid_aanbieden?: string | null
          bestseller_1: string
          bestseller_2?: string | null
          bestseller_3?: string | null
          extra_groothandel?: string | null
          gemiddlede_marges?: number | null
          groothandel?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          trends_1?: string | null
          trends_2?: string | null
          waarom_niet_verkopen?: string | null
          waarom_niet_verkopen_2?: string | null
        }
        Update: {
          aankoopprijs?: number | null
          aankoopprijs_proteine_snacks?: number | null
          absolute_marges?: number | null
          belangrijke_factor_1?: string | null
          belangrijke_factor_2?: string | null
          bereidheid_aanbieden?: string | null
          bestseller_1?: string
          bestseller_2?: string | null
          bestseller_3?: string | null
          extra_groothandel?: string | null
          gemiddlede_marges?: number | null
          groothandel?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          trends_1?: string | null
          trends_2?: string | null
          waarom_niet_verkopen?: string | null
          waarom_niet_verkopen_2?: string | null
        }
        Relationships: []
      }
      Team38streetinterviewsforwebsite: {
        Row: {
          belang_van_krokantheid: string | null
          belangrijkst_aankoopbariere: string | null
          bereidingsvoorkeur: string | null
          branding: string | null
          eerste_reactie: string | null
          eiwitgehalte: string | null
          frituurbezoek_frequentie: string | null
          hogere_prijs: boolean | null
          hogere_prijs_factoren: string | null
          id: string
          marketing_1: string | null
          marketing_2: string | null
          motivatie_frituur: string | null
          populaire_snack_1: string | null
          populaire_snack_2: string | null
          prijs: string | null
          ruimte_voor_innovatie: boolean | null
          smaakvoorkeuren: string | null
          verkoopskanalen: string | null
          vervangen_traditionele_snack: boolean | null
          welke_coating: string | null
        }
        Insert: {
          belang_van_krokantheid?: string | null
          belangrijkst_aankoopbariere?: string | null
          bereidingsvoorkeur?: string | null
          branding?: string | null
          eerste_reactie?: string | null
          eiwitgehalte?: string | null
          frituurbezoek_frequentie?: string | null
          hogere_prijs?: boolean | null
          hogere_prijs_factoren?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          motivatie_frituur?: string | null
          populaire_snack_1?: string | null
          populaire_snack_2?: string | null
          prijs?: string | null
          ruimte_voor_innovatie?: boolean | null
          smaakvoorkeuren?: string | null
          verkoopskanalen?: string | null
          vervangen_traditionele_snack?: boolean | null
          welke_coating?: string | null
        }
        Update: {
          belang_van_krokantheid?: string | null
          belangrijkst_aankoopbariere?: string | null
          bereidingsvoorkeur?: string | null
          branding?: string | null
          eerste_reactie?: string | null
          eiwitgehalte?: string | null
          frituurbezoek_frequentie?: string | null
          hogere_prijs?: boolean | null
          hogere_prijs_factoren?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          motivatie_frituur?: string | null
          populaire_snack_1?: string | null
          populaire_snack_2?: string | null
          prijs?: string | null
          ruimte_voor_innovatie?: boolean | null
          smaakvoorkeuren?: string | null
          verkoopskanalen?: string | null
          vervangen_traditionele_snack?: boolean | null
          welke_coating?: string | null
        }
        Relationships: []
      }
      Team3buyingpersonasforwebsite: {
        Row: {
          buying_persona: string
          consumptie_situatie: string | null
          frequentie_frituurbezoek: string | null
          geslacht: string | null
          id: string
          leeftijd: number | null
          marketing: string | null
          motivatie_kiezen_proteine_snack: string | null
          openheid_nieuwe_snack: boolean | null
          prijs: number | null
        }
        Insert: {
          buying_persona: string
          consumptie_situatie?: string | null
          frequentie_frituurbezoek?: string | null
          geslacht?: string | null
          id?: string
          leeftijd?: number | null
          marketing?: string | null
          motivatie_kiezen_proteine_snack?: string | null
          openheid_nieuwe_snack?: boolean | null
          prijs?: number | null
        }
        Update: {
          buying_persona?: string
          consumptie_situatie?: string | null
          frequentie_frituurbezoek?: string | null
          geslacht?: string | null
          id?: string
          leeftijd?: number | null
          marketing?: string | null
          motivatie_kiezen_proteine_snack?: string | null
          openheid_nieuwe_snack?: boolean | null
          prijs?: number | null
        }
        Relationships: []
      }
      Team3friturenforwebsite: {
        Row: {
          aankoopprijs: number | null
          aankoopprijs_proteine_snacks: number | null
          absolute_marges: number | null
          belangrijke_factor_1: string | null
          belangrijke_factor_2: string | null
          bereidheid_aanbieden: string | null
          bestseller_1: string
          bestseller_2: string | null
          bestseller_3: string | null
          extra_groothandel: string | null
          gemiddlede_marges: number | null
          groothandel: string | null
          id: string
          marketing_1: string | null
          marketing_2: string | null
          trends_1: string | null
          trends_2: string | null
          waarom_niet_verkopen: string | null
          waarom_niet_verkopen_2: string | null
        }
        Insert: {
          aankoopprijs?: number | null
          aankoopprijs_proteine_snacks?: number | null
          absolute_marges?: number | null
          belangrijke_factor_1?: string | null
          belangrijke_factor_2?: string | null
          bereidheid_aanbieden?: string | null
          bestseller_1: string
          bestseller_2?: string | null
          bestseller_3?: string | null
          extra_groothandel?: string | null
          gemiddlede_marges?: number | null
          groothandel?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          trends_1?: string | null
          trends_2?: string | null
          waarom_niet_verkopen?: string | null
          waarom_niet_verkopen_2?: string | null
        }
        Update: {
          aankoopprijs?: number | null
          aankoopprijs_proteine_snacks?: number | null
          absolute_marges?: number | null
          belangrijke_factor_1?: string | null
          belangrijke_factor_2?: string | null
          bereidheid_aanbieden?: string | null
          bestseller_1?: string
          bestseller_2?: string | null
          bestseller_3?: string | null
          extra_groothandel?: string | null
          gemiddlede_marges?: number | null
          groothandel?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          trends_1?: string | null
          trends_2?: string | null
          waarom_niet_verkopen?: string | null
          waarom_niet_verkopen_2?: string | null
        }
        Relationships: []
      }
      Team3streetinterviewsforwebsite: {
        Row: {
          belang_van_krokantheid: string | null
          belangrijkst_aankoopbariere: string | null
          bereidingsvoorkeur: string | null
          branding: string | null
          eerste_reactie: string | null
          eiwitgehalte: number | null
          frituurbezoek_frequentie: string | null
          hogere_prijs: boolean | null
          hogere_prijs_factoren: string | null
          id: string
          marketing_1: string | null
          marketing_2: string | null
          motivatie_frituur: string | null
          populaire_snack_1: string | null
          populaire_snack_2: string | null
          prijs: number | null
          ruimte_voor_innovatie: boolean | null
          smaakvoorkeuren: string | null
          verkoopskanalen: string | null
          vervangen_traditionele_snack: boolean | null
          welke_coating: string | null
        }
        Insert: {
          belang_van_krokantheid?: string | null
          belangrijkst_aankoopbariere?: string | null
          bereidingsvoorkeur?: string | null
          branding?: string | null
          eerste_reactie?: string | null
          eiwitgehalte?: number | null
          frituurbezoek_frequentie?: string | null
          hogere_prijs?: boolean | null
          hogere_prijs_factoren?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          motivatie_frituur?: string | null
          populaire_snack_1?: string | null
          populaire_snack_2?: string | null
          prijs?: number | null
          ruimte_voor_innovatie?: boolean | null
          smaakvoorkeuren?: string | null
          verkoopskanalen?: string | null
          vervangen_traditionele_snack?: boolean | null
          welke_coating?: string | null
        }
        Update: {
          belang_van_krokantheid?: string | null
          belangrijkst_aankoopbariere?: string | null
          bereidingsvoorkeur?: string | null
          branding?: string | null
          eerste_reactie?: string | null
          eiwitgehalte?: number | null
          frituurbezoek_frequentie?: string | null
          hogere_prijs?: boolean | null
          hogere_prijs_factoren?: string | null
          id?: string
          marketing_1?: string | null
          marketing_2?: string | null
          motivatie_frituur?: string | null
          populaire_snack_1?: string | null
          populaire_snack_2?: string | null
          prijs?: number | null
          ruimte_voor_innovatie?: boolean | null
          smaakvoorkeuren?: string | null
          verkoopskanalen?: string | null
          vervangen_traditionele_snack?: boolean | null
          welke_coating?: string | null
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
