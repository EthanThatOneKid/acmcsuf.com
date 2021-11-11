import axios from 'axios';
import { config } from 'dotenv';
import { readFileSync, writeFileSync, createWriteStream } from 'fs';

/**
 * Example officer data:
 * ```json
 * {
 *	"name": "Ethan Davidson",
 *	"positions": {
 *		"F20": "Competition Manager",
 *		"S21": "Webmaster",
 *		"F21": "Webmaster"
 *	},
 *	"picture": "ethan-davidson.png"
 * }
 *```
 */
const OFFICERS_FILENAME = './src/lib/constants/officers.json';

/**
 * Converts 'Fall 2021' to 'F21', 'Spring 2022' to 'S22, etc.
 */
const termAbbr = (term) =>
  term === undefined ? null : (term.startsWith('F') ? 'F' : 'S') + term.slice(term.length - 2);

/**
 * Parses the first instance of an image URL from a markdown string.
 */
const parseImgSrcFromMd = (markdown) => {
  // https://regex101.com/r/cSbfvF/3/
  const mdPattern = /!\[[^\]]*\]\((?<filename>.*?)(?="|\))(?<optionalpart>".*")?\)/m;
  let match = mdPattern.exec(markdown);
  if (match !== null) return match.groups.filename;
  // https://stackoverflow.com/a/450117
  const htmlPattern = /src\s*=\s*"(.+?)"/m;
  match = htmlPattern.exec(markdown);
  if (match !== null) return match[1];
  return null;
};

const downloadOfficerImage = async (url, officerName) => {
  const cleanOfficerName = officerName.trim().toLowerCase().replace(/\s/g, '-');
  const filename = `${encodeURIComponent(cleanOfficerName)}.png`;
  const imagePath = `./static/assets/authors/${filename}`;
  const response = await axios({ url, responseType: 'stream' });
  return await new Promise((resolve, reject) =>
    response.data
      .pipe(createWriteStream(imagePath))
      .on('finish', () => resolve(filename))
      .on('error', reject)
  );
};

const updateOfficer = async () => {
  const result = JSON.parse(readFileSync(OFFICERS_FILENAME));
  const {
    ['Officer Name']: name,
    ['Term to Overwrite']: term,
    ['Overwrite Officer Position Title']: title,
    ['Overwrite Officer Picture']: picture,
  } = JSON.parse(process.env.FORM_DATA);
  const isValidName = name?.trim().length > 0 ?? false;
  if (!isValidName) {
    console.error(`received invalid officer name, ${name}`);
    return false;
  }
  const abbreviatedTerm = termAbbr(term);
  if (abbreviatedTerm === null) {
    console.error(`received invalid term, '${term}'`);
    return false;
  }
  let officerIndex = result.findIndex((officer) => officer.name === name);
  if (officerIndex === -1) {
    // officer name not found, so let's create a new officer
    result.push({ name, positions: {} });
    officerIndex = result.length - 1;
  }
  const titleNeedsUpdate = title !== undefined && title.trim().length > 0;
  if (titleNeedsUpdate) {
    if (title === 'DELETE') delete result[officerIndex].positions[abbreviatedTerm];
    else result[officerIndex].positions[abbreviatedTerm] = title.trim();
  }
  const pictureNeedsUpdate = picture !== undefined && picture.trim().length > 0;
  if (pictureNeedsUpdate) {
    const imgSrc = parseImgSrcFromMd(picture);
    if (imgSrc === null) {
      console.error(`received invalid officer picture '${picture}'`);
      return false;
    }
    const relativeImgSrc = await downloadOfficerImage(imgSrc, name);
    if (typeof relativeImgSrc === 'string') result[officerIndex].picture = relativeImgSrc;
  }
  console.log(`${name.trim()}'s updated officer data: `, result[officerIndex]);
  writeFileSync(OFFICERS_FILENAME, JSON.stringify(result, null, 2));
  return true;
};

try {
  config();
  const success = await updateOfficer();
  if (success) process.exit(0);
} catch (error) {
  console.error(error);
}

process.exit(1);
