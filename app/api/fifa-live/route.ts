import { NextResponse } from 'next/server';

// Force dynamic rendering so the data is refreshed on each request.
export const dynamic = 'force-dynamic';

/**
 * GET /api/fifa-live
 * Returns live match information from FIFA (if available).
 * The endpoint used below is a public JSON endpoint that FIFA exposes for the
 * Match Centre. If the endpoint changes, update the URL accordingly.
 */
export async function GET() {
  try {
    const fifaUrl = 'https://www.fifa.com/api/v1/live/scoreboard?lang=es';
    const res = await fetch(fifaUrl, {
      headers: { Accept: 'application/json' },
      // Revalidate every 30 s to keep the data reasonably fresh.
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      throw new Error(`FIFA request failed with status ${res.status}`);
    }
    const payload = await res.json();
    // The exact shape may vary; we forward the "matches" array if present.
    const matches = payload?.matches ?? [];
    return NextResponse.json({ matches });
  } catch (error) {
    // Return empty matches on any failure to avoid breaking the UI
    return NextResponse.json({ matches: [] }, { status: 200 });
  }
}
