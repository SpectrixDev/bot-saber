export interface Profile {
  playerInfo: PlayerInfo;
  scoreStats: Stats;
}

interface PlayerInfo {
  playerId: string;
  playerName: string;
  avatar: string;
  rank: number;
  countryRank: number;
  pp: number;
  country: string;
  badges: Badge[];
}

interface Badge {
  image: string;
}

interface Stats {
  totalScore: number;
  totalRankedScore: number;
  averageRankedAccuracy: number;
  totalPlayCount: number;
  rankedPlayCount: number;
}
