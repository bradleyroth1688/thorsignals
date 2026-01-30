-- Create leads table for email capture funnel
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  source TEXT DEFAULT 'free-report',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Index for source filtering (useful for analytics)
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);

-- Index for created_at ordering (useful for recent leads)
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);