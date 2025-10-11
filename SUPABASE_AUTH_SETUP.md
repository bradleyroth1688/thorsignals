# 🔐 Supabase Authentication Setup Guide

## Problem: Email Confirmation Link Not Working

If your email confirmation links redirect to a blank page or don't work, follow these steps:

---

## Step 1: Check Your Environment Variables

Create a `.env.local` file in your project root (copy from `env.example`):

```bash
cp env.example .env.local
```

**Important:** Make sure your `NEXT_PUBLIC_SITE_URL` includes the protocol:

```env
# ✅ CORRECT
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ❌ WRONG
NEXT_PUBLIC_SITE_URL=localhost:3000
```

---

## Step 2: Configure Supabase Dashboard

### 1. Go to Supabase Dashboard
- Open your project at [https://supabase.com/dashboard](https://supabase.com/dashboard)
- Select your project

### 2. Configure URL Configuration
Navigate to: **Authentication → URL Configuration**

Set the following:

**Site URL:**
```
http://localhost:3000
```
(For production, use your actual domain like `https://yourdomain.com`)

**Redirect URLs (Add these one by one):**
```
http://localhost:3000/**
http://localhost:3000/auth/callback
http://localhost:3000/welcome
```

For production, also add:
```
https://yourdomain.com/**
https://yourdomain.com/auth/callback
https://yourdomain.com/welcome
```

### 3. Configure Email Templates (IMPORTANT)

Navigate to: **Authentication → Email Templates → Confirm signup**

By default, Supabase uses implicit flow (tokens in URL hash). We need to use PKCE flow for better security and proper redirects.

**Update the "Confirm signup" template to:**

```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your email:</p>
<p><a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&next=/welcome">Confirm your email</a></p>
```

**Important:** 
- Use `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&next=/welcome`
- Do NOT use `{{ .ConfirmationURL }}` as it uses implicit flow
- The `&next=/welcome` parameter tells where to redirect after confirmation

---

## Step 3: Test the Flow

### Current Workaround (Works Immediately)

The app now includes an `AuthHashHandler` that automatically detects email confirmation and redirects you to the welcome page. This works with Supabase's default implicit flow.

1. **Sign up with a new email**
2. **Check your email** (also check spam folder)
3. **Click the confirmation link**
4. You'll be redirected to `http://localhost:3000/` with tokens
5. The AuthHashHandler will automatically detect this and redirect you to `/welcome`

### Proper Fix (Recommended for Production)

For better security and cleaner URLs, you should update the Supabase email template as described in Step 2, Section 3 above. This will use PKCE flow instead of implicit flow.

---

## Troubleshooting

### Issue: Link shows `redirect_to=localhost:3000` (without http://)

**Solution:**
- Make sure `NEXT_PUBLIC_SITE_URL` in your `.env.local` includes `http://`
- Restart your dev server: `npm run dev`
- Clear your browser cache
- Try signing up with a new email address

### Issue: "Invalid redirect URL"

**Solution:**
- Make sure you added `http://localhost:3000/auth/callback` to Redirect URLs in Supabase dashboard
- Add wildcard pattern: `http://localhost:3000/**`

### Issue: Email not received

**Solution:**
- Check spam folder
- In Supabase Dashboard → Authentication → Settings, make sure email provider is configured
- For development, you can view auth emails in: **Authentication → Users** → Click on user → View sent emails

---

## Production Deployment Checklist

When deploying to production:

1. ✅ Update `NEXT_PUBLIC_SITE_URL` to your production domain
2. ✅ Add production domain to Supabase Redirect URLs
3. ✅ Update Site URL in Supabase to production domain
4. ✅ Test signup flow in production
5. ✅ Configure custom SMTP (optional, in Authentication → Settings)

---

## Need Help?

If you're still having issues:
1. Check the browser console for errors (F12)
2. Check your terminal/server logs
3. Verify all environment variables are set correctly
4. Make sure you restarted the dev server after changing `.env.local`

---

## Quick Reference

**Environment Variable Format:**
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Supabase Site URL:**
```
http://localhost:3000
```

**Supabase Redirect URLs:**
```
http://localhost:3000/**
http://localhost:3000/auth/callback
http://localhost:3000/welcome
```

---

✅ After following these steps, your email confirmation flow should work perfectly!

