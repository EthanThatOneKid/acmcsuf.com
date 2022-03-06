import axios from 'axios';
import { config } from 'dotenv';
import { readFileSync, writeFileSync, createWriteStream } from 'fs';

/**
 * Example officer data:
 * ```json
 * {
 *	"fullName": "Ethan Davidson",
 *  "picture": "ethan-davidson.png",
 *	"positions": {
 *		"F20": { title: "Competition Manager", tier: Tier.GeneralBoard },
 *		"S21": { title: "Webmaster", tier: Tier.GeneralBoard },
 *		"F21": { title: "Webmaster", tier: Tier.GeneralBoard }
 *	}
 * }
 * ```
 */
const OFFICERS_FILENAME = './src/lib/constants/officers.json';

/**
 * Converts 'Fall 2021' to 'F21', 'Spring 2022' to 'S22, etc.
 */
function termAbbr(term) {
  return term === undefined
    ? null
    : (term.startsWith('F') ? 'F' : 'S') + term.slice(term.length - 2);
}

/**
 * Parses the first instance of an image URL from a markdown string.
 */
function parseImgSrcFromMd(markdown) {
  // https://regex101.com/r/cSbfvF/3/
  const mdPattern = /!\[[^\]]*\]\((?<filename>.*?)(?="|\))(?<optionalpart>".*")?\)/m;
  let match = mdPattern.exec(markdown);
  if (match !== null) return match.groups.filename;

  // https://stackoverflow.com/a/450117
  const htmlPattern = /src\s*=\s*"(.+?)"/m;
  match = htmlPattern.exec(markdown);
  if (match !== null) return match[1];
  return null;
}

async function downloadOfficerImage(url, officerName) {
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
}

async function updateOfficer() {
  const TIERS_JSON = JSON.parse(readFileSync('./src/lib/constants/tiers.json'));
  const result = JSON.parse(readFileSync(OFFICERS_FILENAME));

  const {
    ['Officer Name']: fullName,
    ['Term to Overwrite']: term,
    ['Overwrite Officer Position Title']: title,
    ['Overwrite Officer Position Tier']: rawTier,
    ['Overwrite Officer GitHub Username']: displayName,
    ['Overwrite Officer Picture']: picture,
  } = JSON.parse(process.env.FORM_DATA);

  const isValidFullName = fullName?.trim().length > 0 ?? false;
  if (!isValidFullName) {
    console.error(`received invalid officer name, ${fullName}`);
    return false;
  }

  let officerIndex = result.findIndex((officer) => officer.fullName === fullName);
  if (officerIndex === -1) {
    // officer fullName not found, so let's create a new officer
    result.push({ fullName, positions: {} });
    officerIndex = result.length - 1;
  }

  const abbreviatedTerm = termAbbr(term);
  const titleNeedsUpdate = title !== undefined && title.trim().length > 0;
  if (titleNeedsUpdate) {
    if (abbreviatedTerm === null) {
      console.error(`received invalid term, '${term}'`);
      return false;
    }

    if (title === 'DELETE') {
      delete result[officerIndex].positions[abbreviatedTerm];
    } else {
      result[officerIndex].positions[abbreviatedTerm].title = title.trim();
    }
  }

  const tierValue = TIERS_JSON.indexOf(rawTier);
  if (tierValue !== -1 && term.trim().length > 0 && title !== 'DELETE') {
    result[officerIndex].positions[abbreviatedTerm].tier = tierValue;
  }

  const displayNameNeedsUpdate = displayName !== undefined && displayName.trim().length > 0;
  if (displayNameNeedsUpdate) {
    result[officerIndex].displayName = displayName.trim();
  }

  const pictureNeedsUpdate = picture !== undefined && picture.trim().length > 0;
  if (pictureNeedsUpdate) {
    const imgSrc = parseImgSrcFromMd(picture);
    if (imgSrc === null) {
      console.error(`received invalid officer picture '${picture}'`);
      return false;
    }
    const relativeImgSrc = await downloadOfficerImage(imgSrc, fullName);
    if (typeof relativeImgSrc === 'string') result[officerIndex].picture = relativeImgSrc;
  }

  console.log(`${fullName.trim()}'s updated officer data: `, result[officerIndex]);

  // Do not forget to make our linter happy by adding a new line at the end of the generated file
  writeFileSync(OFFICERS_FILENAME, JSON.stringify(result, null, 2) + '\n');
  return true;
}

try {
  config();
  const success = await updateOfficer();
  if (success) process.exit(0);
} catch (error) {
  console.error(error);
}

process.exit(1);
