import { cacheRequest } from '../common';

export function fromNetwork(request: Request, timeout: number): Promise<Response> {
  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);

    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
      cacheRequest(request);
    }, reject);
  });
}
