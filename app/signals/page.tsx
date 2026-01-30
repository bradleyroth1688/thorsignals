import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import SignalsDashboard from './SignalsDashboard'
import { redirect } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SignalsPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const params = await searchParams
  
  // Simple auth: require secret key in URL
  if (params.key !== process.env.SIGNALS_ADMIN_KEY) {
    redirect('/')
  }

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
