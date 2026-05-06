import { DriveImage, DriveFileResponse } from "@/types/drive";
import { EventItem } from "@/types/events";

const imageCache = new Map<string, DriveImage[]>();
let eventsCache: EventItem[] | null = null;

/**
 * Generate a Google Drive thumbnail URL for a given file ID.
 */
export function driveThumb(fileId: string, size: number = 400): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

/**
 * Generate a full-size Google Drive image URL for a given file ID.
 */
export function driveFull(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
}

/**
 * Parse an event folder name into a name and date.
 * Expected format: "Event Name - Month Day, Year"
 * e.g. "Matcha & Map - January 20, 2026"
 */
function parseEventFolderName(folderName: string): {
  name: string;
  date: string;
} | null {
  // Match "Name - Date" pattern
  const match = folderName.match(/^(.+?)\s*-\s*(.+)$/);
  if (!match) {
    return null;
  }

  const name = match[1].trim();
  const date = match[2].trim();

  return { name, date };
}

/**
 * Parse a date string like "January 20, 2026" into a Date object for sorting.
 */
function parseDateString(dateStr: string): Date {
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  // If parsing fails, return epoch so it sorts to the end
  return new Date(0);
}

/**
 * Fetch all event subfolders from the parent events folder.
 * Returns EventItem[] sorted by date (newest first).
 */
export async function fetchEventFolders(): Promise<EventItem[]> {
  if (eventsCache) {
    return eventsCache;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  const parentFolderId = process.env.NEXT_PUBLIC_EVENTS_PARENT_FOLDER_ID;

  if (!apiKey) {
    console.error("Missing NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY");
    return [];
  }

  if (!parentFolderId) {
    console.error("Missing NEXT_PUBLIC_EVENTS_PARENT_FOLDER_ID");
    return [];
  }

  const query = `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name)&orderBy=name&pageSize=100`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Drive API error fetching folders: ${response.status}`);
      return [];
    }

    const data: DriveFileResponse = await response.json();

    const events: EventItem[] = (data.files || [])
      .map((folder) => {
        const parsed = parseEventFolderName(folder.name);
        if (!parsed) {
          // If folder name doesn't match convention, use full name
          return {
            id: folder.id,
            name: folder.name,
            date: "",
            alt: `${folder.name} Thumbnail`,
            galleryTitle: folder.name,
            driveFolderId: folder.id,
          };
        }

        return {
          id: folder.id,
          name: parsed.name,
          date: parsed.date,
          alt: `${parsed.name} Thumbnail`,
          galleryTitle: `${parsed.name} - ${parsed.date}`,
          driveFolderId: folder.id,
        };
      })
      // Sort by date, newest first
      .sort((a, b) => {
        const dateA = parseDateString(a.date);
        const dateB = parseDateString(b.date);
        return dateB.getTime() - dateA.getTime();
      });

    eventsCache = events;
    return events;
  } catch (error) {
    console.error("Failed to fetch event folders:", error);
    return [];
  }
}

/**
 * Fetch image listings from a Google Drive folder using the Drive API v3.
 * Results are cached in memory to avoid redundant API calls.
 */
export async function fetchDriveFolderImages(
  folderId: string | undefined,
): Promise<DriveImage[]> {
  if (!folderId || folderId.trim() === "") {
    return [];
  }

  const cached = imageCache.get(folderId);
  if (cached) {
    return cached;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_DRIVE_API_KEY");
  }

  const query = `'${folderId}' in parents and mimeType contains 'image' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name)&pageSize=100`;

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

  imageCache.set(folderId, images);

  return images;
}
