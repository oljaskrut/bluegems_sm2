export interface Listing {
  name: string
  price: number
  paintindex: number
  paintseed: number
  floatvalue: number
  url: string
  stickers:
    | {
        wear: string
        name: string
        slot: number
      }[]
    | undefined
  tradableAfter: string | undefined
}

export interface SkinsResponse {
  assets: Asset[]
}

export interface Asset {
  item: Item
  status: string
  appId: number
  assetId: string
  amount: number
  tradableAfter?: string
  game730: Game730
  overstock: Overstock
  imageUrl: string
  uniqueId: string
  stackable: boolean
  stackId: number
  tradeLockTime: number
  tradeLock: boolean
  notAccepted: boolean
  type: string
  virtual: boolean
}

export interface Item {
  appId: number
  marketName: string
  price: number
  details: Details
  definitionId: any
  imageUrl: string
  hasDescription: any
}

export interface Details {
  colors: string[]
  description: any
  floatMin: number
  floatMax: number
  weapon: string
  skin: string
  variantName: string
  exterior: string
  rarity: string
  type: string
  statTrak: boolean
  souvenir: boolean
  releasedAt: string
}

export interface Game730 {
  assetId: string
  stickers?: Sticker[]
  paintWear: number
  paintIndex: number
  paintSeed: number
  fadePercent: any
  isScreenshotSupported: boolean
  hasPaint: boolean
  inspectUrl: string
  screenshotUrl?: string
}

export interface Sticker {
  wear: string
  slot: number
  inspected: boolean
  marketName: string
  imageUrl: string
  price: number
}

export interface Overstock {
  limit: number
  available: number
  stock: number
}
