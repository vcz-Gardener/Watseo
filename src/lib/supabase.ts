import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Member = {
  id: string
  name: string
  created_at: string
}

export type AttendanceSession = {
  id: string
  date: string
  title: string
  created_at: string
}

export type Attendance = {
  id: string
  session_id: string
  member_id: string
  status: 'present' | 'absent'
  absence_reason?: string
  checked_at?: string
}