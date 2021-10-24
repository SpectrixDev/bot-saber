export interface Song {
  id: string;
  name: string;
  description: string;
  uploader: {
    name: string;
  };
  metadata: {
    bpm: number;
    duration: number;
    levelAuthorName: string;
  };
  stats: {
    downloads: number;
    upvotes: number;
    downvotes: number;
    score: number;
  };
  ranked: boolean;
  versions: Version[];
}

export interface Version {
  coverURL: string;
  diffs: Difficulty[];
}

export interface Difficulty {
  difficulty: string;
  characteristic:
  | "Standard"
  | "OneSaber"
  | "NoArrows"
  | "90Degree"
  | "360Degree"
  | "Lightshow"
  | "Lawless";
}

export interface SearchResult {
  docs: Song[];
}

export interface DocLengthInfo {
  DocLength: number
}
