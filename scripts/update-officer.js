import { getNArg } from './common.js';

const updateOfficer = async () => {
  const result = JSON.parse(readFileSync(OFFICERS_FILENAME));
  const report = [];
  const {
    ['Officer Name']: name,
    ['Term to Overwrite']: term,
    ['Overwrite Officer Position Title']: title,
    ['Overwrite Officer Picture']: picture,
  } = JSON.parse(process.env.FORM_DATA);
  const isValidName = name?.trim().length > 0 ?? false;
  if (!isValidName) {
    console.error(`received invalid officer name ${name}`);
    return false;
  }
  const officerIndex = result.findIndex((officer) => officer.name === name);
  const abbreviatedTerm = termAbbr(term);
  if (abbreviatedTerm === null) {
    console.error(`received invalid term, '${term}'`);
    return false;
  }
  if (officerIndex === -1) {
    // officer name not found, so let's create a new officer
    const positions = { [abbreviatedTerm]: title };
    result.push({ name, positions, picture });
    report.push(`Added new officer, ${name}.`);
  } else {
    // officer name found, so let's update the officer
    const titleNeedsUpdate = title !== undefined && title.trim().length > 0;
    const pictureNeedsUpdate = picture !== undefined && picture.trim().length > 0;
    if (titleNeedsUpdate) {
      if (title === 'DELETE') delete result[officerIndex].positions[abbreviatedTerm];
      else result[officerIndex].positions[abbreviatedTerm] = title.trim();
    }
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
  }
  writeFileSync(OFFICERS_FILENAME, JSON.stringify(result, null, 2));
  return true;
};

try {
  const success = await updateOfficer();
  if (success) process.exit(0);
  // eslint-disable-next-line no-empty
} catch (error) {
  console.error(error);
}

process.exit(1);
