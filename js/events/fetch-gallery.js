const DRIVE_API_KEY = window.__APP_CONFIG__?.GOOGLE_DRIVE_API_KEY;

const folderCache = new Map(); // folderId -> [{src, full, alt}]

function driveThumb(fileId, size = 1200) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

function driveFull(fileId) {
  // Use the thumbnail endpoint for "full size" too (more reliable than /uc?export=view)
  const w = Math.min((window.innerWidth || 1200) * 2, 3000); // cap at 3000
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${Math.floor(w)}`;
}

async function fetchDriveFolderImages(folderId) {
  if (!folderId) return [];
  if (!DRIVE_API_KEY) {
    throw new Error("Missing GOOGLE_DRIVE_API_KEY in config.js");
  }
  if (folderCache.has(folderId)) return folderCache.get(folderId);

  const q = encodeURIComponent(
    `'${folderId}' in parents and trashed=false and mimeType contains 'image/'`
  );

  const url =
    `https://www.googleapis.com/drive/v3/files` +
    `?key=${encodeURIComponent(DRIVE_API_KEY)}` +
    `&q=${q}` +
    `&fields=files(id,name)` +
    `&orderBy=name`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Drive API error: ${res.status}`);

  const data = await res.json();

  const images = (data.files || []).map((f, idx) => ({
    // grid thumb
    src: driveThumb(f.id, 1000),
    // modal full (reliable)
    full: driveFull(f.id),
    alt: f.name || `Image ${idx + 1}`,
  }));

  folderCache.set(folderId, images);
  return images;
}

export { fetchDriveFolderImages, driveThumb };
