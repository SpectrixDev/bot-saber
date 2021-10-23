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
}

export interface SearchResult {
  docs: Song[];
}
