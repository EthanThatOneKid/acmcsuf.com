const ALLOWED_MEDIA_DOMAINS = ['cdn.discordapp.com', 'i.imgur.com'];

/**
 * @param {object} mediaIn Media data
 */
export function serializeMedia(mediaIn) {
  return JSON.stringify(mediaIn, null, 2);
}

/**
 * @param {{pins: any;channel_names: {[x: string]: string;};}} data
 * @param {number} year
 */
export function getMediaFromPins(data, year) {
  const out = [];
  for (const pin of data.pins) {
    const timestamp = new Date(pin.timestamp);
    if (timestamp.getFullYear() !== year) {
      continue;
    }

    const validURLs = getURLs(pin.text, ALLOWED_MEDIA_DOMAINS);
    if (!pin.attachments && validURLs.length === 0) {
      continue;
    }

    const attachment = pin.attachments[0];
    if (!attachment && validURLs.length === 0) {
      continue;
    }

    const src = ((attachment ? attachment.proxy_url : validURLs[0]) || null)?.replace(/\?.*$/, '');
    const alt = data.channel_names[pin.channel_id] || '';
    if (!/^(\d+) /.test(alt)) {
      continue;
    }

    const view = 'normal';
    out.push({ src, alt, view });
  }

  out.sort((a, b) => {
    const na = a.alt.match(/^(\d+) /);
    const nb = b.alt.match(/^(\d+) /);
    return parseInt(na) - parseInt(nb);
  });

  return out;
}

/**
 * @param {string} str
 * @param {string[]} validDomains
 */
function getURLs(str, validDomains) {
  // Regular expression to match URLs.
  const regex = /(https?:\/\/[^\s]+)/g;
  // Extract URLs from the string.
  const urls = str.match(regex) || [];

  // Filter the list of URLs.
  return urls.filter((url) => {
    const matches = url.match(/https?:\/\/([^/]+)/);
    if (matches == null || matches.length <= 1) {
      return false;
    }

    const domain = matches[1]; // Extract the domain from the URL
    return validDomains.indexOf(domain) !== -1; // Return true if the domain is in the list of valid domains
  });
}
