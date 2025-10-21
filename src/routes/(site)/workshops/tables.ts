// import { links } from '../../../lib/public/index.ts'; -- Needs allowImportingTsExtensions enabled to import ts vars so I will comment this for now.
import { default as links } from '$lib/public/links/links.json' assert {type: 'json'};

// I dont know if this should be dynamic or not, feel free to comment about this, for now I think I will have it fixed just to get the general structure of workshops up
//  Types for nicer table definition
type semesters = "fa24" | "sp25" | "fa25";
type teams = "ai" | "algo" | "design" | "dev" | "gamedev" | "general" | "icpc" | "nodebuds" | "oss";

// Maps for validation
const semestersMap = ["fa24", "sp25", "fa25"] as const;
const teamsMap = ["ai", "algo", "design", "dev", "gamedev", "general", "icpc", "nodebuds", "oss"] as const;

// Semester shortcut, in the case of f25 -> fa25
const sSc = new Map<string, string>();
sSc.set("f24", "fa24");
sSc.set("s25", "sp25");
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

// Our table var that the sevelt will access
export var currentTable: Tables = {
	fa24: { workshops: { ai: [], algo: [], design: [], dev: [], gamedev: [], general: [], icpc: [], nodebuds: [], oss: [] } },
	sp25: { workshops: { ai: [], algo: [], design: [], dev: [], gamedev: [], general: [], icpc: [], nodebuds: [], oss: [] } },
	fa25: { workshops: { ai: [], algo: [], design: [], dev: [], gamedev: [], general: [], icpc: [], nodebuds: [], oss: [] } },
}

// ----------------------------------------------------------




// Clears the table
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





// Evan pointed out that some workshop names may be inaccurate according to shorter, as an example:
// oss/fa25-1st where the real name is: Open Source Team FA25: First Contributions
const getWorkshopTitle = async (url: string): Promise<string | null> => {
	//console.log("Start promise");
	//console.log("Static:", url.includes("/static"));

	return null;
	//
	// Note: No figma or codepen fetches should be made, they are incredibally expensive
	if (url.includes("figma") || url.includes("codepen")) {
		return null;
	}

	const res = await fetch(url);//.replace(/\/static/, ""));
	const html = await res.text();

	// Regex to get anything in <title>This page's title</title>. Written with Google slies html title in mind
	const getTitle = /<title>(.*)<\/title>/i;
	const name = html.match(getTitle);

	if (name) {
		//console.log(name[1]);
		return name[1].replace(/&amp;/g, "&").replace(/\s*-\sGoogle Slides$/, "");
	} else {
		return null;
	}
}



//
// Currently these are the formats I am aware of:
// Pattern 1: (team)/(workshop-title)-(semester)
// Pattern 2: (team)/(semester)-(workshop-title)
// Pattern 3: (team)-(workshop-title)-(semester)
// Pattern 4: (sem)-(team)-(workshop) -- Need to implement
// Pattern 5: (team)-(sem)-(workshop) -- Need to implement
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

const workshopRegexs = [
	/(^\w+)\/([\w+-]+)-([A-Za-z]{1,2}\d{2}$)/,
	/(^\w+)\/([A-Za-z]{1,2}\d{2})-([\w+-]+$)/,
	/(^\w+)-([\w+-]+)-([A-Za-z]{1,2}\d{2}$)/,
	/(^\w+)-([A-Za-z]{1,2}\d{2}$)-([\w+-]+$)/,
	/(^[A-Za-z]{1,2}\d{2}$)-(\w+)-([\w+-]+$)/

]

const parseWorkshop = async (key: string, ws: WorkshopInfo): Promise<WorkshopInfo | null> => {

	return null;
	let match: RegExpMatchArray | null;


	for (const regxp of workshopRegexs) {
		const match = key.match(regxp);
		if (!match) continue;
	

		switch (regxp) {
			case workshopRegexs[0]:
				var name = await getWorkshopTitle(links[key as linkKey]); 

				if ((name) && (name !== "Page Not Found")) {
					ws.name = name;
				} else {
					ws.name = match[2];
				}

				ws.team = match[1] as teams;
				ws.link = links[key as linkKey];

				var sem = match[3];
				if (sSc.has(sem)) {
					// TODO: fix "Advanced Algorithms: Dijkstra&#39;s & A*" <- This
					sem = sSc.get(sem)?.replace(/[-]/g, " ") as string;
				}
				ws.semester = sem as semesters;

				if ((!teamsMap.includes(ws.team as teams)) || (!semestersMap.includes(ws.semester as semesters))) {
					return null;
				}
				return ws;


			case workshopRegexs[1]:
				var name = await getWorkshopTitle(links[key as linkKey]);

				if ((name) && (name !== "Page Not Found")) {
					ws.name = name;
				} else {
					ws.name = match[3];
				}

				ws.team = match[1] as teams;
				ws.link = links[key as linkKey];

				var sem = match[2];
				if (sSc.has(sem)) {
					sem = sSc.get(sem)?.replace(/[-]/g, " ") as string;
				}
				ws.semester = sem as semesters;

				if ((!teamsMap.includes(ws.team as teams)) || (!semestersMap.includes(ws.semester as semesters))) {
					return null;
				}
				return ws;		

			case workshopRegexs[2]:
				var name = await getWorkshopTitle(links[key as linkKey])
				if ((name) && (name !== "Page Not Found")) {
					ws.name = name;
				} else {
					ws.name = match[2];
				}

				ws.team = match[1] as teams;
				ws.link = links[key as linkKey];
				var sem = match[3];
				if (sSc.has(sem)) {
					sem = sSc.get(sem)?.replace(/[-]/g, " ") as string;
				}
				ws.semester = sem as semesters;
				if ((!teamsMap.includes(ws.team as teams)) || (!semestersMap.includes(ws.semester as semesters))) {
					return null;
				}
				return ws;

			case workshopRegexs[3]:
				var name = await getWorkshopTitle(links[key as linkKey])
				if ((name) && (name !== "Page Not Found")) {
					ws.name = name;
				} else {
					ws.name = match[3];
				}

				ws.team = match[1] as teams;
				ws.link = links[key as linkKey];
				var sem = match[2];
				if (sSc.has(sem)) {
					sem = sSc.get(sem)?.replace(/[-]/g, " ") as string;
				}
				ws.semester = sem as semesters;
				if ((!teamsMap.includes(ws.team as teams)) || (!semestersMap.includes(ws.semester as semesters))) {
					return null;
				}
				return ws;

			case workshopRegexs[4]:

				var name = await getWorkshopTitle(links[key as linkKey])
				if ((name) && (name !== "Page Not Found")) {
					ws.name = name;
				} else {
					ws.name = match[3];
				}

				ws.team = match[2] as teams;
				ws.link = links[key as linkKey];
				var sem = match[1];
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
	}
};
// Function to populate the workshop table.
const populateTables = async (links: linkJson, table: Tables): Promise<Tables> => {
	clearTable(table);


	// Make a list of promises and execute them all at the same time, previously with a for loop it took 1:02 minutes to load tables :D
	//  (vs about 2 seconds with await promise all)
	const tasks = Object.keys(links).map(async (key) => {
		const k = key as linkKey;
		var newWorkshop: WorkshopInfo = {
			name: "",
			team: "",
			semester: "",
			link: links[k]
		};


		const result = await parseWorkshop(key, newWorkshop)
		//console.log("The table is:", result);
		if (result) {
			if (typeof result == typeof newWorkshop) {
				newWorkshop = result as typeof newWorkshop;
				table[newWorkshop.semester as semesters].workshops[newWorkshop.team as teams].push(newWorkshop)
			}
		}
	});

	await Promise.all(tasks);
	return table;
}
// log table
function outputTable(table: Tables) {
	console.log(table)
}

export const NewWorkshopTable = async () => {
	console.log("Starting tables");
	return await populateTables(links, currentTable);
};
