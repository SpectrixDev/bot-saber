import { BSClient } from "../client/Client";

export interface Run {
	(client: BSClient, ...args: any[]): Promise<void>;
}

export interface Event {
	name: string;
	run: Run;
}
