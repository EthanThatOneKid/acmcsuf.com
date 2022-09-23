import { build, files, version } from '$service-worker';

export const CURRENT_CACHE_NAME = 'acmcsuf-' + version;
export const BUILD_FILES = build.concat(files);
