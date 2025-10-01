"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Database, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface DatabaseStatus {
  connection: boolean
  profiles: boolean
  errors: string[]
}

export function DatabaseCheck() {
  const [status, setStatus] = useState<DatabaseStatus>({
    connection: false,
    profiles: false,
    errors: [],
  })
  const [loading, setLoading] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  const supabase = createClient()

  const runDatabaseTests = async () => {
    setLoading(true)
    setTestResults([])
    const errors: string[] = []
    const results: string[] = []

    try {
      // Test 1: Basic connection
      results.push("🔍 Testing database connection...")
      const { data: connectionTest, error: connectionError } = await supabase.from("profiles").select("count").limit(1)

      if (connectionError) {
        if (connectionError.message.includes('relation "public.profiles" does not exist')) {
          errors.push("Profiles table doesn't exist - need to run database scripts")
          results.push("❌ Profiles table not found")
        } else {
          errors.push(`Connection error: ${connectionError.message}`)
          results.push("❌ Database connection failed")
        }
      } else {
        results.push("✅ Database connection successful")
        results.push("✅ Profiles table exists")
      }

      // Update status
      setStatus({
        connection: !connectionError,
        profiles: !connectionError,
        errors,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      errors.push(`Unexpected error: ${errorMessage}`)
      results.push(`❌ Unexpected error: ${errorMessage}`)
    }

    setTestResults(results)
    setLoading(false)
  }

  useEffect(() => {
    runDatabaseTests()
  }, [])

  const allTablesExist = status.profiles

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Connection Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert className={status.connection ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            {status.connection ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertTitle>Database Connection</AlertTitle>
            <AlertDescription>
              {status.connection ? "Successfully connected to Supabase" : "Failed to connect to database"}
            </AlertDescription>
          </Alert>

          <Alert className={allTablesExist ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
            {allTablesExist ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            )}
            <AlertTitle>Profiles Table</AlertTitle>
            <AlertDescription>
              {allTablesExist ? "Profiles table exists" : "Profiles table is missing"}
            </AlertDescription>
          </Alert>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Test Results:</h3>
            <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Errors */}
        {status.errors.length > 0 && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Database Issues Found</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {status.errors.map((error, index) => (
                  <li key={index} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Action Button */}
        <div className="flex gap-2">
          <Button onClick={runDatabaseTests} disabled={loading} variant="outline">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              "Retest Database"
            )}
          </Button>
        </div>

        {/* Setup Instructions */}
        {!allTablesExist && (
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertTitle>Database Setup Required</AlertTitle>
            <AlertDescription>
              <p className="mb-2">You need to run the database setup scripts in your Supabase SQL Editor:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Go to your Supabase project dashboard</li>
                <li>Navigate to SQL Editor</li>
                <li>Run the database scripts provided below</li>
                <li>Come back and click "Retest Database"</li>
              </ol>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
