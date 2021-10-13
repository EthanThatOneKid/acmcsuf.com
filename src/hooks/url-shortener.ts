import { links } from '$lib/constants/links';

export const urlShortener =
	() =>
	async ({ request, resolve }) => {
		const slug = request.path.replace(/^\/+|\/+$/g, '');
		const url = links[slug];
		if (url === undefined) return await resolve(request);
		const message = `Redirecting to ${url}...`;
		return {
			body: message,
			status: 302,
			headers: {
				Location: url,
				'Content-Type': 'text/plain',
				'Content-Length': message.length.toString()
			}
		};
	};
