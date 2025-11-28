// supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://tosyomhrxttlejwlqvsf.supabase.co";
const SUPABASE_ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvc3lvbWhyeHR0bGVqd2xxdnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0OTQzMDIsImV4cCI6MjA3OTA3MDMwMn0.YukJ7MFLra2aDgvNXRYFSTEsxdGFMWy0I-pOm9CtQ_8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

