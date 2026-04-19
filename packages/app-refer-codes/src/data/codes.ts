export type Brand = {
  key: string
  name: string
  logoUrl: string
  theme?: 'light' | 'dark'
}

export const brands: Brand[] = [
  {
    key: 'airbnb',
    name: 'Airbnb',
    logoUrl: '/brands/airbnb_wordmark.svg',
    theme: 'dark',
  },
  {
    key: 'chase',
    name: 'Chase',
    logoUrl: '/brands/chase_wordmark.svg',
    theme: 'light',
  },
  {
    key: 'coinbase',
    name: 'coinbase',
    logoUrl: '/brands/coinbase_wordmark.svg',
    theme: 'dark',
  },
  {
    key: 'doordash',
    name: 'DoorDash',
    logoUrl: '/brands/doordash_wordmark.svg',
    theme: 'dark',
  },
  {
    key: 'lyft',
    name: 'Lyft',
    logoUrl: '/brands/lyft_wordmark.svg',
    theme: 'dark',
  },
  {
    key: 'mint-mobile',
    name: 'Mint Mobile',
    logoUrl: '/brands/mint_mobile_wordmark.svg',
    theme: 'dark',
  },
  {
    key: 'prenuvo',
    name: 'Prenuvo',
    logoUrl: '/brands/prenuvo_wordmark.svg',
    theme: 'light',
  },
  {
    key: 'pia',
    name: 'Private Internet Access',
    logoUrl: '/brands/pia_wordmark.svg',
    theme: 'light',
  },
  {
    key: 'purple',
    name: 'Purple',
    logoUrl: '/brands/purple_wordmark.svg',
    theme: 'dark',
  },
  {
    key: 'turbotax',
    name: 'TurboTax',
    logoUrl: '/brands/turbotax_wordmark.svg',
    theme: 'dark',
  },
  {
    key: 'uber',
    name: 'Uber',
    logoUrl: '/brands/uber_wordmark.svg',
    theme: 'light',
  },
  {
    key: 'wise',
    name: 'Wise',
    logoUrl: '/brands/wise_wordmark.svg',
    theme: 'dark',
  },
]

export type Code = {
  key: string
  brandKey: string
  description: string
} & ({ url: string } | { code: string })

export const codes: Code[] = [
  {
    key: 'chase-bank',
    brandKey: 'chase',
    description: '$400 bonus for new Chase checking customers',
    url: 'https://accounts.chase.com/raf/share/2520037318?jp_aid_a=T_86282&jp_aid_p=private_conversation_deck%2fconversationDeckMessageThree',
  },
  {
    key: 'chase-freedom',
    brandKey: 'chase',
    description:
      'Earn cash back with the Chase Freedom Unlimited or Chase Freedom Flex credit card.',
    url: 'https://www.referyourchasecard.com/18m/I5NZC7ETWS',
  },
  {
    key: 'chase-sapphire',
    brandKey: 'chase',
    description:
      'Earn 125,000 bonus points with Sapphire Reserve® or 75,000 bonus points with Sapphire Preferred®.',
    url: 'https://www.referyourchasecard.com/19v/6IYOJCSKAY',
  },
  {
    key: 'coinbase',
    brandKey: 'coinbase',
    description: '$30 for you after 1st trade of $20',
    url: 'https://coinbase.com/join/S2ZV6EL',
  },
  {
    key: 'doordash',
    brandKey: 'doordash',
    description: '$5 off your first order over $20.',
    url: 'https://drd.sh/nc4IL2bWVWYqs17p',
  },
  {
    key: 'lyft',
    brandKey: 'lyft',
    description: '50% off your 1st ride',
    url: 'https://www.lyft.com/i/NATHAN67481',
  },
  {
    key: 'mint-mobile',
    brandKey: 'mint-mobile',
    description: 'Get $15 in renewal credit',
    url: 'https://fbuy.me/vaRFL',
  },
  {
    key: 'pia',
    brandKey: 'pia',
    description: 'Get 30 days free',
    url: 'https://www.privateinternetaccess.com/pages/buy-a-vpn/1218buyavpn?invite=U2FsdGVkX18P77qeez2G2JCh0J3YNx-hKan2ba92y9g%2CmsfRst0pmkdlVUDQZ33lJdCtHW0',
  },
  {
    key: 'prenuvo',
    brandKey: 'prenuvo',
    description: '$300 off full body scan',
    url: 'https://prenuvo.com/ref/UrKj1',
  },
  {
    key: 'purple',
    brandKey: 'purple',
    description: '$100 instant gift credit',
    url: 'https://share.purple.com/by/nathan_demasie',
  },
  {
    key: 'turbotax',
    brandKey: 'turbotax',
    description: '20% off TurboTax!',
    url: 'https://refer.intuit.com/nathandemasie',
  },
  {
    key: 'uber',
    brandKey: 'uber',
    description: '50% off your first 2 rides',
    url: 'https://referrals.uber.com/refer?id=kpa4dhkm1g9e',
  },
  {
    key: 'wise',
    brandKey: 'wise',
    description: 'Fee free transfer up to €500',
    url: 'https://wise.com/invite/dic/nathand240',
  },
]
