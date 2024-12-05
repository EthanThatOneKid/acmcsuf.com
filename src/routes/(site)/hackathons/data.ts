import type { Hackathon } from '$lib/public/hackathons';

export default [
  {
    id: 'tuffyhacks2021',
    title: 'TuffyHacks 2021',
    date: 'March 2021',
    location: 'Virtual',
    theme: 'Camping',
    description:
      'It all began in 2021 when Jacob Nguyen and Samuel Sandoval reignited the tradition of hackathons at California State University Fullerton, being the first CSUF hackathon in decades. Due to the global pandemic, TuffyHacks 2021 was held virtually.',
    directors: [
      { name: 'Jacob Nguyen', picture: '/people/jacob-nguyen.webp' },
      { name: 'Samuel Sandoval', picture: '/people/samuel-sandoval.webp' },
    ],
  },
  {
    id: 'tuffyhacks2022',
    title: 'TuffyHacks 2022',
    date: 'February 2022',
    location: 'Virtual',
    theme: 'Cyberpunk',
    description: 'Following a successful first event, Jacob and Sam hosted TuffyHacks 2022.',
    directors: [
      { name: 'Jacob Nguyen', picture: '/people/jacob-nguyen.webp' },
      { name: 'Samuel Sandoval', picture: '/people/samuel-sandoval.webp' },
    ],
  },
  {
    id: 'fullyhacks2023',
    title: 'FullyHacks 2023',
    date: 'April 2023',
    location: 'California State University, Fullerton',
    theme: 'Party',
    description:
      'As Jacob and Sam approached their graduation dates, they transitioned the leadership role to Daniel "Anh Duy" Truong. The hackathon name was changed to "FullyHacks" starting with FullyHacks 2023. With the global pandemic starting to improve, FullyHacks 2023 became the first in-person hackathon event of the series.',
    directors: [{ name: 'Daniel Truong', picture: '/people/daniel-truong.webp' }],
  },
  {
    id: 'fullyhacks2024',
    title: 'FullyHacks 2024',
    date: 'February 2024',
    location: 'California State University, Fullerton',
    theme: 'Neon',
    description:
      'Now open to all college students, FullyHacks 2024 garnered an interest of over 400+ students and is the largest event of ACM at CSUF.',
    directors: [
      { name: 'Daniel Truong', picture: '/people/daniel-truong.webp' },
      { name: 'David Solano', picture: '/people/david-solano.webp' },
    ],
  },
] as const satisfies Hackathon[];
