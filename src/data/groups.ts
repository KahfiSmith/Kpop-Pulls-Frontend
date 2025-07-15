export interface Group {
  id: string;
  name: string;
  debutYear: number;
  company: string;
  members: number;
}

export const groups: Group[] = [
  {
    id: 'twice',
    name: 'TWICE',
    debutYear: 2015,
    company: 'JYP Entertainment',
    members: 9
  },
  {
    id: 'blackpink',
    name: 'BLACKPINK',
    debutYear: 2016,
    company: 'YG Entertainment',
    members: 4
  },
  {
    id: 'redvelvet',
    name: 'Red Velvet',
    debutYear: 2014,
    company: 'SM Entertainment',
    members: 5
  },
  {
    id: 'aespa',
    name: 'Aespa',
    debutYear: 2020,
    company: 'SM Entertainment',
    members: 4
  },
  {
    id: 'itzy',
    name: 'ITZY',
    debutYear: 2019,
    company: 'JYP Entertainment',
    members: 5
  },
  {
    id: 'ive',
    name: 'IVE',
    debutYear: 2021,
    company: 'Starship Entertainment',
    members: 6
  },
  {
    id: 'newjeans',
    name: 'NewJeans',
    debutYear: 2022,
    company: 'ADOR (HYBE)',
    members: 5
  },
  {
    id: 'stayc',
    name: 'STAYC',
    debutYear: 2020,
    company: 'High Up Entertainment',
    members: 6
  },
  {
    id: 'lesserafim',
    name: 'LE SSERAFIM',
    debutYear: 2022,
    company: 'Source Music (HYBE)',
    members: 5
  },
  {
    id: 'hearts2hearts',
    name: 'Hearts2Hearts',
    debutYear: 2025,
    company: 'SM Entertainment',
    members: 5
  },
  {
    id: 'babymonster',
    name: 'BABYMONSTER',
    debutYear: 2023,
    company: 'YG Entertainment',
    members: 7
  }
];
