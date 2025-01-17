import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pnykbgdeaknzwqrjjsmb.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBueWtiZ2RlYWtuendxcmpqc21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwODkyODAsImV4cCI6MjA1MjY2NTI4MH0.Rm1UAhz9Uc4N7OKSQ3Tj6nMnDtIayuOa78RjWsWosPI'

// Create a single instance of the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase } 