export interface DriveImage {
  src: string;
  full: string;
  alt: string;
}

export interface DriveFileResponse {
  files: Array<{
    id: string;
    name: string;
  }>;
}
