import type { Officer } from '$lib/public/board/types';

// TODO: Fix
export const TIERS = {
  President: {
    id: 0,
    index: 100,
  },
  'Vice President': {
    id: 1,
    index: 150,
  },
  Webmaster: {
    id: 2,
    index: 200,
  },
  Secretary: {
    id: 3,
    index: 250,
  },
  Treasurer: {
    id: 4,
    index: 300,
  },
  'Data Analyst': {
    id: 5,
    index: 350,
  },
  'Special Events Leader': {
    id: 6,
    index: 400,
  },
  'Special Events Officer': {
    id: 7,
    index: 450,
  },
  'Marketing Leader': {
    id: 8,
    index: 500,
  },
  Historian: {
    id: 9,
    index: 550,
  },
  'Event Coordinator': {
    id: 10,
    index: 600,
  },
  'Algo Leader': {
    id: 11,
    index: 650,
  },
  'Algo Officer': {
    id: 12,
    index: 700,
  },
  'Design Leader': {
    id: 13,
    index: 750,
  },
  'Design Project Manager': {
    id: 14,
    index: 800,
  },
  'Design Operations Manager': {
    id: 15,
    index: 850,
  },
  'Design Officer': {
    id: 16,
    index: 900,
  },
  'Dev Leader': {
    id: 17,
    index: 950,
  },
  'Dev Project Manager': {
    id: 18,
    index: 1000,
  },
  'Dev Officer': {
    id: 19,
    index: 1050,
  },
  'AI Leader': {
    id: 20,
    index: 1100,
  },
  'AI Officer': {
    id: 21,
    index: 1150,
  },
  'Nodebuds Officer': {
    id: 22,
    index: 1200,
  },
  'ICC Representative': {
    id: 23,
    index: 1250,
  },
};

export const OFFICERS: Officer[] = [
  {
    fullName: 'Armanul Ambia',
    picture: 'armanul-ambia.webp',
    positions: {
      S21: {
        title: 'Dev Officer',
        tier: TIERS['Dev Officer'].id,
      },
      F21: {
        title: 'Algo Director',
        tier: TIERS['Algo Leader'].id,
      },
      S22: {
        title: 'Algo President',
        tier: TIERS['Algo Leader'].id,
      },
      F22: {
        title: 'Algo Team Lead',
        tier: TIERS['Algo Leader'].id,
      },
    },
  },
  {
    fullName: 'Jason Anthony',
    picture: 'jason-anthony.webp',
    positions: {
      S21: {
        title: 'Secretary',
        tier: TIERS['Secretary'].id,
      },
    },
  },
  {
    fullName: 'Angel Armendariz',
    picture: 'angel-armendariz.webp',
    positions: {
      S22: {
        title: 'Dev Project Manager',
        tier: TIERS['Dev Project Manager'].id,
      },
    },
  },
  {
    fullName: 'Sami Bajwa',
    picture: 'sami-bajwa.webp',
    positions: {
      F21: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
      S22: {
        title: 'Algo Officer, nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
      F22: {
        title: 'Algo Officer',
        tier: TIERS['Algo Officer'].id,
      },
    },
  },
  {
    fullName: 'Johnathan Carranza',
    picture: 'johnathan-carranza.webp',
    positions: {
      F21: {
        title: 'Dev Officer',
        tier: TIERS['Dev Officer'].id,
      },
    },
  },
  {
    fullName: 'Alan Cortez',
    picture: 'alan-cortez.webp',
    socials: {
      website: 'alancortez1337.github.io/portfolio/',
      github: 'alancortez1337',
    },
    positions: {
      S22: {
        title: 'Create Officer',
        tier: TIERS['Design Officer'].id,
      },
      F22: {
        title: 'Design Team Lead',
        tier: TIERS['Design Leader'].id,
      },
    },
  },
  {
    fullName: 'Wesley Chou',
    picture: 'wesley-chou.webp',
    positions: {
      S21: {
        title: 'Dev Officer',
        tier: TIERS['Dev Officer'].id,
      },
      F21: {
        title: 'Dev Director',
        tier: TIERS['Dev Leader'].id,
      },
      S22: {
        title: 'Dev President',
        tier: TIERS['Dev Leader'].id,
      },
      F22: {
        title: 'Marketing Co-Lead',
        tier: TIERS['Marketing Leader'].id,
      },
    },
  },
  {
    fullName: 'Ethan Davidson',
    picture: 'ethan-davidson.webp',
    socials: {
      github: 'EthanThatOneKid',
      discord: 'EthanThatOneKid#3456',
      linkedin: 'etok',
    },
    positions: {
      S21: {
        title: 'Webmaster',
        tier: TIERS['Webmaster'].id,
      },
      F21: {
        title: 'Webmaster',
        tier: TIERS['Webmaster'].id,
      },
      S22: {
        title: 'Webmaster',
        tier: TIERS['Webmaster'].id,
      },
      F22: {
        title: 'Vice President/Webmaster',
        tier: TIERS['Vice President'].id,
      },
    },
  },
  {
    fullName: 'Kevin Dillon',
    picture: 'kevin-dillon.webp',
    positions: {
      S21: {
        title: 'Algo Officer',
        tier: TIERS['Algo Officer'].id,
      },
    },
  },
  {
    fullName: 'Diamond Dinh',
    picture: 'diamond-dinh.webp',
    socials: {
      github: 'diamondburned',
    },
    positions: {
      S22: {
        title: 'Dev Project Manager',
        tier: TIERS['Dev Project Manager'].id,
      },
      F22: {
        title: 'Special Events Officer',
        tier: TIERS['Special Events Officer'].id,
      },
    },
  },
  {
    fullName: 'Eduardo Gomez',
    picture: 'eduardo-gomez.webp',
    positions: {
      S21: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
    },
  },
  {
    fullName: 'Nurhaliza Hassan',
    picture: 'nurhaliza-hassan.webp',
    positions: {
      S22: {
        title: 'Marketing Director',
        tier: TIERS['Marketing Leader'].id,
      },
      F22: {
        title: 'Marketing Co-Lead',
        tier: TIERS['Marketing Leader'].id,
      },
    },
  },
  {
    fullName: 'Lisa Hong',
    picture: 'lisa-hong.webp',
    positions: {
      S21: {
        title: 'Create Officer',
        tier: TIERS['Design Officer'].id,
      },
    },
  },
  {
    fullName: 'Joshua Hughes',
    picture: 'joshua-hughes.webp',
    positions: {
      S21: {
        title: 'ICC Representative',
        tier: TIERS['ICC Representative'].id,
      },
    },
  },
  {
    fullName: 'Iftekharul Islam',
    picture: 'iftekharul-islam.webp',
    positions: {
      S22: {
        title: 'Algo Officer',
        tier: TIERS['Algo Officer'].id,
      },
    },
  },
  {
    fullName: 'Ibrahim Israr',
    picture: 'ibrahim-israr.webp',
    positions: {
      S22: {
        title: 'Secretary',
        tier: TIERS['Secretary'].id,
      },
    },
  },
  {
    fullName: 'Joel Anil John',
    picture: 'joel-anil-john.webp',
    positions: {
      S22: {
        title: 'Dev Officer',
        tier: TIERS['Dev Officer'].id,
      },
      F22: {
        title: 'Algo Officer',
        tier: TIERS['Algo Officer'].id,
      },
    },
  },
  {
    fullName: 'Andy Lasso',
    picture: 'andy-lasso.webp',
    positions: {
      F21: {
        title: 'Dev Officer',
        tier: TIERS['Dev Officer'].id,
      },
    },
  },
  {
    fullName: 'Andrew Lau',
    picture: 'andrew-lau.webp',
    positions: {
      S21: {
        title: 'Treasurer',
        tier: TIERS['Treasurer'].id,
      },
    },
  },
  {
    fullName: 'Minh Le',
    picture: 'minh-le.webp',
    positions: {
      S22: {
        title: 'Dev Officer',
        tier: TIERS['Dev Officer'].id,
      },
    },
  },
  {
    fullName: 'Nguyen Le',
    picture: 'nguyen-le.webp',
    positions: {
      S22: {
        title: 'Data Analyst',
        tier: TIERS['Data Analyst'].id,
      },
    },
  },
  {
    fullName: 'Tommy Le',
    picture: 'tommy-le.webp',
    positions: {
      F21: {
        title: 'Treasurer',
        tier: TIERS['Treasurer'].id,
      },
      S22: {
        title: 'Treasurer',
        tier: TIERS['Treasurer'].id,
      },
    },
  },
  {
    fullName: 'Eugene Lee',
    picture: 'eugene-lee.webp',
    positions: {
      S21: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
      F21: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
      S22: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
    },
  },
  {
    fullName: 'Nolan Lee',
    picture: 'nolan-lee.webp',
    positions: {
      S22: {
        title: 'Historian',
        tier: TIERS['Historian'].id,
      },
    },
  },
  {
    fullName: 'Aaron Lieberman',
    picture: 'aaron-lieberman.webp',
    positions: {
      S21: {
        title: 'Internal Vice President, nodebuds Officer',
        tier: TIERS['Vice President'].id,
      },
      F21: {
        title: 'President, nodebuds Officer',
        tier: TIERS['President'].id,
      },
      S22: {
        title: 'President, nodebuds Officer',
        tier: TIERS['President'].id,
      },
      F22: {
        title: 'Special Events Team Lead',
        tier: TIERS['Special Events Leader'].id,
      },
    },
  },
  {
    fullName: 'Shaleen Mathur',
    picture: 'shaleen-mathur.webp',
    positions: {
      S21: {
        title: 'Workshop Manager',
        tier: TIERS['Dev Project Manager'].id,
      },
    },
  },
  {
    fullName: 'Ean McGilvery',
    picture: 'ean-mcgilvery.webp',
    positions: {
      S21: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
    },
  },
  {
    fullName: 'Jorge Mejia',
    picture: 'jorge-mejia.webp',
    positions: {
      F21: {
        title: 'Dev Officer',
        tier: TIERS['Dev Officer'].id,
      },
      S22: {
        title: 'Dev Officer',
        tier: TIERS['Dev Officer'].id,
      },
      F22: {
        title: 'Design Officer',
        tier: TIERS['Design Officer'].id,
      },
    },
  },
  {
    fullName: 'Serena Naranjo',
    picture: 'serena-naranjo.webp',
    positions: {
      F21: {
        title: 'Create Officer',
        tier: TIERS['Design Officer'].id,
      },
      S22: {
        title: 'Create Officer',
        tier: TIERS['Design Officer'].id,
      },
    },
  },
  {
    fullName: 'Dalisa Nguyen',
    picture: 'dalisa-nguyen.webp',
    positions: {
      S21: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
    },
  },
  {
    fullName: 'Kayla Nguyen',
    picture: 'kayla-nguyen.webp',
    positions: {
      F21: {
        title: 'Create Officer',
        tier: TIERS['Design Officer'].id,
      },
    },
  },
  {
    fullName: 'Jacob Nguyen',
    picture: 'jacob-nguyen.webp',
    positions: {
      S21: {
        title: 'President, Create Director, nodebuds Officer',
        tier: TIERS['President'].id,
      },
      F22: {
        title: 'Treasurer',
        tier: TIERS['Treasurer'].id,
      },
    },
  },
  {
    fullName: 'Taylor Noh',
    picture: 'taylor-noh.webp',
    positions: {
      S21: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
      F21: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
      S22: {
        title: 'nodebuds Officer',
        tier: TIERS['Nodebuds Officer'].id,
      },
    },
  },
  {
    fullName: 'Kirsten Ochoa',
    picture: 'kirsten-ochoa.webp',
    positions: {
      S22: {
        title: 'Create Project Developer',
        tier: TIERS['Design Project Manager'].id,
      },
      F22: {
        title: 'Design Officer',
        tier: TIERS['Design Officer'].id,
      },
    },
  },
  {
    fullName: 'Mike Ploythai',
    picture: 'mike-ploythai.webp',
    positions: {
      S21: {
        title: 'Create Officer',
        tier: TIERS['Design Officer'].id,
      },
      F21: {
        title: 'Create Director, Marketing Chair',
        tier: TIERS['Design Leader'].id,
      },
      S22: {
        title: 'Create President',
        tier: TIERS['Design Leader'].id,
      },
    },
  },
  {
    fullName: 'Stephanie Pocci',
    picture: 'stephanie-pocci.webp',
    positions: {
      S22: {
        title: 'Event Coordinator',
        tier: TIERS['Event Coordinator'].id,
      },
      F22: {
        title: 'Event Coordinator',
        tier: TIERS['Event Coordinator'].id,
      },
    },
  },
  {
    fullName: 'Nicolas Renteria',
    picture: 'nicolas-renteria.webp',
    positions: {
      S21: {
        title: 'Marketing Chair',
        tier: TIERS['Marketing Leader'].id,
      },
    },
  },
  {
    fullName: 'Wilbert Rodriguez',
    picture: 'wilbert-rodriguez.webp',
    positions: {
      S21: {
        title: 'Intern Program Manager',
        tier: TIERS['Nodebuds Officer'].id,
      },
    },
  },
  {
    fullName: 'Samuel Sandoval',
    picture: 'samuel-sandoval.webp',
    positions: {
      S21: {
        title: 'Vice President, Dev Director',
        tier: TIERS['Vice President'].id,
      },
    },
  },
  {
    fullName: 'Kavit Sanghavi',
    picture: 'kavit-sanghavi.webp',
    positions: {
      S21: {
        title: 'Algo Director',
        tier: TIERS['Algo Leader'].id,
      },
    },
  },
  {
    fullName: 'Parth Sharma',
    picture: 'parth-sharma.webp',
    positions: {
      S21: {
        title: 'Algo Officer',
        tier: TIERS['Algo Officer'].id,
      },
    },
  },
  {
    fullName: 'Justin Stitt',
    picture: 'justin-stitt.webp',
    positions: {
      S22: {
        title: 'Algo Officer',
        tier: TIERS['Algo Officer'].id,
      },
      F22: {
        title: 'AI Team Lead',
        tier: TIERS['Algo Leader'].id,
      },
    },
  },
  {
    fullName: 'Johnson Tong',
    picture: 'johnson-tong.webp',
    positions: {
      S21: {
        title: 'Workshop Manager',
        tier: TIERS['Dev Project Manager'].id,
      },
    },
  },
  {
    fullName: 'Alex Truong',
    positions: {
      F21: {
        title: 'Algo Officer',
        tier: TIERS['Algo Officer'].id,
      },
    },
    picture: 'alex-truong.webp',
  },
  {
    fullName: 'Daniel Truong',
    picture: 'daniel-truong.webp',
    positions: {
      S22: {
        title: 'Dev Project Manager',
        tier: TIERS['Dev Project Manager'].id,
      },
      F22: {
        title: 'Dev Project Manager',
        tier: TIERS['Dev Project Manager'].id,
      },
    },
  },
  {
    fullName: 'Samuel Valls',
    picture: 'samuel-valls.webp',
    positions: {
      S21: {
        title: 'Community Manager',
        tier: TIERS['Nodebuds Officer'].id,
      },
      F21: {
        title: 'Create Officer',
        tier: TIERS['Design Officer'].id,
      },
      S22: {
        title: 'Create Operations Manager',
        tier: TIERS['Design Operations Manager'].id,
      },
    },
  },
  {
    fullName: 'Karnikaa Velumani',
    picture: 'karnikaa-velumani.webp',
    positions: {
      F21: {
        title: 'Vice President',
        tier: TIERS['Vice President'].id,
      },
      S22: {
        title: 'Vice President',
        tier: TIERS['Vice President'].id,
      },
      F22: {
        title: 'President',
        tier: TIERS['President'].id,
      },
    },
  },
  {
    fullName: 'Rina Watanabe',
    picture: 'rina-watanabe.webp',
    positions: {
      F21: {
        title: 'Dev Project Manager',
        tier: TIERS['Dev Project Manager'].id,
      },
    },
  },
  {
    fullName: 'Jason Wong',
    picture: 'jason-wong.webp',
    positions: {
      S22: {
        title: 'Historian',
        tier: TIERS['Historian'].id,
      },
      F22: {
        title: 'Historian',
        tier: TIERS['Historian'].id,
      },
    },
  },
  {
    fullName: 'Alejandro Ramos',
    picture: 'alejandro-ramos.webp',
    positions: {
      F22: {
        title: 'Design Officer',
        tier: TIERS['Design Officer'].id,
      },
    },
  },
  {
    fullName: 'Angel Santoyo',
    picture: 'angel-santoyo.webp',
    positions: {
      F22: {
        title: 'Dev Officer',
        tier: TIERS['Dev Officer'].id,
      },
    },
  },
  {
    fullName: 'Charlie Taylor',
    picture: 'charlie-taylor.webp',
    positions: {
      F22: {
        title: 'Dev Team Lead',
        tier: TIERS['Dev Leader'].id,
      },
    },
  },
  {
    fullName: 'Yao Lin',
    picture: 'yao-lin.webp',
    positions: {
      F22: {
        title: 'AI Officer',
        tier: TIERS['AI Officer'].id,
      },
    },
  },
  {
    fullName: 'Sara Sadek',
    picture: 'placeholder.webp',
    positions: {
      F22: {
        title: 'AI Officer',
        tier: TIERS['AI Officer'].id,
      },
    },
  },
  {
    fullName: 'Arish Imam',
    picture: 'placeholder.webp',
    positions: {
      F22: {
        title: 'AI Officer',
        tier: TIERS['AI Officer'].id,
      },
    },
  },
];
