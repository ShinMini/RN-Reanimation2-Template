/** @format */

import { useMemo } from 'react'
import { ImageSourcePropType } from 'react-native'

const img1 = require('../assets/images/cards/a.jpg')
const img2 = require('../assets/images/cards/apple.jpg')
const img3 = require('../assets/images/cards/img3.jpg')
const img4 = require('../assets/images/cards/bear.png')
const img5 = require('../assets/images/cards/coin.jpg')
const img6 = require('../assets/images/cards/dinosaur.jpg')
const img7 = require('../assets/images/cards/person1.jpg')
const img8 = require('../assets/images/cards/person2.jpg')
const img9 = require('./../assets/images/cards/sea.jpg')
const img10 = require('./../assets/images/cards/something.jpg')
const img11 = require('./../assets/images/cards/sunflower.jpg')
const img12 = require('./../assets/images/cards/yellow.png')

const logo = require('../assets/icons/dog.png')
const avatar = require('./../assets/images/user/avatar.png')

export interface categoryInterface {
  id: number
  name: string
}

export const categories: categoryInterface[] = [
  {
    id: 1,
    name: 'Recent',
  },
  {
    id: 2,
    name: 'Top',
  },
  {
    id: 3,
    name: 'Trending',
  },
  {
    id: 4,
    name: 'Recommend',
  },
]

export interface logo {
  id: number
  name: string
  image: ImageSourcePropType
}

export interface cardInterface {
  id: number
  name: string
  image: ImageSourcePropType
  category: categoryInterface
  author: string
  owner: string
}

const lunchPack: logo = {
  id: 1,
  name: '$',
  image: logo,
}

export const cards: cardInterface[] = [
  {
    id: 1,
    name: 'Mini Hyeon',
    image: img1,
    category: categories[0],
    author: 'Shin Mini',
    owner: '현민',
  },
  {
    id: 2,
    name: 'apple',
    image: img2,
    category: categories[1],
    author: 'Shin Mini',
    owner: '신현민',
  },
  {
    id: 3,
    name: 'artwork',
    image: img3,
    category: categories[2],
    author: 'Gumi bear',
    owner: 'bin sal man',
  },
  {
    id: 4,
    name: 'bear',
    image: img4,
    category: categories[1],
    author: 'teddy bear',
    owner: 'yasuo',
  },
  {
    id: 5,
    name: 'coin',
    image: img5,
    category: categories[0],
    author: 'gitter',
    owner: 'garen',
  },
  {
    id: 6,
    name: 'dinosaur',
    image: img6,
    category: categories[2],
    author: 'cllid',
    owner: 'holy moly',
  },
  {
    id: 7,
    name: 'person',
    image: img7,
    category: categories[2],
    author: 'human',
    owner: 'Im not',
  },
  {
    id: 8,
    name: 'human',
    image: img8,
    category: categories[3],
    author: 'robot',
    owner: 'none',
  },
  {
    id: 9,
    name: 'sea',
    image: img9,
    category: categories[2],
    author: 'bitch',
    owner: 'bench',
  },
  {
    id: 11,
    name: 'something',
    image: img10,
    category: categories[0],
    author: 'Author 1',
    owner: 'Owner',
  },
  {
    id: 12,
    name: 'sunflower',
    image: img11,
    category: categories[1],
    author: 'D-B',
    owner: 'ShinMini',
  },
  {
    id: 13,
    name: 'yellow',
    image: img12,
    category: categories[2],
    author: 'YG',
    owner: 'KIH',
  },
  {
    id: 14,
    name: 'A',
    image: img1,
    category: categories[1],
    author: 'EIK',
    owner: 'heung min son',
  },
  {
    id: 15,
    name: 'Apple',
    image: img2,
    category: categories[0],
    author: 'jobs',
    owner: 'steve',
  },
  {
    id: 16,
    name: 'art',
    image: img3,
    category: categories[2],
    author: '윤',
    owner: '과타몰리',
  },
  {
    id: 17,
    name: 'bear',
    image: img4,
    category: categories[2],
    author: '지리산 곰',
    owner: '모략가',
  },
  {
    id: 18,
    name: 'coin',
    image: img5,
    category: categories[3],
    author: '비트',
    owner: '루시우',
  },
  {
    id: 19,
    name: 'dinosaur',
    image: img6,
    category: categories[2],
    author: '김꽈뚜릅',
    owner: '조선인',
  },
  {
    id: 111,
    name: 'person',
    image: img7,
    category: categories[0],
    author: '인간1',
    owner: '블리츠크랭크',
  },
  {
    id: 112,
    name: '사람',
    image: img8,
    category: categories[1],
    author: '이루다',
    owner: '아니다',
  },
  {
    id: 113,
    name: '내가 그린 기린 그림',
    image: img9,
    category: categories[2],
    author: '김기린',
    owner: '짜오렁',
  },
  {
    id: 114,
    name: '바다다',
    image: img10,
    category: categories[1],
    author: 'ela',
    owner: 'kloie',
  },
  {
    id: 115,
    name: 'ilkein',
    image: img12,
    category: categories[0],
    author: 'I0llk',
    owner: 'eams ili',
  },
  {
    id: 116,
    name: 'Kaielm',
    image: img11,
    category: categories[2],
    author: 'Jeil shil',
    owner: 'eiln ilkim',
  },
  {
    id: 117,
    name: 'dil!',
    image: img3,
    category: categories[2],
    author: 'Eiln Qilm',
    owner: 'Ziln Jjiz',
  },
  {
    id: 118,
    name: 'Zion',
    image: img4,
    category: categories[3],
    author: 'Zao Zion',
    owner: 'Ailn ieil',
  },
  {
    id: 119,
    name: 'Cutter',
    image: img1,
    category: categories[2],
    author: 'Gutter',
    owner: 'Butter',
  },
  {
    id: 21,
    name: 'iLike',
    image: img2,
    category: categories[0],
    author: 'Utou',
    owner: 'iIKLLL',
  },
  {
    id: 22,
    name: 'EILKJ',
    image: img5,
    category: categories[1],
    author: 'iII<<',
    owner: 'IEPN',
  },
  {
    id: 23,
    name: 'IELN',
    image: img6,
    category: categories[2],
    author: 'Author',
    owner: 'Owner',
  },
  {
    id: 24,
    name: 'ILNE',
    image: img7,
    category: categories[1],
    author: 'author',
    owner: 'Name',
  },
  {
    id: 25,
    name: 'ilen',
    image: img8,
    category: categories[0],
    author: 'ilkne',
    owner: 'euhhh',
  },
  {
    id: 26,
    name: 'googter',
    image: img9,
    category: categories[2],
    author: 'gan',
    owner: 'gane zi',
  },
  {
    id: 27,
    name: 'ildnm',
    image: img10,
    category: categories[2],
    author: 'good thing',
    owner: 'memory',
  },
  {
    id: 28,
    name: 'Teaser',
    image: img11,
    category: categories[3],
    author: 'N_Author',
    owner: 'Owner Name',
  },
  {
    id: 29,
    name: 'Teaser',
    image: img12,
    category: categories[2],
    author: 'N_Author',
    owner: 'Owner Name',
  },
]

export interface collectionInterface {
  id: number
  name: string
  cards: cardInterface[]
  category: categoryInterface
  author: string
  image: ImageSourcePropType
  logo: logo
  handle: string
  star: number
}

export const collections: collectionInterface[] = [
  {
    id: 1,
    name: 'ShinMini',
    cards: cards.slice(2, 7),
    category: categories[0],
    author: 'Hyeon Min',
    image: cards[2].image,
    logo: lunchPack,
    handle: '@Handle_prime',
    star: 3.87,
  },
  {
    id: 2,
    name: 'SunFlower',
    cards: cards.slice(5, 10),
    category: categories[1],
    author: 'LeoNardo',
    image: cards[5].image,
    logo: lunchPack,
    handle: '@Handle_middle',
    star: 0.92,
  },
  {
    id: 3,
    name: 'Hyeon Min',
    cards: cards.slice(10, 15),
    category: categories[2],
    author: 'Hyeon mini',
    image: cards[10].image,
    logo: lunchPack,
    handle: '@Handle_prime',
    star: 0.75,
  },
  {
    id: 4,
    name: '신현민',
    cards: cards.slice(13, 17),
    category: categories[3],
    author: '현민',
    image: cards[13].image,
    logo: lunchPack,
    handle: '@Handle_prime',
    star: 2.63,
  },
]

interface userInterface {
  id: number
  name: string
  image: ImageSourcePropType
}

export const user: userInterface = {
  id: 1,
  name: 'Shin Mini',
  image: avatar,
}
