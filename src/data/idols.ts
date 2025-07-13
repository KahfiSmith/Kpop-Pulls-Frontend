import { RarityType } from './rarities';

export interface Idol {
  id: string;
  name: string;
  stageName: string;
  group: string;
  birthdate: string;
  birthplace: string;
  position: string;
  quote: string;
  rarity: RarityType;
  image: string;
}

export const idols: Idol[] = [
  {
    id: 'twice-sana',
    name: 'Minatozaki Sana',
    stageName: 'Sana',
    group: 'TWICE',
    birthdate: 'December 29, 1996',
    birthplace: 'Osaka, Japan',
    position: 'Vocalist, Dancer',
    quote: 'Shy shy shy~',
    rarity: 'common',
    image: '/images/sana.jpeg'
  },
  {
    id: 'twice-nayeon',
    name: 'Im Nayeon',
    stageName: 'Nayeon',
    group: 'TWICE',
    birthdate: 'September 22, 1995',
    birthplace: 'Seoul, South Korea',
    position: 'Lead Vocalist, Lead Dancer, Center',
    quote: 'I\'m gonna be a star!',
    rarity: 'epic',
    image: '/images/nayeon.jpeg'
  },
  {
    id: 'twice-jeongyeon',
    name: 'Yoo Jeongyeon',
    stageName: 'Jeongyeon',
    group: 'TWICE',
    birthdate: 'November 1, 1996',
    birthplace: 'Suwon, South Korea',
    position: 'Lead Vocalist',
    quote: 'One in a million!',
    rarity: 'rare',
    image: '/images/jeongyeon.jpeg'
  },
  {
    id: 'twice-momo',
    name: 'Hirai Momo',
    stageName: 'Momo',
    group: 'TWICE',
    birthdate: 'November 9, 1996',
    birthplace: 'Kyoto, Japan',
    position: 'Main Dancer, Vocalist, Rapper',
    quote: 'Momo-ring!',
    rarity: 'epic',
    image: '/images/momo.jpeg'
  },
  {
    id: 'twice-jihyo',
    name: 'Park Jihyo',
    stageName: 'Jihyo',
    group: 'TWICE',
    birthdate: 'February 1, 1997',
    birthplace: 'Guri, South Korea',
    position: 'Leader, Main Vocalist',
    quote: 'One in a million, you are the one!',
    rarity: 'legendary',
    image: '/images/jihyo.jpeg'
  },
  {
    id: 'twice-mina',
    name: 'Myoui Mina',
    stageName: 'Mina',
    group: 'TWICE',
    birthdate: 'March 24, 1997',
    birthplace: 'San Antonio, Texas, USA',
    position: 'Main Dancer, Vocalist',
    quote: 'Yes, I\'m Mina, and I love ONCE!',
    rarity: 'epic',
    image: '/images/mina.jpeg'
  },
  {
    id: 'twice-dahyun',
    name: 'Kim Dahyun',
    stageName: 'Dahyun',
    group: 'TWICE',
    birthdate: 'May 28, 1998',
    birthplace: 'Seongnam, South Korea',
    position: 'Rapper, Vocalist',
    quote: 'Eagle dance!',
    rarity: 'rare',
    image: '/images/dahyun.jpeg'
  },
  {
    id: 'twice-chaeyoung',
    name: 'Son Chaeyoung',
    stageName: 'Chaeyoung',
    group: 'TWICE',
    birthdate: 'April 23, 1999',
    birthplace: 'Seoul, South Korea',
    position: 'Main Rapper, Vocalist',
    quote: 'Strawberry Princess!',
    rarity: 'rare',
    image: '/images/chaeyoung.jpeg'
  },
  {
    id: 'twice-tzuyu',
    name: 'Chou Tzuyu',
    stageName: 'Tzuyu',
    group: 'TWICE',
    birthdate: 'June 14, 1999',
    birthplace: 'Tainan, Taiwan',
    position: 'Lead Dancer, Vocalist, Visual, Maknae',
    quote: 'Cheese kimbap!',
    rarity: 'legendary',
    image: '/images/tzuyu.jpeg'
  },
  {
    id: 'blackpink-jiso',
    name: 'Kim Jisoo',
    stageName: 'Jisoo',
    group: 'BLACKPINK',
    birthdate: 'January 3, 1995',
    birthplace: 'Seoul, South Korea',
    position: 'Lead Vocalist, Visual',
    quote: 'Jisoo-turtle rabbit Kim!',
    rarity: 'epic',
    image: '/images/jiso.jpeg'
  },
  {
    id: 'blackpink-jennie',
    name: 'Kim Jennie',
    stageName: 'Jennie',
    group: 'BLACKPINK',
    birthdate: 'January 16, 1996',
    birthplace: 'Seoul, South Korea',
    position: 'Main Rapper, Lead Vocalist',
    quote: 'BLACKPINK in your area!',
    rarity: 'legendary',
    image: '/images/jennie.jpeg'
  },
  {
    id: 'blackpink-rose',
    name: 'Park Chaeyoung',
    stageName: 'Rosé',
    group: 'BLACKPINK',
    birthdate: 'February 11, 1997',
    birthplace: 'Auckland, New Zealand',
    position: 'Main Vocalist, Lead Dancer',
    quote: 'Stay tuned!',
    rarity: 'legendary',
    image: '/images/rose.jpeg'
  },
  {
    id: 'blackpink-lisa',
    name: 'Lalisa Manobal',
    stageName: 'Lisa',
    group: 'BLACKPINK',
    birthdate: 'March 27, 1997',
    birthplace: 'Buriram, Thailand',
    position: 'Main Dancer, Lead Rapper, Sub-Vocalist, Maknae',
    quote: 'Lalisa love me!',
    rarity: 'legendary',
    image: '/images/lisa.jpeg'
  },
  {
    id: 'redvelvet-irene',
    name: 'Bae Joohyun',
    stageName: 'Irene',
    group: 'Red Velvet',
    birthdate: 'March 29, 1991',
    birthplace: 'Daegu, South Korea',
    position: 'Leader, Main Rapper, Lead Dancer, Sub-Vocalist, Visual',
    quote: 'Baerene!',
    rarity: 'epic',
    image: '/images/irene.jpeg'
  },
  {
    id: 'redvelvet-seulgi',
    name: 'Kang Seulgi',
    stageName: 'Seulgi',
    group: 'Red Velvet',
    birthdate: 'February 10, 1994',
    birthplace: 'Ansan, South Korea',
    position: 'Main Dancer, Lead Vocalist',
    quote: 'Seulgi bear!',
    rarity: 'legendary',
    image: '/images/seulgi.jpeg'
  },
  {
    id: 'redvelvet-wendy',
    name: 'Son Seungwan',
    stageName: 'Wendy',
    group: 'Red Velvet',
    birthdate: 'February 21, 1994',
    birthplace: 'Seongbuk-dong, South Korea',
    position: 'Main Vocalist',
    quote: 'Wannie!',
    rarity: 'epic',
    image: '/images/wendy.jpeg'
  },
  {
    id: 'redvelvet-joy',
    name: 'Park Sooyoung',
    stageName: 'Joy',
    group: 'Red Velvet',
    birthdate: 'September 3, 1996',
    birthplace: 'Jeju Island, South Korea',
    position: 'Lead Rapper, Sub-Vocalist',
    quote: 'I\'m Joy, I\'m a vitamin!',
    rarity: 'rare',
    image: '/images/joy.jpeg'
  },
  {
    id: 'redvelvet-yeri',
    name: 'Kim Yerim',
    stageName: 'Yeri',
    group: 'Red Velvet',
    birthdate: 'March 5, 1999',
    birthplace: 'Seoul, South Korea',
    position: 'Sub-Rapper, Sub-Vocalist, Maknae',
    quote: 'Yeriana Grande!',
    rarity: 'rare',
    image: '/images/yeri.jpeg'
  },
  {
    id: 'aespa-karina',
    name: 'Yoo Jimin',
    stageName: 'Karina',
    group: 'aespa',
    birthdate: 'April 11, 2000',
    birthplace: 'Bucheon, South Korea',
    position: 'Leader, Main Dancer, Lead Vocalist, Lead Rapper, Visual',
    quote: 'I\'m Karina, æ-Karina!',
    rarity: 'legendary',
    image: '/images/karina.jpeg'
  },
  {
    id: 'aespa-giselle',
    name: 'Uchinaga Aeri',
    stageName: 'Giselle',
    group: 'aespa',
    birthdate: 'October 30, 2000',
    birthplace: 'Tokyo, Japan',
    position: 'Main Rapper, Sub-Vocalist',
    quote: 'Naevis, calling!',
    rarity: 'epic',
    image: '/images/giselle.jpeg'
  },
  {
    id: 'aespa-winter',
    name: 'Kim Minjeong',
    stageName: 'Winter',
    group: 'aespa',
    birthdate: 'January 1, 2001',
    birthplace: 'Busan, South Korea',
    position: 'Main Vocalist, Lead Dancer',
    quote: 'Armamenter!',
    rarity: 'legendary',
    image: '/images/winter.jpeg'
  },
  {
    id: 'aespa-ningning',
    name: 'Ning Yizhuo',
    stageName: 'Ningning',
    group: 'aespa',
    birthdate: 'October 23, 2002',
    birthplace: 'Harbin, China',
    position: 'Main Vocalist, Maknae',
    quote: 'Black Mamba!',
    rarity: 'epic',
    image: '/images/ningning.jpeg'
  },
  {
    id: 'itzy-yeji',
    name: 'Hwang Yeji',
    stageName: 'Yeji',
    group: 'ITZY',
    birthdate: 'May 26, 2000',
    birthplace: 'Jeonju, South Korea',
    position: 'Leader, Main Dancer, Lead Vocalist, Lead Rapper',
    quote: 'In my area!',
    rarity: 'legendary',
    image: '/images/yeji.jpeg'
  },
  {
    id: 'itzy-lia',
    name: 'Choi Jisu',
    stageName: 'Lia',
    group: 'ITZY',
    birthdate: 'July 21, 2000',
    birthplace: 'Incheon, South Korea',
    position: 'Main Vocalist',
    quote: 'Dalla Dalla!',
    rarity: 'epic',
    image: '/images/lia.jpeg'
  },
  {
    id: 'itzy-ryujin',
    name: 'Shin Ryujin',
    stageName: 'Ryujin',
    group: 'ITZY',
    birthdate: 'April 17, 2001',
    birthplace: 'Seoul, South Korea',
    position: 'Main Rapper, Lead Dancer, Sub-Vocalist, Center',
    quote: 'Not shy, not me!',
    rarity: 'epic',
    image: '/images/ryujin.jpeg'
  },
  {
    id: 'itzy-chaeryeong',
    name: 'Lee Chaeryeong',
    stageName: 'Chaeryeong',
    group: 'ITZY',
    birthdate: 'June 5, 2001',
    birthplace: 'Yongin, South Korea',
    position: 'Main Dancer, Sub-Vocalist, Sub-Rapper',
    quote: 'Mafia in the morning!',
    rarity: 'rare',
    image: '/images/chaeryeong.jpeg'
  },
  {
    id: 'itzy-yuna',
    name: 'Shin Yuna',
    stageName: 'Yuna',
    group: 'ITZY',
    birthdate: 'December 9, 2003',
    birthplace: 'Suwon, South Korea',
    position: 'Lead Rapper, Lead Dancer, Sub-Vocalist, Visual, Maknae',
    quote: 'Hey, hey, hey, hey!',
    rarity: 'rare',
    image: '/images/yuna.jpeg'
  },
  {
    id: 'ive-yujin',
    name: 'An Yujin',
    stageName: 'Yujin',
    group: 'IVE',
    birthdate: 'September 1, 2003',
    birthplace: 'Cheongju, South Korea',
    position: 'Leader, Lead Vocalist, Lead Dancer',
    quote: 'I am!',
    rarity: 'epic',
    image: '/images/yujin.jpeg'
  },
  {
    id: 'ive-gaeul',
    name: 'Kim Gaeul',
    stageName: 'Gaeul',
    group: 'IVE',
    birthdate: 'September 24, 2002',
    birthplace: 'Seoul, South Korea',
    position: 'Main Dancer, Sub-Rapper, Sub-Vocalist',
    quote: 'I\'ve IVE!',
    rarity: 'rare',
    image: '/images/gaeul.jpeg'
  },
  {
    id: 'ive-rei',
    name: 'Naoi Rei',
    stageName: 'Rei',
    group: 'IVE',
    birthdate: 'February 3, 2004',
    birthplace: 'Nagoya, Japan',
    position: 'Main Rapper, Sub-Vocalist',
    quote: 'Love dive!',
    rarity: 'rare',
    image: '/images/rei.jpeg'
  },
  {
    id: 'ive-wonyoung',
    name: 'Jang Wonyoung',
    stageName: 'Wonyoung',
    group: 'IVE',
    birthdate: 'August 31, 2004',
    birthplace: 'Seoul, South Korea',
    position: 'Lead Dancer, Sub-Vocalist, Visual, Center',
    quote: 'Kitsch!',
    rarity: 'legendary',
    image: '/images/wonyoung.jpeg'
  },
  {
    id: 'ive-liz',
    name: 'Kim Jiwon',
    stageName: 'Liz',
    group: 'IVE',
    birthdate: 'November 21, 2004',
    birthplace: 'Jeju Island, South Korea',
    position: 'Main Vocalist',
    quote: 'After LIKE!',
    rarity: 'epic',
    image: '/images/liz.jpeg'
  },
  {
    id: 'ive-leeseo',
    name: 'Lee Hyunseo',
    stageName: 'Leeseo',
    group: 'IVE',
    birthdate: 'February 21, 2007',
    birthplace: 'Incheon, South Korea',
    position: 'Sub-Vocalist, Maknae',
    quote: 'Eleven!',
    rarity: 'common',
    image: '/images/leeseo.jpeg'
  },
  {
    id: 'newjeans-minji',
    name: 'Kim Minji',
    stageName: 'Minji',
    group: 'NewJeans',
    birthdate: 'May 7, 2004',
    birthplace: 'Chuncheon, South Korea',
    position: 'Leader, Lead Vocalist, Lead Dancer, Visual',
    quote: 'Attention!',
    rarity: 'epic',
    image: '/images/minji.jpeg'
  },
  {
    id: 'newjeans-hanni',
    name: 'Pham Ngoc Han',
    stageName: 'Hanni',
    group: 'NewJeans',
    birthdate: 'October 6, 2004',
    birthplace: 'Melbourne, Australia',
    position: 'Lead Vocalist, Lead Dancer',
    quote: 'Hype boy!',
    rarity: 'epic',
    image: '/images/hanni.jpeg'
  },
  {
    id: 'newjeans-danielle',
    name: 'Danielle Marsh',
    stageName: 'Danielle',
    group: 'NewJeans',
    birthdate: 'April 11, 2005',
    birthplace: 'Newcastle, Australia',
    position: 'Main Vocalist, Lead Dancer',
    quote: 'Cookie!',
    rarity: 'legendary',
    image: '/images/danielle.jpeg'
  },
  {
    id: 'newjeans-haerin',
    name: 'Kang Haerin',
    stageName: 'Haerin',
    group: 'NewJeans',
    birthdate: 'May 15, 2006',
    birthplace: 'Seoul, South Korea',
    position: 'Lead Vocalist',
    quote: 'OMG!',
    rarity: 'rare',
    image: '/images/haerin.jpeg'
  },
  {
    id: 'newjeans-hyein',
    name: 'Lee Hyein',
    stageName: 'Hyein',
    group: 'NewJeans',
    birthdate: 'April 21, 2008',
    birthplace: 'Incheon, South Korea',
    position: 'Lead Dancer, Sub-Vocalist, Maknae',
    quote: 'Ditto!',
    rarity: 'rare',
    image: '/images/hyein.jpeg'
  },
  {
    id: 'hearts2hearts-stella',
    name: 'Park Stella',
    stageName: 'Stella',
    group: 'Hearts2Hearts',
    birthdate: 'March 8, 2006',
    birthplace: 'Seoul, South Korea',
    position: 'Leader, Main Vocalist',
    quote: 'Heart to heart!',
    rarity: 'legendary',
    image: '/images/stella.jpeg'
  },
  {
    id: 'hearts2hearts-carmen',
    name: 'Carmen Rodriguez',
    stageName: 'Carmen',
    group: 'Hearts2Hearts',
    birthdate: 'July 12, 2007',
    birthplace: 'Barcelona, Spain',
    position: 'Main Dancer, Lead Vocalist',
    quote: 'Corazón a corazón!',
    rarity: 'epic',
    image: '/images/carmen.jpeg'
  },
  {
    id: 'hearts2hearts-yuha',
    name: 'Kim Yuha',
    stageName: 'Yuha',
    group: 'Hearts2Hearts',
    birthdate: 'January 23, 2008',
    birthplace: 'Busan, South Korea',
    position: 'Main Rapper, Sub-Vocalist',
    quote: 'Beat of my heart!',
    rarity: 'rare',
    image: '/images/yuha.jpeg'
  },
  {
    id: 'hearts2hearts-juun',
    name: 'Wang Juun',
    stageName: 'Juun',
    group: 'Hearts2Hearts',
    birthdate: 'September 4, 2008',
    birthplace: 'Taipei, Taiwan',
    position: 'Lead Dancer, Lead Rapper',
    quote: 'Heartbeats!',
    rarity: 'epic',
    image: '/images/juun.jpeg'
  },
  {
    id: 'hearts2hearts-jiwoo',
    name: 'Lee Jiwoo',
    stageName: 'Jiwoo',
    group: 'Hearts2Hearts',
    birthdate: 'December 15, 2009',
    birthplace: 'Incheon, South Korea',
    position: 'Visual, Sub-Vocalist, Maknae',
    quote: 'Heartful!',
    rarity: 'rare',
    image: '/images/jiwoo.jpeg'
  },
  {
    id: 'lesserafim-sakura',
    name: 'Miyawaki Sakura',
    stageName: 'Sakura',
    group: 'LE SSERAFIM',
    birthdate: 'March 19, 1998',
    birthplace: 'Kagoshima City, Japan',
    position: 'Vocalist',
    quote: 'Science! Science!',
    rarity: 'legendary',
    image: '/images/sakura.jpeg'
  },
  {
    id: 'lesserafim-chaewon',
    name: 'Kim Chaewon',
    stageName: 'Chaewon',
    group: 'LE SSERAFIM',
    birthdate: 'August 1, 2000',
    birthplace: 'Seoul, South Korea',
    position: 'Leader, Vocalist, Dancer',
    quote: 'I am fearless!',
    rarity: 'epic',
    image: '/images/chaewon.jpeg'
  },
  {
    id: 'lesserafim-yunjin',
    name: 'Huh Yunjin',
    stageName: 'Yunjin',
    group: 'LE SSERAFIM',
    birthdate: 'October 8, 2001',
    birthplace: 'New York, USA',
    position: 'Vocalist',
    quote: 'Dream big, work hard!',
    rarity: 'rare',
    image: '/images/yunjin.jpeg'
  },
  {
    id: 'lesserafim-kazuha',
    name: 'Nakamura Kazuha',
    stageName: 'Kazuha',
    group: 'LE SSERAFIM',
    birthdate: 'August 9, 2003',
    birthplace: 'Kochi City, Japan',
    position: 'Vocalist, Dancer',
    quote: 'Grace meets strength',
    rarity: 'rare',
    image: '/images/kazuha.jpeg'
  },
  {
    id: 'lesserafim-eunchae',
    name: 'Hong Eunchae',
    stageName: 'Eunchae',
    group: 'LE SSERAFIM',
    birthdate: 'November 10, 2006',
    birthplace: 'Miryang, South Korea',
    position: 'Vocalist, Lead Dancer, Maknae',
    quote: 'Smile Potato!',
    rarity: 'common',
    image: '/images/eunchae.jpeg'
  }
];

export const getIdolsByRarity = (rarity: RarityType): Idol[] => {
  return idols.filter(idol => idol.rarity === rarity);
};

export const getIdolsByGroup = (group: string): Idol[] => {
  return idols.filter(idol => idol.group === group);
};

export const getIdolById = (id: string): Idol | undefined => {
  return idols.find(idol => idol.id === id);
};
