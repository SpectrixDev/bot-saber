import fetch from "node-fetch";
import { Profile } from "../interfaces/Profile";

export const getProfileById = async (id: string) => {
 const response = await fetch(
  `https://new.scoresaber.com/api/player/${id}/full`
 );
 const profile = (await response.json()) as Profile;
 return profile;
};
