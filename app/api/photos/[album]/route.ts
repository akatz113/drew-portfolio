import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

const VALID_ALBUMS = new Set(["spain", "europe", "otet", "boulder", "nrg", "rrg"]);

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ album: string }> }
) {
  const { album } = await context.params;

  if (!VALID_ALBUMS.has(album)) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  try {
    const filenames: string[] = [];
    let cursor: string | undefined;

    do {
      const result = await list({ prefix: `photos/${album}/`, cursor });
      for (const blob of result.blobs) {
        const name = blob.pathname.split("/").pop();
        if (name) filenames.push(name);
      }
      cursor = result.hasMore ? result.cursor : undefined;
    } while (cursor);

    filenames.sort();
    return NextResponse.json(filenames);
  } catch {
    return NextResponse.json(
      { error: "Failed to read album" },
      { status: 500 }
    );
  }
}
