import { put, list } from "@vercel/blob";
import fs from "fs";
import path from "path";

const ALBUMS: Record<string, string> = {
  spain: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\spain_trip_2024",
  europe: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\europe_grad_trip_2024",
  otet: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\OTET_2025",
  boulder: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\Boulder Trip",
  nrg: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\new_river_gorge_trip",
  rrg: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\new_river_gorge_trip\\Red_river_gorge",
};

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);

async function main() {
  // Check what's already uploaded
  const existing = new Set<string>();
  let cursor: string | undefined;
  do {
    const result = await list({ prefix: "photos/", cursor });
    for (const blob of result.blobs) {
      existing.add(blob.pathname);
    }
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  console.log(`Found ${existing.size} existing blobs`);

  for (const [album, dirPath] of Object.entries(ALBUMS)) {
    console.log(`\n--- Album: ${album} ---`);

    const files = fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter(
        (f) => f.isFile() && IMAGE_EXTS.has(path.extname(f.name).toLowerCase())
      )
      .map((f) => f.name)
      .sort();

    for (const file of files) {
      const blobPath = `photos/${album}/${file}`;

      if (existing.has(blobPath)) {
        console.log(`  SKIP ${file} (already uploaded)`);
        continue;
      }

      const filePath = path.join(dirPath, file);
      const buffer = fs.readFileSync(filePath);

      console.log(`  UPLOAD ${file} (${(buffer.length / 1024 / 1024).toFixed(1)}MB)...`);
      await put(blobPath, buffer, { access: "private", addRandomSuffix: false });
    }

    console.log(`  Done (${files.length} files)`);
  }

  console.log("\nAll uploads complete!");
}

main().catch(console.error);
