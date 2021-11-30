export interface Profile {
  id: string;
  name: string;
  profilePicture: string;
  country: string;
  pp: number;
  rank: number;
  countryRank: number;
  scoreStats: Stats;
}

interface Stats {
  totalScore: number;
  totalRankedScore: number;
  averageRankedAccuracy: number;
  totalPlayCount: number;
  rankedPlayCount: number;
  replaysWatched: number;
}
