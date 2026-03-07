import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const ALBUMS: Record<string, string> = {
  spain: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\spain_trip_2024",
  europe: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\europe_grad_trip_2024",
  otet: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\OTET_2025",
  boulder: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\Boulder Trip",
  nrg: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\new_river_gorge_trip",
  rrg: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\new_river_gorge_trip\\Red_river_gorge",
};

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

  // Prevent directory traversal
  if (!/^[\w\s.\-_()+]+$/.test(filename)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const albumPath = ALBUMS[album];
  if (!albumPath) return new NextResponse("Not found", { status: 404 });

  const filePath = path.join(albumPath, filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase();
  const fileBuffer = fs.readFileSync(filePath);

  // Convert HEIC to JPEG on the fly
  if (ext === ".heic") {
    try {
      const sharp = (await import("sharp")).default;
      const jpegBuffer = await sharp(fileBuffer).jpeg({ quality: 85 }).toBuffer();
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
  return new NextResponse(fileBuffer as unknown as BodyInit, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
