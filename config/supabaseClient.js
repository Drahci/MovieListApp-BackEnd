const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://cwegnwmlakddhsmpuctu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3ZWdud21sYWtkZGhzbXB1Y3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMTMyNDMsImV4cCI6MjA0MDg4OTI0M30.wMK2_Mzffuu3rcb9VxHjmkMfDqvhrR02FUT1Fc2CRM4";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
