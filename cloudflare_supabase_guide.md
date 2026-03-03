# Bypass Supabase Block in India using Cloudflare Workers

If you are experiencing issues connecting to Supabase from India (due to ISP or DNS blocks), you can use a free Cloudflare Worker to proxy all requests to your Supabase project. This masks the Supabase URL and allows your application to function normally.

Follow these steps to set it up:

## Step 1: Create a Cloudflare Account
1. Go to [Cloudflare](https://dash.cloudflare.com/sign-up) and sign up for a free account.
2. Verify your email address.

## Step 2: Create a Cloudflare Worker
1. In the Cloudflare Dashboard, go to **Workers & Pages** in the left sidebar.
2. Click **Create Application**, then select **Create Worker**.
3. Give your worker a name (e.g., `supabase-proxy`).
4. Click **Deploy**.

## Step 3: Add Proxy Code to the Worker
1. Once deployed, click **Edit Code** for your new worker.
2. Replace all the default code in `worker.js` (or `index.js`) with the following snippet:

```javascript
export default {
  async fetch(request, env) {
    // Replace with your actual Supabase Project URL
    const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co";

    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname + url.search, SUPABASE_URL);

    // Create a new request with the target URL
    const modifiedRequest = new Request(targetUrl, request);

    // Fetch the response from Supabase
    const response = await fetch(modifiedRequest);

    // Add CORS headers so your frontend can communicate with the proxy
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    newHeaders.set("Access-Control-Allow-Headers", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
```
3. **IMPORTANT**: Replace `YOUR_PROJECT_REF` with your actual Supabase project reference ID.
4. Click **Save and Deploy** in the top right.

## Step 4: Handle Preflight (OPTIONS) Requests
To ensure browsers don't block the proxy mechanism due to CORS policies, add handling for `OPTIONS` requests:

Replace your worker code with this updated version:

```javascript
export default {
  async fetch(request, env) {
    const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co"; // <-- Update this!

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers") || "apikey, authorization, content-type, x-client-info",
        }
      });
    }

    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname + url.search, SUPABASE_URL);

    const newRequest = new Request(targetUrl, request);
    newRequest.headers.set("Origin", SUPABASE_URL); // Spoof origin if necessary

    const response = await fetch(newRequest);

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  }
};
```
Click **Save and deploy** again.

## Step 5: Update Your Environment Variables
After deploying, Cloudflare will give you a worker URL (e.g., `https://supabase-proxy.your-username.workers.dev`).

1. Open your `.env.local` file in your project.
2. Update the `NEXT_PUBLIC_SUPABASE_URL` to point to your new Cloudflare Worker URL, rather than the `.supabase.co` URL.

```env
# Change this:
# NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co

# To this:
NEXT_PUBLIC_SUPABASE_URL=https://supabase-proxy.your-username.workers.dev
```

You do not need to change the `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `SUPABASE_SERVICE_ROLE_KEY`. They remain exactly the same.

## Step 6: Restart Your Application
Restart your Next.js development server (`npm run dev`) or redeploy your app. Your app will now route all Supabase traffic through the Cloudflare proxy, successfully bypassing the ISP block.
