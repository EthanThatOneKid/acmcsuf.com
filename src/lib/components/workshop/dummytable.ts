
// Tables v2
//
//
// NOTE : THIS WILL BE UPDATED MANUALLY UNTIL WE HAVE A WAY TO DO IT DYNAMICALLY, MOST LIKELY THROUGH BOT
//
import { default as links } from '$lib/public/links/links.json' assert {type: 'json'};
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
	[team in teams]: {
		workshops: Workshops
	};
};

type Workshops = {
	[sem in semesters]: WorkshopInfo[]
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
	ai: {
		workshops: {
			fa24: [
				{ name: "Intro to AI", team: "ai", semester: "fa24", link: "https://example.com/ai1" },
				{ name: "ML Basics", team: "ai", semester: "fa24", link: "https://example.com/ai2" },
				{ name: "Neural Networks 101", team: "ai", semester: "fa24", link: "https://example.com/ai3" }
			],
			sp25: [
				{ name: "Advanced AI", team: "ai", semester: "sp25", link: "https://example.com/ai4" },
				{ name: "Reinforcement Learning", team: "ai", semester: "sp25", link: "https://example.com/ai5" }
			],
			fa25: [
				{ name: "AI Ethics", team: "ai", semester: "fa25", link: "https://example.com/ai6" },
				{ name: "Generative AI Workshop", team: "ai", semester: "fa25", link: "https://example.com/ai7" }
			]
		}
	},
	algo: {
		workshops: {
			fa24: [
				{ name: "Sorting Algorithms", team: "algo", semester: "fa24", link: "https://example.com/algo1" },
				{ name: "Graph Theory Basics", team: "algo", semester: "fa24", link: "https://example.com/algo2" }
			],
			sp25: [
				{ name: "Dynamic Programming", team: "algo", semester: "sp25", link: "https://example.com/algo3" },
				{ name: "Advanced Graphs", team: "algo", semester: "sp25", link: "https://example.com/algo4" }
			],
			fa25: [
				{ name: "Algorithm Optimization", team: "algo", semester: "fa25", link: "https://example.com/algo5" }
			]
		}
	},
	design: {
		workshops: {
			fa24: [
				{ name: "UI/UX Fundamentals", team: "design", semester: "fa24", link: "https://example.com/design1" },
				{ name: "Color Theory", team: "design", semester: "fa24", link: "https://example.com/design2" }
			],
			sp25: [
				{ name: "Responsive Design", team: "design", semester: "sp25", link: "https://example.com/design3" },
				{ name: "Prototyping Workshop", team: "design", semester: "sp25", link: "https://example.com/design4" }
			],
			fa25: [
				{ name: "Advanced UX Patterns", team: "design", semester: "fa25", link: "https://example.com/design5" }
			]
		}
	},
	dev: {
		workshops: {
			fa24: [
				{ name: "Intro to Web Dev", team: "dev", semester: "fa24", link: "https://example.com/dev1" },
				{ name: "Backend Basics", team: "dev", semester: "fa24", link: "https://example.com/dev2" }
			],
			sp25: [
				{ name: "API Development", team: "dev", semester: "sp25", link: "https://example.com/dev3" },
				{ name: "Fullstack Workshop", team: "dev", semester: "sp25", link: "https://example.com/dev4" }
			],
			fa25: [
				{ name: "Microservices", team: "dev", semester: "fa25", link: "https://example.com/dev5" }
			]
		}
	},
	gamedev: {
		workshops: {
			fa24: [
				{ name: "Intro to Game Dev", team: "gamedev", semester: "fa24", link: "https://example.com/game1" },
				{ name: "Unity Basics", team: "gamedev", semester: "fa24", link: "https://example.com/game2" }
			],
			sp25: [
				{ name: "Game Mechanics", team: "gamedev", semester: "sp25", link: "https://example.com/game3" },
				{ name: "Level Design Workshop", team: "gamedev", semester: "sp25", link: "https://example.com/game4" }
			],
			fa25: [
				{ name: "Advanced Game Physics", team: "gamedev", semester: "fa25", link: "https://example.com/game5" }
			]
		}
	},
	general: {
		workshops: {
			fa24: [
				{ name: "Time Management", team: "general", semester: "fa24", link: "https://example.com/gen1" }
			],
			sp25: [
				{ name: "Career Prep", team: "general", semester: "sp25", link: "https://example.com/gen2" }
			],
			fa25: [
				{ name: "Networking Basics", team: "general", semester: "fa25", link: "https://example.com/gen3" }
			]
		}
	},
	icpc: {
		workshops: {
			fa24: [
				{ name: "ICPC Prep 101", team: "icpc", semester: "fa24", link: "https://example.com/icpc1" }
			],
			sp25: [
				{ name: "Contest Strategies", team: "icpc", semester: "sp25", link: "https://example.com/icpc2" }
			],
			fa25: [
				{ name: "Advanced ICPC", team: "icpc", semester: "fa25", link: "https://example.com/icpc3" }
			]
		}
	},
	nodebuds: {
		workshops: {
			fa24: [
				{ name: "Node.js Basics", team: "nodebuds", semester: "fa24", link: "https://example.com/node1" }
			],
			sp25: [
				{ name: "Async Programming", team: "nodebuds", semester: "sp25", link: "https://example.com/node2" }
			],
			fa25: [
				{ name: "Node.js Advanced", team: "nodebuds", semester: "fa25", link: "https://example.com/node3" }
			]
		}
	},
	oss: {
		workshops: {
			fa24: [
				{ name: "Open Source 101", team: "oss", semester: "fa24", link: "https://example.com/oss1" }
			],
			sp25: [
				{ name: "Contributing to OSS", team: "oss", semester: "sp25", link: "https://example.com/oss2" }
			],
			fa25: [
				{ name: "Advanced OSS Projects", team: "oss", semester: "fa25", link: "https://example.com/oss3" }
			]
		}
	}
};

// ----------------------------------------------------------


export const NewWorkshopTable = async () => {
	return currentTable;
};
