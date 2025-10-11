import { createServerComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "./database.types"

// For Server Components
export const createServerClient = async () => {
  const cookieStore = await cookies()
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
}

// For API Route Handlers
export const createApiClient = async () => {
  const cookieStore = await cookies()
  return createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  })
}
