import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";
import path from "path";

const VALID_ALBUMS = new Set(["spain", "europe", "otet", "boulder", "nrg", "rrg"]);

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/jpeg",
};

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ album: string; filename: string }> }
) {
  const { album, filename } = await context.params;

  if (!/^[\w\s.\-_()+]+$/.test(filename)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (!VALID_ALBUMS.has(album)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const blobPath = `photos/${album}/${filename}`;

  try {
    // Find the blob by its exact pathname
    const result = await list({ prefix: blobPath, limit: 1 });
    const blob = result.blobs.find((b) => b.pathname === blobPath);

    if (!blob) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Fetch the blob content from its URL
    const response = await fetch(blob.downloadUrl);
    if (!response.ok) {
      return new NextResponse("Failed to fetch image", { status: 500 });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const ext = path.extname(filename).toLowerCase();

    // Convert HEIC to JPEG on the fly
    if (ext === ".heic") {
      try {
        const sharp = (await import("sharp")).default;
        const jpegBuffer = await sharp(buffer).jpeg({ quality: 85 }).toBuffer();
        return new NextResponse(jpegBuffer as unknown as BodyInit, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=86400",
          },
        });
      } catch {
        return new NextResponse("Failed to convert image", { status: 500 });
      }
    }

    const contentType = MIME[ext] ?? "application/octet-stream";
    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}
