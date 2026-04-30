export interface BoardMember {
  name: string;
  position: string;
  img: string;
  bio: string | null;
  linkedin: string;
  calendly?: string | null;
  company?: string | null;
}

export interface BoardYear {
  members: BoardMember[];
}

export interface BoardData {
  boards: Record<string, BoardYear>;
}
