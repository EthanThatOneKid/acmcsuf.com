export type semesters = 'fa24' | 'sp25' | 'fa25';
export type teams =
	| 'ai'
	| 'algo'
	| 'design'
	| 'dev'
	| 'gamedev'
	| 'general'
	| 'icpc'
	| 'nodebuds'
	| 'oss';

// Semester shortcut, in the case of f25 -> fa25
const sSc = new Map<string, string>();
sSc.set('f24', 'fa24');
sSc.set('s25', 'sp25');
sSc.set('f25', 'fa25');
sSc.set('s26', 'sp26');

// --------------------- Workshop table ---------------------
type Tables = {
	[team in teams]: {
		workshops: Workshops;
	};
};

type Workshops = {
	[sem in semesters]: WorkshopInfo[];
};

export interface WorkshopInfo {
	name: string;
	team: string;
	semester: string;
	link: string;
}
export const currentTable: Tables = {
	ai: {
		workshops: {
			fa24: [
				{ name: "02 - Introduction to Python/Pandas/Numpy", team: "ai", semester: "fa24", link: "https://docs.google.com/presentation/d/19iyqMQNPsWXJ1_LByp1Aotdy5tMQRt2dJ8g3EQeGSRI/edit?usp=sharing" },
				{ name: "05 - Computer Vision", team: "ai", semester: "fa24", link: "https://docs.google.com/presentation/d/1_fEYv_TytZh4vwP6HKg6EntzeZhNF-X4hKfNGHCxaK8/edit#slide=id.p" },
				{ name: "07 - Transformers", team: "ai", semester: "fa24", link: "https://docs.google.com/presentation/d/1keGME0Qi8CxorlDVcHzrAqbJJ6y7TIr2AygQ2IYPJNA/edit?usp=sharing" },
				{ name: "03 - Introduction to Machine Learning w/ Linear Regression", team: "ai", semester: "fa24", link: "https://docs.google.com/presentation/d/1phD7eXvjZYXAY-zvnkyvVjZwEtzzDmnx54ZgDUyPsUc/edit?usp=sharing" },
				{ name: "06 - Natural Language Processing", team: "ai", semester: "fa24", link: "https://docs.google.com/presentation/d/1CXPX3eTmAoj7dxEtqwH5P5ckGYqxBMblSIbvGydN2aE/edit?usp=sharing" },
				{ name: "01 - ACM AI Kickoff", team: "ai", semester: "fa24", link: "https://docs.google.com/presentation/d/1wqw6GOgbKjF28lrtxFULWAdKe4kEhBiC0YPPAe3YDY0/edit?usp=sharing" },
			],
			sp25: [
				{ name: "Talk", team: "ai", semester: "sp25", link: "https://forms.gle/FNjJGrBDYTYyjL2G9" },
				{ name: "04 - Starting an AI Project", team: "ai", semester: "sp25", link: "https://docs.google.com/presentation/d/1D0rq29GBlhcV36jqTArB5y91a1sbe__FuTCt1xq9Hlg/edit?usp=sharing" },
				{ name: "05 - Neural Networks and Applications", team: "ai", semester: "sp25", link: "https://docs.google.com/presentation/d/1jYHyoTKUhEkoIyE1n2amIIMRI9NORScfwIVWoZfKU98/edit?usp=sharing" },
				{ name: "03 - Machine Learning", team: "ai", semester: "sp25", link: "https://docs.google.com/presentation/d/1-Xc-kjA8W_OMZLlk_xfQ77QbiW9jrF2Sv_UVIY3sDCE/edit?usp=sharing" },
				{ name: "01 - INTRO TO DATA SCIENCE ACM AI & DSML COLLABORATION", team: "ai", semester: "sp25", link: "https://docs.google.com/presentation/d/1viX52qvBGIAgLuFWaV5mKPWoOTexzrMb01LL-ruY8L4/edit?usp=sharing" },
				{ name: "07 - AI Integration", team: "ai", semester: "sp25", link: "https://docs.google.com/presentation/d/1PDRv5N6aEevOyOBlXZcYR7n5tmPkd7R1qc01qTgG294/edit?usp=sharing" },
				{ name: "06 - Project Work Session", team: "ai", semester: "sp25", link: "https://docs.google.com/presentation/d/1JuuwVceAqdG5VOKvgsMf01ZzsI6ro_nNR4-HsmXm0i8/edit?usp=sharing" },
			],
			fa25: [
				{ name: "Schedule", team: "ai", semester: "fa25", link: "https://docs.google.com/document/d/10_wRMQRA6H-kZaWf3rbA27fL6Y3D80PHefeEAaEc-Xo/edit?usp=drivesdk" },
				{ name: "THINKING WITH DATA", team: "ai", semester: "fa25", link: "https://docs.google.com/presentation/d/1kABI7a0ZISbqYz1xmh4S9qb-GmAs7uNVyHcjvpVwNLE/edit?usp=sharing" },
				{ name: "acmAI:Intro", team: "ai", semester: "fa25", link: "https://docs.google.com/presentation/d/1KorWYI2a5W4GXTYOYFldl2xbdVysv5m3_rA-I-h9jDU/edit?usp=drivesdk" },
				{ name: "acmAI: Voice AI & Generative Audio", team: "ai", semester: "fa25", link: "https://docs.google.com/presentation/d/1YeiP77koOZa2moy8Fjaz74tOjsEnQlWHOu3U_9tPR40/edit?usp=sharing" },
				{ name: "02 - Model Showdown", team: "ai", semester: "fa25", link: "https://docs.google.com/presentation/d/18lXQFHqzVjcLjy8s-l-nPcBR14TufBN8zWe7185uUKQ/edit?usp=drivesdk" },
				{ name: "acmAI: AI Startups", team: "ai", semester: "fa25", link: "https://docs.google.com/presentation/d/1R9Y2l1qlA4ScCU2cbiHoAP7pmjX9p2Een9bCMjL3Kfw/edit" },
			]
		}
	},
	algo: {
		workshops: {
			fa24: [
				{ name: "Applied Data Structures: Hashmaps", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1eLu6zFkYsa18JFnXfBe92oK54IxZDhcaGaAWcuDOGrc/edit?usp=sharing" },
				{ name: "FA24 Applied Data Structures: Stacks & Queues", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1FNWAyqSei-bfM2LPN8scvvVVBe3riziQCyUzpeiMze8/edit#slide=id.p" },
				{ name: "Advanced Algorithms: Dijkstra's & A*", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1wTspbXyNi94gWRFzWpcGwI-Ei4FOrK_0_Nr6r3z8Fe8/edit?usp=sharing" },
				{ name: "FA24 Applied Data Structures: Arrays & Vectors", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1_v7PEioT_s0g4JC4LQgPTOnpZXGexXaXhJ49zr3kk7k/edit?usp=sharing" },
				{ name: "Advanced Algorithms: Dynamic Programming", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1PF-xzmvYVANoAubbXT5-ASlgjVJ772vjthF_5DO800Q/edit?usp=sharing" },
				{ name: "Advanced Algorithms: Binary Search & Sorting", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/11K9_fYRUqwTppUtV7JK5dVoua062Ll3XAfGsp-d1sKg/edit?usp=sharing" },
				{ name: "Interview Prep #2", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1Mg3feaeV0Os3Bz9BER3CLADPDLBMQMHLHrDN9Borxjk/edit?usp=sharing" },
				{ name: "Time & Space Complexity", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1XmRI1EY8FEuv-gqu8Y5zpmmGy-uJRgHitJXAA6d3rP0/edit?usp=sharing" },
				{ name: "Applied Data Structures: Graphs", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1AsfDASVwaHlxlgMLwROA--zRk55RmRvDcH6859NkiEc/edit?usp=sharing" },
				{ name: "Interview Prep #1", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1Zioga6nfHve6K73fnik-eimiHgDaz8VBAqz3mY8A_7o/edit?usp=sharing" },
				{ name: "Advanced Algorithms: DFS & BFS", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1Q9Hwgs-lMCZrKQ2jJvVxerZ96D38LVABo8hiPboY3hQ/edit?usp=sharing" },
				{ name: "Applied Data Structures: Trees", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1yGqpRcTU0SggsKgUH4dEwv5uxKAkDLCkdEEBY0Sb26o/edit?usp=sharing" },
				{ name: "Advanced Algorithms: Recursion", team: "algo", semester: "fa24", link: "https://docs.google.com/presentation/d/1XRUdjytRTliew1I_pqvx0_5v1otrJWT1s1hrjaCQjeE/edit?usp=sharing" },
			],
			sp25: [
				{ name: "SP25 Applied Data Structures: Graphs", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1jcQx1xIdfE9TJPUyhoN6QqYVY8DJSjsiBILq1uL6vpM/edit?usp=sharing" },
				{ name: "SP25 Advanced Algorithms: 2D Dynamic Programming", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/17kOeZmYa3AijP-ZRKDsyn_nW-KEZgBS_VC-oeBv6rFI/edit?usp=sharing" },
				{ name: "SP25 Advanced Algorithms: Topological Sort", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1BN4dzq1W4vdtKHx9QMO44tfJ-kEqUJRADu3pRpwCwi0/edit?usp=sharing" },
				{ name: "SP25 Applied Data Structures: Stacks & Queues", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1LymrMdwK4_FtFfVvAGvMR2nguKtMXHWXRYJ-uZTw1iM/edit?usp=sharing" },
				{ name: "SP25 Applied Data Structures: Hashmaps", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1U_sq2eTrUlC201QZJEQajpfqjWpgKVstT-iD20Brlsk/edit?usp=sharing" },
				{ name: "SP25 Applied Data Structures: Arrays & Vectors", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/19xNgFtfQVqn9pMndj6B_SE8_9hI-qFZeDdVY6T-9S2o/edit?usp=sharing" },
				{ name: "SP25 Applied Data Structures: Linked Lists", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1Mn-d204KhCBNFMZW5UUxcZtE6lTXKNH-rgEKbxl9ZHc/edit?usp=sharing" },
				{ name: "SP25 Advanced Algorithms: Trie", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1sGGJHbxMlC8FKBxw7s--IuaegMXgYl-i54WfU64J_BY/edit?usp=drivesdk" },
				{ name: "Algo Kickoff SP25", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1EfdIcjDT5T6C722pdAPh9XpESzkgjiux28GMVXN_ZvM/edit?usp=sharing" },
				{ name: "SP25 Advanced Algorithms: Prefix Sums", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1TkEXLrDTERw7C2Kn3Tkd44yoOPQaZnGDvp5ZXoMY2NE/edit?usp=sharing" },
				{ name: "SP25 Leetcode Basics", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1nLT2bMD1Q5Fsfhmw2Qd36CVq7dn5ywHrZRGJ4eBf2Kk/edit?usp=sharing" },
				{ name: "SP25 Problem Solving & Interviews", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1THfeE6XmXKFnWsYeZcvNfeY1Z7RDOIdW8uksauMI7RY/edit?usp=sharing" },
				{ name: "SP25 Applied Data Structures: Trees", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1LjzsuYAlAyBbz2D1VVQXOSiXpeh-5Zyqy7CjgSEb0Zk/edit?usp=sharing" },
				{ name: "SP25 Advanced Algorithms: Union Find", team: "algo", semester: "sp25", link: "https://docs.google.com/presentation/d/1eNhERhR4eV7L5VVaPVPlKoAkowYSF5GvNeo7QgAs28Q/edit?usp=sharing" },
			],
			fa25: [
				{ name: "FA25 Stacks and Queues", team: "algo", semester: "fa25", link: "https://docs.google.com/presentation/d/1dko0coc00NdwJ_ZSJeQ-KxRRgplVEH42ajAHG60x35s/edit?usp=drivesdk" },
				{ name: "FA25 Applied Data Structures: Arrays & Vectors", team: "algo", semester: "fa25", link: "https://docs.google.com/presentation/d/1ARv7vqMAAqt5Z9BnJ5Moravp7qzpfUKCrAA0xCHr_Bk/edit?usp=drivesdk" },
			]
		}
	},
	design: {
		workshops: {
			fa24: [
			],
			sp25: [
			],
			fa25: [
				{ name: "Workshop 1", team: "design", semester: "fa25", link: "https://www.figma.com/board/MbiHgxKxzRLyby7xng7Iwr/Workshop-1---Figma-Basics-2025?node-id=0-1&t=kVcorKNN1sbXPZig-1" },
				{ name: "Mobile Design", team: "design", semester: "fa25", link: "https://www.figma.com/board/xYHGoFxggQKONYPMCpafd1/Mobile-Design?node-id=0-1&t=IYW1ipa2o0HThcne-1" },
				{ name: "Animation Cheatsheet", team: "design", semester: "fa25", link: "https://storage.googleapis.com/hosting-site-acm/cheatsheet.html" },
			]
		}
	},
	dev: {
		workshops: {
			fa24: [
				{ name: "Intro", team: "dev", semester: "fa24", link: "https://www.canva.com/design/DAGL0VmFitY/aY6k_GmRfLMzOspT_clwYQ/view" },
				{ name: "Git Workshop FA24", team: "dev", semester: "fa24", link: "https://docs.google.com/presentation/d/1Q9pEgKFQxcmFLwiQHOruFoggP1ojPDxbyBTYQDSL_FE/edit?usp=sharing" },
				{ name: "React Workshop FA24", team: "dev", semester: "fa24", link: "https://docs.google.com/presentation/d/1Q2LXkhU0N6Lli_v8VnY9RQBRmzwKaJJUP6FFcR0Z2kU/edit?usp=sharing" },
				{ name: "MongoDB Workshop", team: "dev", semester: "fa24", link: "https://docs.google.com/presentation/d/1P4L7frJUQqs5D5Ea_EFOQr3n60xBg4CmsMVHHh5-VBQ/edit?usp=sharing" },
				{ name: "Nix Workshop - Fall 2024", team: "dev", semester: "fa24", link: "https://docs.google.com/presentation/d/1aeFOohzvR8WsXZH09wUhzBhgDSbV5uwNBjwARbE-eVE/edit?usp=sharing" },
				{ name: "Tailwind - ACM", team: "dev", semester: "fa24", link: "https://docs.google.com/presentation/d/1yzoSRnWNxrpVG70zaf3EtSoAgtIfLVS2HS3Rtmb6TuA/edit?usp=sharing" },
				{ name: "ORM Demo - ACM", team: "dev", semester: "fa24", link: "https://docs.google.com/presentation/d/1v5OqlFPVmgWZgAP0LDZroGQJKYJuDlJgrGkcVSwSrtc/mobilepresent?slide=id.p1" },
				{ name: "Introduction to Memory Safety", team: "dev", semester: "fa24", link: "https://docs.google.com/presentation/d/164mSEU8r_1Xy9qkc_ptiyx4yuWFpskZNAoQWmA3k9mU/edit?usp=sharing" },
				{ name: "Auth Demo - ACM", team: "dev", semester: "fa24", link: "https://docs.google.com/presentation/d/1janPpTRZnBzKjWe3N9wJZvAvgAKQqnOlITcfJWmU3lo/edit?usp=sharing" },
			],
			sp25: [
				{ name: "Microcontroller Workshop SP2025", team: "dev", semester: "sp25", link: "https://docs.google.com/presentation/d/1f1ImPIIi0QHFo5sofJDBevdlkHiMqFuwi6hc42SIWQg/edit?usp=sharing" },
				{ name: "Git Workshop SP2025", team: "dev", semester: "sp25", link: "https://docs.google.com/presentation/d/1EMhW_iNpvOJvXmpLgFY8HJno9PUht5j1H8s6b2MCBac/edit?usp=sharing" },
				{ name: "S25 Terminal Apps in C++", team: "dev", semester: "sp25", link: "https://docs.google.com/presentation/d/1fVDoaJ4hyxpLLIxcLFUMDRWTQrlZ1dcuMFIEIhXF7_M/edit?usp=sharing" },
			],
			fa25: [
				{ name: "Project Kickoff Google Form", team: "dev", semester: "fa25", link: "https://forms.gle/XQ2y6D6jqDbYbcoB9" },
				{ name: "Intro to React Native fa25", team: "dev", semester: "fa25", link: "https://docs.google.com/presentation/d/1JP2M1CTjpAg9U2cYbvpCCWKVgriZN7PEA666WBJiss0/edit?usp=sharing" },
				{ name: "Intro to Git & GitHub FA2025", team: "dev", semester: "fa25", link: "https://docs.google.com/presentation/d/1I3qcH44yWCs7S0Dxf-AoSQGqijS0aQq5BehaM7ahtv4/edit?usp=sharing" },
				{ name: "Intro To React Workshop", team: "dev", semester: "fa25", link: "https://docs.google.com/presentation/d/1zdNtHVWHinkyt7UmTazHRwrbSK07d7FCCw8AZCQCX4o/edit?usp=sharing" },
				{ name: "JavaScript & Chill", team: "dev", semester: "fa25", link: "https://docs.google.com/presentation/d/1gTRkPHTL4fCVhXj6i4dt2_OXNt25oEw23j6X-qGm_-I/edit?usp=drivesdk" },
				{ name: "Intro to Python fa25", team: "dev", semester: "fa25", link: "https://docs.google.com/presentation/d/1om3fKkUu7bRXgpYXde3n3Q5N3Y7twDccxmT6wdbryo0/edit?usp=sharing" },
				{ name: "Stacking High: Intro to Tech Stacks", team: "dev", semester: "fa25", link: "https://docs.google.com/presentation/d/1jrBstxJbegrDfp7PmrAM-RZeyT2oFJb0bsRm24R7JBw/preview?slide=id.p" },
			]
		}
	},
	gamedev: {
		workshops: {
			fa24: [
				{ name: "ACM GameDev Meeting #1", team: "gamedev", semester: "fa24", link: "https://docs.google.com/presentation/d/10JMhufzEgXGhoBUFR6kD2kppuDHllTF6ftTtJpkJvHU/edit?usp=sharing" },
				{ name: "ACM GameDev Meeting #2", team: "gamedev", semester: "fa24", link: "https://docs.google.com/presentation/d/1Hm2Mc5W5BsHvTYLM86iQnoPRchUSQUu1ftufUkuXZK0/edit?usp=sharing" },
				{ name: "ACM GameDev Meeting #3", team: "gamedev", semester: "fa24", link: "https://docs.google.com/presentation/d/1PmJ_LZ3n5insHxcb9FjYwhvqtgP0hmx7RX1phOP452M/edit?usp=sharing" },
				{ name: "ACM GameDev Meeting #5", team: "gamedev", semester: "fa24", link: "https://docs.google.com/presentation/d/16Y5wnb3UIi4iKs4HpI7rydWfd1ga9BgJ3ZlXYld9Z7c/edit?slide=id.p#slide=id.p" },
				{ name: "ACM GameDev Meeting #4", team: "gamedev", semester: "fa24", link: "https://docs.google.com/presentation/d/1RZjCUmuj4p_5T5n74-BhflfAsJ5qsCosYsYfJgXPcvk/edit?usp=sharing" },
			],
			sp25: [
				{ name: "ACM GameDev Meeting #3 Spring 25", team: "gamedev", semester: "sp25", link: "https://docs.google.com/presentation/d/1NQWpjFJpjZWETexGIQ1SzJQs3qE0b-7KDm2RHV0PACk/edit?usp=sharing" },
				{ name: "ACM GameDev Meeting #1 Spring 25", team: "gamedev", semester: "sp25", link: "https://docs.google.com/presentation/d/1QAGeAogyEng8kmBcrc9UVhvCowJYaiGBFU7tWlCUD9U/edit" },
				{ name: "ACM GameDev Meeting #5 Spring 25", team: "gamedev", semester: "sp25", link: "https://docs.google.com/presentation/d/1m7c0CbqgBahkE353cBcsig9cZefjs0cpHMDiJ9XCJgg/edit?usp=sharing" },
				{ name: "ACM GameDev Meeting #4 Spring 25", team: "gamedev", semester: "sp25", link: "https://docs.google.com/presentation/d/1kNY0Nv6S0k1Do2K_cEcERtmTxuX3EmKheCLNq9OPIl0/edit?slide=id.p#slide=id.p" },
				{ name: "ACM GameDev Meeting #2 Spring 25", team: "gamedev", semester: "sp25", link: "https://docs.google.com/presentation/d/1sGuL3HUexeenx6k3QIhkmUaLvFpDhIdhB-zugZxDhMc/edit?usp=sharing" },
			],
			fa25: [
			]
		}
	},
	general: {
		workshops: {
			fa24: [
				{ name: "Resume and Internship Hunting Workshop", team: "general", semester: "fa24", link: "https://docs.google.com/presentation/d/1O95nORR-HhuEHVJ_kw86M1Wqzb3dU6ZkGWKcy9Kj4lI/edit#slide=id.g2f9987f7019_0_38" },
			],
			sp25: [
				{ name: "Career Workshop SP25", team: "general", semester: "sp25", link: "https://docs.google.com/presentation/d/1Dfsek-JagjhUskGcXUzMJKK9w6RoWD4PXNAF95lpzeI/edit#slide=id.g2824fb229f4_0_114" },
			],
			fa25: [
			]
		}
	},
	icpc: {
		workshops: {
			fa24: [
				{ name: "ICPC - Creating Teams", team: "icpc", semester: "fa24", link: "https://docs.google.com/presentation/d/170TYF5_dpD5egVjeN365l6IquPrXlaRgOkURrkMMx4c/edit?usp=sharing" },
			],
			sp25: [
			],
			fa25: [
			]
		}
	},
	nodebuds: {
		workshops: {
			fa24: [
				{ name: "Node Buds Welcome Meeting", team: "nodebuds", semester: "fa24", link: "https://docs.google.com/presentation/d/15PyCixqGFfgtmPF9_phR1Tl66YwIBb_iJPlZrW36PLQ/edit" },
				{ name: "Resume and Internship Hunting Workshop", team: "nodebuds", semester: "fa24", link: "https://docs.google.com/presentation/d/1O95nORR-HhuEHVJ_kw86M1Wqzb3dU6ZkGWKcy9Kj4lI/edit?usp=sharing" },
			],
			sp25: [
				{ name: "Node Buds LeetCode 101 Workshop", team: "nodebuds", semester: "sp25", link: "https://docs.google.com/presentation/d/1Xjmgqz4CfB-2Z9ATUvSMxq9o0NQpJ0tWTy4oA1hEEEw/edit?usp=sharing" },
			],
			fa25: [
				{ name: "Node Buds Team Kickoff", team: "nodebuds", semester: "fa25", link: "https://docs.google.com/presentation/d/1hXoZIyMIICBPTJcw-AlQwDyfwUFDT6L_Iou_T-YYscM/edit?usp=sharing" },
			]
		}
	},
	oss: {
		workshops: {
			fa24: [
				{ name: "Open Source Software Team Fall 2024: API Basics", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/1nGJQfaR1vt3N89AAUKDVkX9ENMupyQypKztleItpitE/edit?usp=sharing" },
				{ name: "Open Source Software Team Fall 2024: OSS Team Kickoff", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/10N0Stm2nmfvTqWxk66m7I93NEbHyrtaftgwMXS0ES1Q/edit#slide=id.p" },
				{ name: "Open Source Software Team Fall 2024: First Contributions", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/1nzdVbtTMFwk36zg7qR_zGHA1rvdBtOf0rNzJE9YNwCo/edit#slide=id.p" },
				{ name: "Open Source Software Team Fall 2024: Commencement", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/1fv_XSh6GL0c-2OFkYWXS8AGHcbD9CfV8PNG0UrfJkEA/edit#slide=id.p" },
				{ name: "Open Source Software Team Fall 2024: Applied Algorithms", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/1aD0_cDkz6-9d325aaFnAOab_1DdKBRP96eueaUvEp9o/edit#slide=id.p" },
				{ name: "Open Source Software Team Fall 2024: OSS 101", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/1PPSnjCq0dxL0v0wPH_Xsl5sV4KoJJL6KpOSrzBRj3Iw/edit?usp=sharing" },
				{ name: "Open Source Software Team Fall 2024: Intro to Lua", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/1iSIIXINJ1ia1Po7cjYa9e09x9tzY0u2XS0uIOdZmsPQ/edit?usp=sharing" },
				{ name: "Open Source Software Team Fall 2024: Intro to SvelteKit", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/1U0o3Z8MiotcygNJhHQ0UQnZTL3C4fwPcg_HEzvpDxJ4/edit#slide=id.p" },
				{ name: "Open Source Software Team Fall 2024: Discord Bot Workshop", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/1EzrDf3hin7VBxy_5Q4KMVJot3QjiS4RVnvxF4c-Whx0/edit?usp=sharing" },
				{ name: "Open Source Software Team Fall 2024: Planning Large Projects", team: "oss", semester: "fa24", link: "https://docs.google.com/presentation/d/1SOsWw1SbbGT0HMVYb3ZAn_xPPdPg4KYE22hBXa17E3Y/edit#slide=id.p" },
			],
			sp25: [
				{ name: "First Contributions", team: "oss", semester: "sp25", link: "https://acmcsufoss.github.io/1st/sp25/" },
				{ name: "Open Source Software Team Spring 2025: Intro to SvelteKit", team: "oss", semester: "sp25", link: "https://docs.google.com/presentation/d/1KNGW6Bm-RnzSsFCo9gIqiCddvuymb2cx6_t6e7sAlGI/edit?usp=sharing" },
				{ name: "Open Source Software Team Spring 2025: OSS Rapid Fire", team: "oss", semester: "sp25", link: "https://docs.google.com/presentation/d/1m1ZrbgCkC77E2gln5xx1e8of3RDWfEqbGxhOC2rouOs/edit?usp=sharing" },
				{ name: "Open Source Software Team Spring 2025: CS Journeys w/ Melkey", team: "oss", semester: "sp25", link: "https://docs.google.com/presentation/d/1tU6oLmnSJB2-gsPJvQZaANQ70v6q4_RMDLnTT9qDRUk/edit?slide=id.p#slide=id.p" },
				{ name: "Open Source Software Team Spring 2025: Commencement", team: "oss", semester: "sp25", link: "https://docs.google.com/presentation/d/1kzMumwu-W2zH1_XVr4C3NomZB32UCLUJpwEDsdnnh1Y/edit?slide=id.p#slide=id.p" },
				{ name: "Open Source Software Team Spring 2025: Building + Winning FullyHacks", team: "oss", semester: "sp25", link: "https://docs.google.com/presentation/d/1KbqGmU_jsaGq91h6Ly-3cZP5cgpzco0Kip424jQPTp8/edit" },
				{ name: "Open Source Software Team Spring 2025: Intro to Go", team: "oss", semester: "sp25", link: "https://docs.google.com/presentation/d/1hTMA2ail33QvO---mBuujrcYHVQfkm1F1baiToIl6iA/edit?slide=id.p#slide=id.p" },
				{ name: "Open Source Software Team Spring 2025: Learning to Learn", team: "oss", semester: "sp25", link: "https://docs.google.com/presentation/d/17pwOP919gSKGH_Y0vqlp2CcGFDS4Y1t6ZCkna2NGCOs/edit?usp=sharing" },
				{ name: "Open Source Software Team Spring 2025: Introduction To The OSS Team", team: "oss", semester: "sp25", link: "https://docs.google.com/presentation/d/1-N2_iPxEj5K4n-hnIpXtloONafMNLnNMYKNob0vSNOg" },
			],
			fa25: [
				{ name: "Open Source Team FA25: First Contributions", team: "oss", semester: "fa25", link: "https://docs.google.com/presentation/d/1-bY5uECdTwgDxlri-TD2Os-v2CucHjSY9gxPWbSwFMw/edit?usp=sharing" },
				{ name: "Open Source Team FA25: Consuming HTTP APIs", team: "oss", semester: "fa25", link: "https://docs.google.com/presentation/d/1gANMxatynP8RasAfV2RqXZ27ZGHTkwoLO2trMTJFV2s/edit?usp=sharing" },
				{ name: "Open Source Team FA25: Intro to Sveltekit", team: "oss", semester: "fa25", link: "https://docs.google.com/presentation/d/18c9HMXxiyk5eGoz0bVrZpsH7yeUBtnqjhoUHtuM19Vc/edit?usp=sharing" },
				{ name: "Open Source Team FA25: Deploying on a Cloud", team: "oss", semester: "fa25", link: "https://docs.google.com/presentation/d/1ahI9vLplN62BqrGkTBZkr7UdB5Odq4LFEmzP-1U_DYc/edit?usp=sharing" },
				{ name: "Open Source Team FA25: Github Actions", team: "oss", semester: "fa25", link: "https://docs.google.com/presentation/d/1teyEFpxhccS_T-JzuoJm5gqnK15rHs3W3aWjH7CCzFk/edit?usp=sharing" },
				{ name: "Open Source Team FA25: Intro to the Open Source Team", team: "oss", semester: "fa25", link: "https://docs.google.com/presentation/d/1Zpg4aa61JmwJ0lIEI0X_P69JmcOgitFD_d_Pz1i6yWU/edit?usp=sharing" },
			]
		}
	}
}
export async function NewWorkshopTable() {
	return currentTable;
}
