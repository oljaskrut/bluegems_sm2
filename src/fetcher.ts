import got from "got"
import { Asset, SkinsResponse } from "./types.js"
import axios, { isAxiosError } from "axios"

export async function credo() {
  try {
    const { data, headers } = await axios.get(
      "https://skinsmonkey.com/ru/trade",
    )

    const cookies = headers["set-cookie"]

    const regex = /\{csrfToken:"(\w+)"\},/
    const match = data.match(regex)
    const csrfToken = match[1]

    const sm_id = cookies
      ?.find((el) => el.startsWith("sm_id"))
      ?.split(";")[0]
      .replace("sm_id=", "")!

    return { csrfToken, sm_id }
  } catch (error) {
    if (isAxiosError(error))
      console.warn("At Get Steam: ", error?.message, error?.response?.data)

    console.warn("At Get Steam: ", "unexpected error: ", error)
    return
  }
}

function parse(assets: Asset[]) {
  const result = assets?.map(({ item, game730, tradableAfter }) => {
    const { marketName: name, price } = item
    const {
      paintIndex,
      paintSeed,
      paintWear,
      stickers: stcks,
      inspectUrl,
    } = game730

    const stickers = stcks?.map(({ wear, marketName: name, slot }) => ({
      wear,
      name,
      slot,
    }))

    return {
      name,
      price,
      paintindex: paintIndex,
      paintseed: paintSeed,
      floatvalue: paintWear,
      stickers,
      tradableAfter,
      url: inspectUrl,
      // overstock,
      // tradeLockTime,
    }
  })

  return result
}

export async function ff(offset: number, sm_id: string, csrfToken: string) {
  try {
    const response = await got
      .get(
        `https://skinsmonkey.com/api/inventory?limit=300&offset=${offset}&appId=730&sort=price-desc&force=true&q=case+hardened`,
        {
          headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,kk;q=0.6",
            "cache-control": "no-cache",
            "cookie": `sm_id=${sm_id}; sm_uig=730; sm_ref=TRADEUPSPY; sm_locale=ru; sm_udg=730; sm_sig=730; sm_sis=price-desc;`,
            "pragma": "no-cache",
            "referer": "https://skinsmonkey.com/ru/trade",
            "sec-ch-ua":
              '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
            "x-csrf-token": csrfToken,
          },
          // https: {
          //   ciphers: "ECDHE-ECDSA-AES128-GCM-SHA256",
          // },
        },
      )
      .json()

    const data = response as SkinsResponse
    return parse(data.assets)
  } catch (error) {
    console.warn("At Get ", error)
    return
  }
}
