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

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ album: string }> }
) {
  const { album } = await context.params;
  const albumPath = ALBUMS[album];
  if (!albumPath) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  try {
    const files = fs
      .readdirSync(albumPath, { withFileTypes: true })
      .filter(
        (f) =>
          f.isFile() &&
          IMAGE_EXTS.has(path.extname(f.name).toLowerCase())
      )
      .map((f) => f.name)
      .sort();

    return NextResponse.json(files);
  } catch {
    return NextResponse.json(
      { error: "Failed to read album" },
      { status: 500 }
    );
  }
}
