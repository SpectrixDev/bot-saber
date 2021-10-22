import fetch from "node-fetch";

export const getSongById = async (id: number): Promise<any> => {
  const response = await fetch(`https://api.beatsaver.com/maps/id/${id}`);
  const result = await response.json();
  return result;
};
