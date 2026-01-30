import { createClient } from '@supabase/supabase-js'
import SignalsDashboard from './SignalsDashboard'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SignalsPage() {
  const { data: signals } = await supabase
    .from('signals')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  const { data: pendingTweets } = await supabase
    .from('pending_tweets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return <SignalsDashboard signals={signals || []} tweets={pendingTweets || []} />
}
