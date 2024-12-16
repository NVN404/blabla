import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xjvptpkhwryunrkmueqd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB0cGtod3J5dW5ya211ZXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMzE0MTAsImV4cCI6MjA0OTkwNzQxMH0.e3631Mvn0v1vzuz9B_VADcjkA-CD0KCrBJ_Xl2if5xQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
