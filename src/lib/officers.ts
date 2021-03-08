interface Officer {
  name: string;
  title: string;
  picture?: string;
  url?: string;
}

export const officers: Record<string, Officer[]> = {
  "2021-2022": [
    {
      name: "TBD",
      title: "2021-2022 🚀",
    },
  ],
  "2020-2021": [
    {
      name: "Jacob Nguyen",
      title: "President/Create Director 🎨",
      picture: "jacob-nguyen.jpg",
    },
    {
      name: "Aaron Lieberman",
      title: "Internal Vice President 😎",
      picture: "aaron-lieberman.jpg",
    },
    {
      name: "Samuel Sandoval",
      title: "Dev Director 🧠",
      picture: "samuel-sandoval.jpg",
    },
    {
      name: "Ethan Davidson",
      title: "Webmaster 👨‍💻",
      picture: "ethan-davidson.jpg",
      url: "https://github.com/EthanThatOneKid",
    },
    {
      name: "Mike Ploythai",
      title: "Create Officer",
      picture: "mike-ploythai.jpeg",
    },
    {
      name: "Andrew Lau",
      title: "Treasurer",
      picture: "andrew-lau.jpg",
    },
    {
      name: "Nicole Traboulsi",
      title: "NodeBuds Officer",
      picture: "nicole-traboulsi.jpeg",
    },
    {
      name: "Jason Anthony",
      title: "Secretary",
      picture: "jason-anthony.jpg",
    },
    {
      name: "Shaleen Mathur",
      title: "Workshop Manager",
      picture: "shaleen-mathur.jpg",
    },
    {
      name: "Nicolas Renteria",
      title: "Marketing Chair",
      picture: "nicolas-renteria.jpg",
    },
    {
      name: "Joshua Hughes",
      title: "ICC Representative",
      picture: "joshua-hughes.png"
    },
    {
      name: "Samuel Valls",
      title: "Community Manager",
      picture: "samuel-valls.jpg",
    },
    {
      name: "Wilbert Rodriguez",
      title: "Intern Program Manager",
      picture: "wilbert-rodriguez.png",
    },
    {
      name: "Johnson Tong",
      title: "Co-Workshop Manager",
      picture: "johnson-tong.jpg",
    },
    {
      name: "Kavit Sanghavi",
      title: "Algo Director",
      picture: "kavit-sanghavi.jpg",
    },
    {
      name: "Kevin Dillon",
      title: "Algo Officer",
      picture: "kevin-dillon.png",
    },
    {
      name: "Parth Sharma",
      title: "Algo Officer",
      picture: "parth-sharma.jpg",
    },
    {
      name: "Wesley Chou",
      title: "Dev Officer",
      picture: "wesley-chou.png",
    },
    {
      name: "Armanul Ambia",
      title: "Dev Officer",
      picture: "armanul-ambia.jpg",
    },

    {
      name: "Lisa Hong",
      title: "Product Officer",
      picture: "lisa-hong.png",
    },
  ],
};

export const allOfficers = Object.entries(officers).reduce(
  (result, [year, officers]) => [...result, ...officers],
  [] as Officer[]
);
