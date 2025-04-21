export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password?: string
          updated_at?: string
        }
      }
      blogs: {
        Row: {
          id: string
          name: string
          title: string
          blog: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          blog: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          blog?: string
          status?: string
          updated_at?: string
        }
      }
      health_check: {
        Row: {
          status: string
        }
        Insert: {
          status: string
        }
        Update: {
          status?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      exec_sql: {
        Args: {
          sql: string
        }
        Returns: Json
      }
      add_admin: {
        Args: {
          _email: string
          _password: string
        }
        Returns: string
      }
      add_student_blog: {
        Args: {
          _name: string
          _title: string
          _blog: string
        }
        Returns: string
      }
      get_blogs_as_json: {
        Args: {
          _student_name?: string
        }
        Returns: Json
      }
      get_student_blogs: {
        Args: {
          _student_name: string
        }
        Returns: Database['public']['Tables']['blogs']['Row'][]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
