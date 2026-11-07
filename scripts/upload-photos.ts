import { put, list, del } from "@vercel/blob";
import fs from "fs";
import path from "path";
import convert from "heic-convert";
import sharp from "sharp";

const ALBUMS: Record<string, string> = {
  spain: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\spain_trip_2024",
  europe: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\europe_grad_trip_2024",
  otet: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\OTET_2025",
  boulder: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\Boulder Trip",
  nrg: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\new_river_gorge_trip",
  rrg: "C:\\Users\\Drew Katz\\Documents\\Trips Photos\\new_river_gorge_trip\\Red_river_gorge",
};

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);

function isJpeg(buf: Buffer): boolean {
  return buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xd8;
}

async function processFile(filePath: string): Promise<{ buffer: Buffer; ext: string }> {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".heic") {
    const input = fs.readFileSync(filePath);
    if (isJpeg(input)) {
      return { buffer: input, ext: ".jpg" };
    }
    const jpegData = await convert({ buffer: input, format: "JPEG", quality: 0.85 });
    const resized = await sharp(jpegData).resize({ width: 2400, withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
    return { buffer: resized, ext: ".jpg" };
  }
  return { buffer: fs.readFileSync(filePath), ext };
}

async function main() {
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

  // Delete stale .heic blobs that have been replaced by .jpg
  for (const blobPath of existing) {
    if (blobPath.toLowerCase().endsWith(".heic")) {
      console.log(`  DELETE stale HEIC blob: ${blobPath}`);
      await del(blobPath);
      existing.delete(blobPath);
    }
  }

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
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, path.extname(file));
      const uploadName = ext === ".heic" ? `${baseName}.jpg` : file;
      const blobPath = `photos/${album}/${uploadName}`;

      if (existing.has(blobPath)) {
        console.log(`  SKIP ${uploadName} (already uploaded)`);
        continue;
      }

      const filePath = path.join(dirPath, file);
      const { buffer } = await processFile(filePath);

      console.log(`  UPLOAD ${file} → ${uploadName} (${(buffer.length / 1024 / 1024).toFixed(1)}MB)...`);
      await put(blobPath, buffer, { access: "private", addRandomSuffix: false });
    }

    console.log(`  Done (${files.length} files)`);
  }

  console.log("\nAll uploads complete!");
}

main().catch(console.error);
