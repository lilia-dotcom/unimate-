import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://damjbpzmjbritiljngpg.supabase.co";

const supabaseKey = "sb_publishable_EkDdkbYi_2CDmJQuBZX9kA_BgMxDmI5";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);