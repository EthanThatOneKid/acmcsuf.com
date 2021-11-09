import axios from 'axios';
import { readFileSync, writeFileSync, createWriteStream } from 'fs';
import { getNArg } from './common.js';

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
const termAbbr = (term) => (term.startsWith('F') ? 'F' : 'S') + term.slice(term.length - 2);

/**
 * Parses the first instance of an image URL from a markdown string.
 */
const parseImgSrcFromMd = (markdown) => {
  const pattern = /!\[[^\]]*\]\((?<filename>.*?)(?="|\))(?<optionalpart>".*")?\)/i; // https://regex101.com/r/cSbfvF/3/
  const match = pattern.exec(markdown);
  if (match !== null) {
    const {
      groups: [src],
    } = match;
    return src;
  }
  return null;
};

const downloadOfficerImage = async (url, officerName) => {
  const cleanOfficerName = officerName.trim().toLowerCase().replace(/\s/g, '-');
  const filename = `./static/assets/authors/${encodeURIComponent(cleanOfficerName)}.png`;
  const response = axios({ url, responseType: 'stream' });
  return await new Promise((resolve, reject) => {
    response.data
      .pipe(createWriteStream(filename))
      .on('finish', () => resolve(filename))
      .on('error', reject);
  });
};

const updateOfficer = async () => {
  const result = JSON.parse(readFileSync(OFFICERS_FILENAME));
  const {
    ['Officer Name']: name,
    ['Term to Overwrite']: term,
    ['Overwrite Officer Position Title']: title,
    ['Overwrite Officer Picture']: picture,
  } = JSON.parse(process.argv.slice(2).join(' '));
  const isValidName = name?.trim().length > 0 ?? false;
  if (!isValidName) {
    console.error(`Received invalid officer name ${name}.`);
    return false;
  }
  const officerIndex = result.findIndex((officer) => officer.name === name);
  const abbreviatedTerm = termAbbr(term);
  if (officerIndex === -1) {
    // officer name not found, so let's create a new officer
    const positions = { [abbreviatedTerm]: title };
    result.push({ name, positions, picture });
  } else {
    // officer name found, so let's update the officer
    const titleNeedsUpdate = title !== undefined && title.trim().length > 0;
    const pictureNeedsUpdate = picture !== undefined && picture.trim().length > 0;
    if (titleNeedsUpdate) result[officerIndex].positions[abbreviatedTerm] = title;
    if (pictureNeedsUpdate) {
      const imgSrc = parseImgSrcFromMd(picture);
      if (imgSrc === null) {
        console.error(`Received invalid officer picture ${picture}.`);
        return false;
      }
      const imagePath = await downloadOfficerImage(imgSrc, name);
      if (typeof imagePath === 'string') result[officerIndex].picture = picture;
    }
  }
  writeFileSync(OFFICERS_FILENAME, JSON.stringify(result, null, 2));
};

try {
  const success = await updateOfficer();
  if (success) process.exit(0);
  // eslint-disable-next-line no-empty
} catch (error) {
  console.error(error);
}

process.exit(1);
