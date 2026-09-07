export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  // Check if Upstash Redis or Vercel KV is configured via environment variables
  const kvUrl =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // Check query parameter if this is an increment hit or read-only probe
  const url = new URL(req.url);
  const isHit = url.searchParams.get("hit") !== "0";

  if (kvUrl && kvToken) {
    try {
      const endpoint = isHit
        ? `${kvUrl}/incr/qwykz_web_visitors`
        : `${kvUrl}/get/qwykz_web_visitors`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${kvToken}`,
        },
      });

      if (response.ok) {
        const data = (await response.json()) as { result: number | string | null };
        const count = data.result ? Number(data.result) : 0;
        return new Response(JSON.stringify({ count, provider: "kv" }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=5, stale-while-revalidate=30",
          },
        });
      }
    } catch {
      // Fall through to hits.sh fallback on KV failure
    }
  }

  // Zero-config free tier fallback using hits.sh tracking
  try {
    const hitsUrl = "https://hits.sh/qwykz-web.vercel.app.svg?label=visitors";
    const res = await fetch(hitsUrl, {
      headers: {
        "User-Agent": "qwykz-web-counter",
      },
      cache: "no-store",
    });

    if (res.ok) {
      const svg = await res.text();
      const match = svg.match(/<title>visitors: ([0-9,]+)<\/title>/);
      const count = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;

      return new Response(JSON.stringify({ count, provider: "hits" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=60",
        },
      });
    }
  } catch {
    // Network / upstream error
  }

  return new Response(JSON.stringify({ count: null, error: "Unavailable" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
