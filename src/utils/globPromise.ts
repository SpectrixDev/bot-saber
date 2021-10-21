import { promisify } from "util";
import glob from "glob";

export const globPromise = promisify(glob);
