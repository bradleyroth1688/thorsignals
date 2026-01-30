-- Signals table: stores every TradingView webhook alert
CREATE TABLE IF NOT EXISTS signals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticker TEXT NOT NULL,
  signal_type TEXT NOT NULL CHECK (signal_type IN ('long', 'exit')),
  price DECIMAL,
  timeframe TEXT DEFAULT 'W',
  source TEXT DEFAULT 'tradingview',
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_signals_ticker ON signals(ticker);
CREATE INDEX IF NOT EXISTS idx_signals_created_at ON signals(created_at DESC);

-- Pending tweets: queue for auto-posting when X API is connected
CREATE TABLE IF NOT EXISTS pending_tweets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticker TEXT NOT NULL,
  signal_type TEXT NOT NULL,
  tweet_text TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'posted', 'failed')),
  posted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pending_tweets_status ON pending_tweets(status);
