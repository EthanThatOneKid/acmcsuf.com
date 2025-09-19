//import { links } from '../../../lib/public/index.ts'; -- Needs allowImportingTsExtensions enabled to import ts vars so I will comment this for now.
import { default as links } from '$lib/public/links/links.json' assert {type: 'json'};

// I dont know if this should be dynamic or not, feel free to comment about this, for now I think I will have it fixed just to get the general structure of workshops up
type semesters = "fa24" | "sp25" | "fa25";
type teams = "ai" | "algo" | "design" | "dev" | "gamedev" | "general" | "icpc" | "nodebud" | "oss"

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


var currentTable: Tables = {
	fa24: { workshops: { ai: [], algo: [], design: [], dev: [], gamedev: [], general: [], icpc: [], nodebud: [], oss: [] } },
	sp25: { workshops: { ai: [], algo: [], design: [], dev: [], gamedev: [], general: [], icpc: [], nodebud: [], oss: [] } },
	fa25: { workshops: { ai: [], algo: [], design: [], dev: [], gamedev: [], general: [], icpc: [], nodebud: [], oss: [] } },
}


function NewWorkshopTable() {
	populateTables(links, currentTable)
}

function clearTable(table: Tables): void {
	for (const key in table) {
		const curSemester = table[key as semesters]
		for (const key2 in curSemester.workshops) {
			const k = key2 as keyof typeof curSemester.workshops;
			curSemester.workshops[k].length = 0;
		}
	}
}

function populateTables(links: linkJson, table: Tables): Tables {
	clearTable(table)

	for (const key in links) {
		const k = key as linkKey;
		var newWorkshop: WorkshopInfo = {
			name: "",
			team: "",
			semester: "",
			link: links[k]
		};


		const result = parseWorkshop(key, newWorkshop)
		if (typeof result == typeof newWorkshop) {
			newWorkshop = result as typeof newWorkshop;
			table[newWorkshop.semester as semesters].workshops[newWorkshop.team as teams].push(newWorkshop)
		}
	}

	return table
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
// The following are parsed with regex as so: 
// 	Pattern 1:
//	 >----(\w)-----v          >-----[\w+-]------v                       
//	|--------------|   '/'   |------------------|    '-'    |-----|	\w{2}   |-----|  \d{2}$  |------------------|
//	| capture team | ------> | capture workshop | --------> |     | ------> |     | -------> | capture semester |
//	|--------------|	     |------------------|           |-----|         |-----|          |------------------|
//
//	Pattern 2:
//	 >----(\w)-----v                                                                  >-----[\w+-]------v
//	|--------------|   '/'   |----| \w{2} |-----|  \d{2}  |------------------|  '-'  |------------------|
//	| capture team | ------> |    | ----> |     | ------> | capture semester | ----> | capture workshop | 
//	|--------------|	     |----|       |-----|         |------------------|       |------------------|
//
//	Pattern 3:
//	 >----(\w)-----v          >-----[\w+-]------v                       
//	|--------------|   '-'   |------------------|    '-'    |-----|	\w{2}   |-----|  \d{2}$  |------------------|
//	| capture team | ------> | capture workshop | --------> |     | ------> |     | -------> | capture semester |
//	|--------------|	     |------------------|           |-----|         |-----|          |------------------|
function parseWorkshop(key: string, ws: WorkshopInfo): WorkshopInfo | null {
	// p shorthand for pattern

	const format1regex = '(^\w+)+\/+([\w+-]+)+-(\w{2}\d{2}$)'
	const p1 = new RegExp(format1regex)

	const format2regex = '(^\w+)+\/(\w{2}\d{2})+-([\w+-]+$)'
	const p2 = new RegExp(format2regex)

	const format3regex = '(^\w+)+-([\w+-]+)+-(\w{2}\d{2}$)'
	const p3 = new RegExp(format3regex)

	return null
}



