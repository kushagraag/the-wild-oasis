import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://luggbmrebrybokbfuirv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1Z2dibXJlYnJ5Ym9rYmZ1aXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1NzgzMDgsImV4cCI6MjAzMzE1NDMwOH0.FIxZIyN7ukdtIQX9gSw3A-Qjau8oLdJDhSaNPPwIq34";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
