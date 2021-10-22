import fetch from "node-fetch";

interface SongResult {
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

interface Version {
	coverURL: string;
}

export const getSongById = async (id: string): Promise<SongResult> => {
	const response = await fetch(`https://api.beatsaver.com/maps/id/${id}`);
	const result: SongResult = await response.json();
	return result;
};
