import type { Hackathon } from '$lib/public/hackathons';

export default [
  {
    id: 'tuffyhacks2021',
    title: 'TuffyHacks 2021',
    date: 'March 2021',
    location: 'Online',
    description: '',
  },
  {
    id: 'tuffyhacks2022',
    title: 'TuffyHacks 2022',
    date: 'February 2022',
    location: 'Online',
    description: '',
  },
  {
    id: 'fullyhacks2023',
    title: 'FullyHacks 2023',
    date: 'April 2023',
    location: 'California State University, Fullerton',
    description: '',
  },
  {
    id: 'fullyhacks2024',
    title: 'FullyHacks 2024',
    date: 'February 2024',
    location: 'California State University, Fullerton',
    description: '',
  },
] as const satisfies Hackathon[];
