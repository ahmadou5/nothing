import { env } from '@/utils/constants/env.constants'

const supabase = require('@supabase/supabase-js')

export class SuperBaseService {
  static SupabaseClient = supabase.createClient(
    env.SUPERBASE_URL,
    env.SUPERBASE_KEY
  )
}
