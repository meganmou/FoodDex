import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://kvdmzxoxtrgkzrqxxomw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2ZG16eG94dHJna3pycXh4b213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5MzM2OTYsImV4cCI6MjAxNjUwOTY5Nn0.n2ZKIlIdnkpPd9ybL6esDfs5aaJUWUZ1rGX-ssqLQ84";

export default supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
