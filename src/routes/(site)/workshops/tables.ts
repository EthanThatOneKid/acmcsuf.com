//import { links } from '../../../lib/public/index.ts'; -- Needs allowImportingTsExtensions enabled to import ts vars so I will comment this for now.
import { default as links } from '$lib/public/links/links.json' assert {type: 'json'};

export let wsTables: Tables;
// I dont know if this should be dynamic or not, feel free to comment about this, for now I think I will have it fixed just to get the general structure of workshops up
//  Types for nicer table definition
type semesters = "fa24" | "sp25" | "fa25";
type teams = "ai" | "algo" | "design" | "dev" | "gamedev" | "general" | "icpc" | "nodebuds" | "oss";

// Maps for validation
const semestersMap = ["fa24", "sp25", "fa25"] as const;
const teamsMap = ["ai", "algo", "design", "dev", "gamedev", "general", "icpc", "nodebuds", "oss"] as const;

// Semester shortcut, in the case of f25 -> fa25
const sSc = new Map<string, string>();
sSc.set("s25", "sp26");
sSc.set("f25", "fa25");
sSc.set("s26", "sp26");


// --------------------- Workshop table ---------------------
type Tables = {
	[semester in semesters]: {
		workshops: Workshops
	};
};

type Workshops = {
	[team in teams]: WorkshopInfo[]
}

type WorkshopInfo = {
	name: string,
	team: string,
	semester: string,
	link: string
}

type linkKey = keyof typeof links;
type linkJson = typeof links;
//type Tables = typeof tables;


export var currentTable: Tables = {
	fa24: { workshops: { ai: [], algo: [], design: [], dev: [], gamedev: [], general: [], icpc: [], nodebuds: [], oss: [] } },
	sp25: { workshops: { ai: [], algo: [], design: [], dev: [], gamedev: [], general: [], icpc: [], nodebuds: [], oss: [] } },
	fa25: { workshops: { ai: [], algo: [], design: [], dev: [], gamedev: [], general: [], icpc: [], nodebuds: [], oss: [] } },
}

// ----------------------------------------------------------

// If there is a better way to initalize the table, please feel free to implement it!
export function NewWorkshopTable() {
	let workshopTable = populateTables(links, currentTable)
	workshopTable.then((res) => {
		outputTable(res);
	}).catch(() => {
		console.log("error loading workshop table")
	})
}

function clearTable(table: Tables): Tables {
	for (const key in table) {
		const curSemester = table[key as semesters]
		for (const key2 in curSemester.workshops) {
			const k = key2 as keyof typeof curSemester.workshops;
			curSemester.workshops[k].length = 0;
		}
	}
	return table;
}



//svelte button calls this
export function GetSemester(semester: string): Workshops {
	return currentTable[semester as semesters].workshops

}

//
// Currently these are the formats I am aware of:
// Pattern 1: (team)/(workshop-title)-(semester)
// Pattern 2: (team)/(semester)-(workshop-title)
// Pattern 3: (team)-(workshop-title)-(semester)
//
// (might remove the following comment, its a bit of work to maintain)
// The following are parsed with regex as so:
// 	Pattern 1:
//	 >----(\w)-----v          >-----[\w+-]------v
//	|--------------|   '/'   |------------------|    '-'    |-----|	[A-Za-z]{1,2}   |-----|  \d{2}$  |------------------|
//	| capture team | ------> | capture workshop | --------> |     | --------------> |     | -------> | capture semester |
//	|--------------|	     |------------------|           |-----|         		|-----|          |------------------|
//
//	Pattern 2:
//	 >----(\w)-----v                                                                        >-----[\w+-]------v
//	|--------------|   '/'   |----| [A-Za-z]{2} |-----|  \d{2}  |------------------|  '-'  |------------------|
//	| capture team | ------> |    | ----------> |     | ------> | capture semester | ----> | capture workshop |
//	|--------------|	     |----|       		|-----|         |------------------|       |------------------|
//
//	Pattern 3:
//	 >----(\w)-----v          >-----[\w+-]------v
//	|--------------|   '-'   |------------------|    '-'    |-----|	[A-Za-z]{1, 2}   |-----|  \d{2}$  |------------------|
//	| capture team | ------> | capture workshop | --------> |     | ---------------> |     | -------> | capture semester |
//	|--------------|	     |------------------|           |-----|         		 |-----|          |------------------|
//
//	Key: \w = any letter A-Z, \w+- = any word followed by a dash, \w{2} = two letters, \d{2} = two numbers, $ = end of string
const parseWorkshop = async (key: string, ws: WorkshopInfo): Promise<WorkshopInfo | null> => {

	let match: RegExpMatchArray | null;

	// ------- Pattern 1 -------
	const pattern1regex = /(^\w+)+\/+([\w+-]+)+-([A-Za-z]{1,2}\d{2}$)/

	match = key.match(pattern1regex);
	console.log(key, "| 1 |", match)
	if (match) {
		const name = await getWorkshopTitle(links[key]);

		if ((name) && (name !== "Page Not Found")) {
			ws.name = name;
		} else {
			ws.name = match[2];
		}

		ws.team = match[1] as teams;
		ws.link = links[key];

		var sem = match[3];
		if (sSc.has(sem)) {
			sem = sSc.get(sem)?.replace(/[-]/g, " ") as string;
		}
		ws.semester = sem as semesters;

		if ((!teamsMap.includes(ws.team as teams)) || (!semestersMap.includes(ws.semester as semesters))) {
			return null;
		}
		return ws;
	}


	// ------- Pattern 2 -------
	const pattern2regex = /(^\w+)+\/([A-Za-z]{1,2}\d{2})+-([\w+-]+$)/

	match = key.match(pattern2regex);
	console.log(key, "| 2 |", match)
	if (match) {
		const name = await getWorkshopTitle(links[key]);

		if ((name) && (name !== "Page Not Found")) {
			ws.name = name;
		} else {
			ws.name = match[3];
		}

		ws.team = match[1] as teams;
		ws.link = links[key];

		var sem = match[2];
		if (sSc.has(sem)) {
			sem = sSc.get(sem)?.replace(/[-]/g, " ") as string;
		}
		ws.semester = sem as semesters;

		if ((!teamsMap.includes(ws.team as teams)) || (!semestersMap.includes(ws.semester as semesters))) {
			return null;
		}
		return ws;
	}


	// ------- Pattern 3 -------
	const pattern3regex = /(^\w+)+-([\w+-]+)+-([A-Za-z]{1,2}\d{2}$)/

	match = key.match(pattern3regex);
	console.log(key, "| 3 |", match)
	if (match) {
		const name = await getWorkshopTitle(links[key])
		if ((name) && (name !== "Page Not Found")) {
			ws.name = name;
		} else {
			ws.name = match[2];
		}

		ws.team = match[1] as teams;
		ws.link = links[key];
		var sem = match[3];
		if (sSc.has(sem)) {
			sem = sSc.get(sem)?.replace(/[-]/g, " ") as string;
		}
		ws.semester = sem as semesters;
		if ((!teamsMap.includes(ws.team as teams)) || (!semestersMap.includes(ws.semester as semesters))) {
			return null;
		}
		return ws;
	}

	return null;
};

// Evan pointed out that some workshop names may be inaccurate according to shorter, as an example:
// oss/fa25-1st where the real name is: Open Source Team FA25: First Contributions
const getWorkshopTitle = async (url: string): Promise<string | null> => {
	console.log("Start promise");
	const res = await fetch(url);
	const html = await res.text();

	// Regex to get anything in <title>This page's title</title>. Written with Google slies html title in mind
	const getTitle = /<title>(.*)<\/title>/i;
	const name = html.match(getTitle);

	console.log(name[1]);
	if (name) {
		return name[1].replace(/&amp;/g, "&").replace(/\s*-\sGoogle Slides$/, "");
	} else {
		return null;
	}
}


const populateTables = async (links: linkJson, table: Tables): Promise<Tables> => {
	clearTable(table);

	for (const key in links) {
		const k = key as linkKey;
		var newWorkshop: WorkshopInfo = {
			name: "",
			team: "",
			semester: "",
			link: links[k]
		};


		const result = await parseWorkshop(key, newWorkshop)
		console.log("The table is:", result);
		if (result) {
			if (typeof result == typeof newWorkshop) {
				newWorkshop = result as typeof newWorkshop;
				table[newWorkshop.semester as semesters].workshops[newWorkshop.team as teams].push(newWorkshop)
			}
		}
	}
	return table;
}


function outputTable(table: Tables) {
	console.log(table)
}


