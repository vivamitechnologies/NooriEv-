import { createClient } from "@supabase/supabase-js";

// Fallback to user provided public keys in the request if environment variables are not set
const SUPABASE_URL = 
  (import.meta as any).env?.VITE_SUPABASE_URL || 
  "https://cgqegkqwwsawvdlwmeju.supabase.co";

const SUPABASE_ANON_KEY = 
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 
  "sb_publishable_oEBzBiqzUIbw9-kQMDqsFA_zWnf9Cab";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Interface for enquiries table
export interface Inquiry {
  id?: string;
  created_at?: string;
  name: string;
  phone: string;
  model: string;
  city: string;
  message: string;
  type: 'scooter_enquiry' | 'contact_message' | 'dealership_enquiry';
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  notes?: string;
}

// Helper to send to Formspree
export async function sendToFormspree(data: any) {
  try {
    const response = await fetch("https://formspree.io/f/xpqndzrg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.ok;
  } catch (error) {
    console.error("Error sending to Formspree:", error);
    return false;
  }
}

// SQL Script instructions to create the table inside the Supabase dashboard
export const SQL_SETUP_SCRIPT = `-- SQL to set up the enquiries table in Supabase:

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  model TEXT DEFAULT 'Not Specified',
  city TEXT DEFAULT 'Not Specified',
  message TEXT DEFAULT '',
  type TEXT DEFAULT 'scooter_enquiry',
  status TEXT DEFAULT 'New',
  notes TEXT DEFAULT ''
);

-- Enable row-level security (RLS)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a new inquiry (Public submission)
CREATE POLICY "Allow public inserts" 
ON enquiries FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public access for reading/updating for display / admin (or restrict as needed)
-- For the demo preview, we allow all operations. In true production, configure role auth
CREATE POLICY "Allow all operations for preview" 
ON enquiries FOR ALL 
TO public 
USING (true)
WITH CHECK (true);
`;
