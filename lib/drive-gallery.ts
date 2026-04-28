import { DriveImage, DriveFileResponse } from "@/types/drive";

const cache = new Map<string, DriveImage[]>();

/**
 * Generate a Google Drive thumbnail URL for a given file ID.
 * @param fileId - The Google Drive file ID
 * @param size - The thumbnail width in pixels (default: 400)
 */
export function driveThumb(fileId: string, size: number = 400): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

/**
 * Generate a full-size Google Drive image URL for a given file ID.
 * @param fileId - The Google Drive file ID
 */
export function driveFull(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
}

/**
 * Fetch image listings from a Google Drive folder using the Drive API v3.
 * Results are cached in memory to avoid redundant API calls.
 * @param folderId - The Google Drive folder ID to fetch images from
 * @returns An array of DriveImage objects
 */
export async function fetchDriveFolderImages(
  folderId: string | undefined,
): Promise<DriveImage[]> {
  if (!folderId || folderId.trim() === "") {
    return [];
  }

  const cached = cache.get(folderId);
  if (cached) {
    return cached;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_DRIVE_API_KEY");
  }

  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image'&key=${apiKey}&fields=files(id,name)`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Drive API error: ${response.status}`);
  }

  const data: DriveFileResponse = await response.json();

  const images: DriveImage[] = (data.files || []).map((file) => ({
    src: driveThumb(file.id),
    full: driveFull(file.id),
    alt: file.name || "Drive image",
  }));

  cache.set(folderId, images);

  return images;
}
