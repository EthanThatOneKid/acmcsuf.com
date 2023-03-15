import * as fs from 'node:fs/promises';

const ALLOWED_MEDIA_DOMAINS = ["cdn.discordapp.com", "i.imgur.com"];

/**
 * @param {{pins: any;channel_names: {[x: string]: string;};}} data
 * @param {number} [year]
 */
export function getMediaFromPins(data, year){
  const out = [];
  for (const pin of data.pins) {

    const validURLs = getURLs(pin.text, ALLOWED_MEDIA_DOMAINS);
    //console.log({validURLs});
    if (!pin.attachments && validURLs.length == 0) {
      continue;
    }

    const attachment = pin.attachments[0];
    if (!attachment && validURLs.length == 0) {
      continue;
    }

    const src = (attachment ? attachment.proxy_url : validURLs[0]) || null;
    //console.log({src});
    const alt = data.channel_names[pin.channel_id] || '';
    if (!/^(\d+) /.test(alt)) {
      continue;
    }

    let view = 'normal';

    out.push({
      src,
      alt,
      view,
      during_challenge: pin.timestamp.startsWith(`${year}-01-`),
    });
    //console.log({out});
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
  const regex = /(https?:\/\/[^\s]+)/g; // Regular expression to match URLs
  const urls = str.match(regex) || []; // Extract URLs from the string

  return urls.filter(url => { // Filter the list of URLs
    const matches = url.match(/https?:\/\/([^/]+)/);
    //console.log({matches});
    if (matches == null || matches.length <= 1){
      return false;
    }
    const domain = matches[1]; // Extract the domain from the URL
    return validDomains.indexOf(domain) !== -1; // Return true if the domain is in the list of valid domains
  });
}

