export type Rarity = "normal" | "rare" | "legend"

export interface TreasureCard {
  id: string
  no: number
  name: string
  subtitle: string
  spot: string
  image: string
  rarity: Rarity
}

// 7장의 BFD 카드. 각 카드의 id는 QR코드 URL의 ?card= 값과 일치합니다.
export const CARDS: TreasureCard[] = [
  {
    id: "1",
    no: 1,
    name: "정문 앞",
    subtitle: "BFD ORIGIN",
    spot: "정문 앞",
    image: "/bfd_card_placeholder.png",
    rarity: "normal",
  },
  {
    id: "2",
    no: 2,
    name: "영상교육관",
    subtitle: "BFD VISION",
    spot: "영상교육관",
    image: "/bfd_card_placeholder.png",
    rarity: "normal",
  },
  {
    id: "3",
    no: 3,
    name: "2호관",
    subtitle: "BFD CREW",
    spot: "2호관",
    image: "/bfd_card_placeholder.png",
    rarity: "normal",
  },
  {
    id: "4",
    no: 4,
    name: "1호관",
    subtitle: "BFD GRIND",
    spot: "1호관",
    image: "/bfd_card_placeholder.png",
    rarity: "rare",
  },
  {
    id: "5",
    no: 5,
    name: "선린인고 중앙",
    subtitle: "BFD HUSTLE",
    spot: "선린인터넷고등학교 중앙",
    image: "/bfd_card_placeholder.png",
    rarity: "rare",
  },
  {
    id: "6",
    no: 6,
    name: "운동장",
    subtitle: "BFD LEGACY",
    spot: "운동장",
    image: "/bfd_card_placeholder.png",
    rarity: "rare",
  },
  {
    id: "7",
    no: 7,
    name: "체육관",
    subtitle: "BFD PHANTOM",
    spot: "체육관",
    image: "/bfd_card_placeholder.png",
    rarity: "legend",
  },
]

export const GIFT_MILESTONE = 4
export const COUPON_MILESTONE = 7

export const rarityLabel: Record<Rarity, string> = {
  normal: "NORMAL",
  rare: "RARE",
  legend: "LEGEND",
}
