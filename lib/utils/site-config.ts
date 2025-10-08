import { getSiteUrl } from "./env"

export const siteConfig = {
  name: "THOR Signals",
  description: "Professional Trading Algorithms - Access proprietary indicators used to manage $1B+ in client assets",
  url: getSiteUrl(),
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/primeaura",
    discord: "https://discord.gg/primeaura",
    github: "https://github.com/primeaura/trading-algorithms",
  },
}

export function getBaseUrl() {
  return getSiteUrl()
}
