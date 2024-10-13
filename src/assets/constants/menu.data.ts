import {Info, List, LucideIcon, PencilLine, UserCog, SquareArrowOutUpRight} from "lucide-react";

type MenuItem = {
  label: string
  type: 'route' | 'link',
  path: string
  icon: LucideIcon
}

const MENUS: Array<MenuItem> = [
  {
    label: 'SW 마일리지',
    type: 'route',
    path: '',
    icon : Info
  },
  {
    type: 'route',
    label: 'SW 마일리지 신청',
    path: 'register',
    icon : PencilLine

  },
  {
    label: '신청 내역',
    type: 'route',

    path: 'list',
    icon : List
  },
  {
    label: '내 정보',
    type: 'route',

    path: 'profile',
    icon : UserCog
  },
  {
    label: '마일리지 랭킹',
    type: 'link',
    path: `/`,
    icon : SquareArrowOutUpRight
  }
]

export {
  MENUS
}

export type {
  MenuItem
}
