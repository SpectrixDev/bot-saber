import fetch from "node-fetch";

export const getProfileById = (id: number) => {
  fetch(`https://new.scoresaber.com/api/player/${id}/full`);
};
