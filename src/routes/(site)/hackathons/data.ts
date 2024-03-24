import type { Hackathon } from '$lib/public/hackathons';

export default [
  {
    id: 'tuffyhacks2021',
    title: 'TuffyHacks 2021',
    date: 'March 2021',
    location: 'Online',
  },
  {
    id: 'tuffyhacks2022',
    title: 'TuffyHacks 2022',
    date: 'February 2022',
    location: 'Online',
  },
  {
    id: 'fullyhacks2023',
    title: 'FullyHacks 2023',
    date: 'April 2023',
    location: 'California State University, Fullerton',
  },
  {
    id: 'fullyhacks2024',
    title: 'FullyHacks 2024',
    date: 'February 2024',
    location: 'California State University, Fullerton',
  },
] as const satisfies Hackathon[];
