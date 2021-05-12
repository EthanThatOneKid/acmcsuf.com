import { links } from "./links";

export const urlShortener = () => (req, res, next) => {
  const slug = req.path.slice(1);
  if (links.hasOwnProperty(slug)) {
    const url = links[slug],
      message = `Redirecting to ${url}...`;
    res.writeHead(302, {
      Location: url,
      'Content-Type': "text/plain",
      'Content-Length': message.length
    });
    res.end(message);
  }
  next();
};