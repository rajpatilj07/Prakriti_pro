export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          category: string
          description: string
          price: number
          weight: string
          image_url: string | null
          featured: boolean
          badge: string | null
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description: string
          price: number
          weight: string
          image_url?: string | null
          featured?: boolean
          badge?: string | null
          slug: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          image_url: string | null
          tag: string | null
          read_time: string | null
          created_at: string
          published: boolean
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          image_url?: string | null
          tag?: string | null
          read_time?: string | null
          created_at?: string
          published?: boolean
        }
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      distributor_leads: {
        Row: {
          id: string
          name: string
          phone: string
          city: string
          investment_capacity: string
          business_type: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          city: string
          investment_capacity: string
          business_type: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['distributor_leads']['Insert']>
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>
      }
    }
  }
}

// Convenience types
export type Product = Database['public']['Tables']['products']['Row']
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type DistributorLead = Database['public']['Tables']['distributor_leads']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
