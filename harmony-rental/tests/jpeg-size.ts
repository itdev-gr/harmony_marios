import { readFileSync } from "node:fs";

/**
 * Reads a JPEG's pixel dimensions from its Start-Of-Frame header.
 *
 * Inline rather than an image-size dependency: the only thing the suite needs
 * from a picture is how big it is — to check a stay photo matches the size
 * recorded in the data, and to check a listing photo is actually shaped like a
 * photo of a room rather than a screenshot of something.
 */
export function jpegSize(buffer: Buffer): { width: number; height: number } {
  let offset = 2; // skip SOI
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) throw new Error("not a JPEG segment marker");
    const marker = buffer[offset + 1];
    // SOF0–SOF15, excluding the non-frame markers DHT/JPG/DAC.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  throw new Error("no JPEG frame header found");
}

/** Same, straight from a path. */
export function jpegSizeOf(file: string): { width: number; height: number } {
  return jpegSize(readFileSync(file));
}
