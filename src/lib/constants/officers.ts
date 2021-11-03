export interface Officer {
	name: string;
	positions: Record<string, string>;
	picture?: string;
	url?: string;
}

export const TERM_FALL_20 = 'F20';
export const TERM_SPRING_21 = 'S21';
export const TERM_FALL_21 = 'F21';

export const TERMS = [TERM_FALL_21, TERM_SPRING_21];

export const OFFICERS: Officer[] = [
	{
		name: 'Jacob Nguyen',
		positions: { [TERM_SPRING_21]: 'President, Create Director, NodeBuds Officer' },
		picture: 'jacob-nguyen.png',
	},
	{
		name: 'Aaron Lieberman',
		positions: {
			[TERM_SPRING_21]: 'Internal Vice President, NodeBuds Officer',
			[TERM_FALL_21]: 'President',
		},
		picture: 'aaron-lieberman.png',
	},
	{
		name: 'Karnikaa Velumani',
		positions: { [TERM_FALL_21]: 'Vice President' },
		picture: 'karnikaa-velumani.png',
	},
	{
		name: 'Samuel Sandoval',
		positions: { [TERM_SPRING_21]: 'Vice President, Dev Director' },
		picture: 'samuel-sandoval.png',
	},
	{
		name: 'Ethan Davidson',
		positions: {
			[TERM_FALL_20]: 'Competition Manager',
			[TERM_SPRING_21]: 'Webmaster',
			[TERM_FALL_21]: 'Webmaster',
		},
		picture: 'ethan-davidson.png',
		//url: "https://github.com/EthanThatOneKid/",
	},
	{
		name: 'Andrew Lau',
		positions: { [TERM_SPRING_21]: 'Treasurer' },
		picture: 'andrew-lau.png',
	},
	{
		name: 'Tommy Le',
		positions: { [TERM_FALL_21]: 'Treasurer' },
		picture: 'tommy-le.png',
	},
	{
		name: 'Jason Anthony',
		positions: { [TERM_SPRING_21]: 'Secretary' },
		picture: 'jason-anthony.png',
	},
	{
		name: 'Nicolas Renteria',
		positions: { [TERM_SPRING_21]: 'Marketing Chair, NodeBuds Officer' },
		picture: 'nicolas-renteria.png',
	},
	{
		name: 'Joshua Hughes',
		positions: { [TERM_SPRING_21]: 'ICC Representative' },
		picture: 'joshua-hughes.png',
	},
	{
		name: 'Wilbert Rodriguez',
		positions: { [TERM_SPRING_21]: 'Intern Program Manager' },
		picture: 'wilbert-rodriguez.png',
	},
	{
		name: 'Shaleen Mathur',
		positions: { [TERM_SPRING_21]: 'Co-Workshop Manager' },
		picture: 'shaleen-mathur.png',
	},
	{
		name: 'Johnson Tong',
		positions: { [TERM_SPRING_21]: 'Co-Workshop Manager' },
		picture: 'johnson-tong.png',
	},
	{
		name: 'Kavit Sanghavi',
		positions: { [TERM_SPRING_21]: 'Algo Director' },
		picture: 'kavit-sanghavi.png',
	},
	{
		name: 'Kevin Dillon',
		positions: { [TERM_SPRING_21]: 'Algo Officer' },
		picture: 'kevin-dillon.png',
	},
	{
		name: 'Parth Sharma',
		positions: { [TERM_SPRING_21]: 'Algo Officer' },
		picture: 'parth-sharma.png',
	},
	{
		name: 'Armanul Ambia',
		positions: {
			[TERM_SPRING_21]: 'Dev Officer, NodeBuds Officer',
			[TERM_FALL_21]: 'Algo Director',
		},
		picture: 'armanul-ambia.png',
	},
	{
		name: 'Alex Truong',
		positions: { [TERM_FALL_21]: 'Algo Officer' },
		picture: 'alex-truong.png',
	},
	{
		name: 'Wesley Chou',
		positions: {
			[TERM_SPRING_21]: 'Dev Officer',
			[TERM_FALL_21]: 'Dev Director',
		},
		picture: 'wesley-chou.png',
	},
	{
		name: 'Andy Lasso',
		positions: { [TERM_FALL_21]: 'Dev Officer' },
		picture: 'andy-lasso.png',
	},
	{
		name: 'Rina Watanabe',
		positions: { [TERM_FALL_21]: 'Dev Officer, Project Manager' },
		picture: 'rina-watanabe.png',
	},
	{
		name: 'Jorge Mejia',
		positions: { [TERM_FALL_21]: 'Dev Officer' },
		picture: 'jorge-mejia.png',
	},
	{
		name: 'Johnathan Carranza',
		positions: { [TERM_FALL_21]: 'Dev Officer' },
		picture: 'johnathan-carranza.png',
	},
	{
		name: 'Mike Ploythai',
		positions: {
			[TERM_SPRING_21]: 'Create Officer',
			[TERM_FALL_21]: 'Create Director, Marketing Chair',
		},
		picture: 'mike-ploythai.png',
	},
	{
		name: 'Samuel Valls',
		positions: {
			[TERM_SPRING_21]: 'Community Manager',
			[TERM_FALL_21]: 'Create Officer',
		},
		picture: 'samuel-valls.png',
	},
	{
		name: 'Lisa Hong',
		positions: { [TERM_SPRING_21]: 'Create Officer' },
		picture: 'lisa-hong.png',
	},
	{
		name: 'Kayla Nguyen',
		positions: { [TERM_FALL_21]: 'Create Officer' },
		picture: 'kayla-nguyen.png',
	},
	{
		name: 'Serena Naranjo',
		positions: { [TERM_FALL_21]: 'Create Officer' },
		picture: 'serena-naranjo.png',
	},
	{
		name: 'Taylor Noh',
		positions: {
			[TERM_SPRING_21]: 'NodeBuds Officer',
		},
		picture: 'taylor-noh.png',
	},
	{
		name: 'Eugene Lee',
		positions: { [TERM_SPRING_21]: 'NodeBuds Officer' },
		picture: 'eugene-lee.png',
	},
	{
		name: 'Sami Bajwa',
		positions: { [TERM_FALL_21]: 'NodeBuds Officer' },
		picture: 'sami-bajwa.png',
	},
	{
		name: 'Eduardo Gomez',
		positions: { [TERM_SPRING_21]: 'NodeBuds Officer' },
		picture: 'eduardo-gomez.png',
	},
	{
		name: 'Ean McGilvery',
		positions: { [TERM_SPRING_21]: 'NodeBuds Officer' },
		picture: 'ean-mcgilvery.png',
	},
	{
		name: 'Dalisa Nguyen',
		positions: { [TERM_SPRING_21]: 'NodeBuds Officer' },
		picture: 'dalisa-nguyen.png',
	},
];

// TODO: Implement visual effect based on path.
// export interface Position {
//   title: string; // HTML string
//   path: "general" | "algo" | "create" | "dev";
// }
