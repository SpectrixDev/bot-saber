import fetch from "node-fetch";
import { Profile } from "../interfaces/Profile";

export const getProfileById = async (id: string): Promise<Profile> => {
  const response = await fetch(`https://scoresaber.com/api/player/${id}/full`);
  const profile = (await response.json()) as Profile;
  return profile;
};

export const searchProfileByName = async (name: string): Promise<Profile[]> => {
  const response = await fetch(
    `https://scoresaber.com/api/players?search=${name}`
  );
  const result = (await response.json()) as Profile[];

  let profiles: Profile[] = [];
  for (let i = 0; i < (result.length <= 10 ? result.length : 10); i++) {
    profiles.push(result[i]);
  }
  return profiles;
};
