import { parseBool } from '$lib/server/parse-bool/parse-bool';
import * as env from '$lib/server/env';

export const DEBUG_FLAG_ENABLED = parseBool(env.DEBUG_FLAG_ENABLED);
