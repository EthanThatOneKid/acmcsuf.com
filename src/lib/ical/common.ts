import RRule from 'rrule';

interface IcalOutput {
	[key: string]: string | string[] | IcalOutput[];
}

const cleanIcalKey = (key: string): string => {
	if (key.startsWith('DTSTART')) return 'DTSTART';
	if (key.startsWith('DTEND')) return 'DTEND';
	return key;
};

/**
 * The code in this function is derived from
 * https://github.com/adrianlee44/ical2json.
 * @param source The raw calendar data in ICAL format.
 * @returns The parsed ICAL data.
 */
export const parseRawIcal = (source: string): IcalOutput => {
	const output: IcalOutput = {};
	const lines = source.split(/\r\n|\n|\r/);
	const parents: IcalOutput[] = [];
	let parent: IcalOutput = {};
	let current: IcalOutput = output;
	let currentKey = '';

	for (const line of lines) {
		let currentValue = '';
		if (line.charAt(0) === ' ') {
			current[currentKey] += line.substr(1);
		} else {
			const splitAt = line.indexOf(':');
			if (splitAt < 0) {
				continue;
			}
			currentKey = cleanIcalKey(line.substr(0, splitAt));
			currentValue = line.substr(splitAt + 1);
			switch (currentKey) {
				case 'BEGIN':
					parents.push(parent);
					parent = current;
					if (parent[currentValue] == null) {
						parent[currentValue] = [];
					}
					// Create a new object, store the reference for future uses.
					current = {};
					(parent[currentValue] as IcalOutput[]).push(current);
					break;
				case 'END':
					current = parent;
					parent = parents.pop() as IcalOutput;
					break;
				default:
					if (current[currentKey]) {
						if (!Array.isArray(current[currentKey])) {
							current[currentKey] = [current[currentKey]] as string[];
						}
						(current[currentKey] as string[]).push(currentValue);
					} else {
						(current[currentKey] as string) = currentValue;
					}
			}
		}
	}

	return output;
};

const parseRawIcalDatetime = (datetime: string) => {
	const fullYear = datetime.slice(0, 4),
		month = datetime.slice(4, 6),
		day = datetime.slice(6, 8),
		hours = datetime.slice(9, 11),
		minutes = datetime.slice(11, 13),
		seconds = datetime.slice(13, 15),
		date = new Date();
	date.setFullYear(Number(fullYear), Number(month) - 1, Number(day));
	date.setHours(Number(hours) - 7, Number(minutes), Number(seconds));
	return date;
};

export const computeIcalDatetime = (event: any) => {
	const rawDatetime = event['DTSTART'];
	const rawRrule = event['RRULE'];
	if (rawRrule !== undefined) {
		try {
			const ruleSrc = `DTSTART:${rawDatetime}Z\nRRULE:${rawRrule}`;
			const recurrence = RRule.fromString(ruleSrc);
			const date = recurrence.after(new Date());
			date.setHours(date.getHours());
			return date;
		} catch {}
	}
	return parseRawIcalDatetime(rawDatetime);
};

export const slugifyEvent = (summary: string, month: string, day: number): string => {
	const cleanedSummary = summary.replace(/[^\w\s\_]/g, '').replace(/(\s|\-|\_)+/g, '-');
	const slug = [cleanedSummary, month, day].join('-').toLowerCase();
	return slug;
};

export const formatRecurrence = (raw?: string): string | undefined => {
	if (raw === undefined) return;
	try {
		const recurrence = RRule.fromString(raw);
		if (recurrence.isFullyConvertibleToText) {
			return recurrence.toText();
		}
	} catch {}
};

export const parseDescription = (content: string): Record<string, string> => {
	const result = {};
	for (const line of content.split('\n')) {
		const [key, value] = line.split('=');
		result[key.trim()] = value;
	}
	return result;
};

export const sortByDate = () => {
	return ({ date: date1 }, { date: date2 }) => (date1.valueOf() > date2.valueOf() ? 1 : -1);
};

export const filterIfPassed = (now: number, offset: number = 0) => {
	return ({ date }: { date: Date }) => date.valueOf() + offset > now;
};
