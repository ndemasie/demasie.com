export type Brand = {
  key: string
  name: string
  logoUrl: string
  theme?: 'light' | 'dark'
}

//prettier-ignore
export const brands: Brand[] = [
  { key: 'airbnb', name: 'Airbnb', logoUrl: '/brands/airbnb_wordmark.svg' },
  { key: 'chase', name: 'Chase', logoUrl: '/brands/chase_wordmark.svg', theme: 'light' },
  { key: 'coinbase', name: 'coinbase', logoUrl: '/brands/coinbase_wordmark.svg' },
  { key: 'doordash', name: 'DoorDash', logoUrl: '/brands/doordash_wordmark.svg' },
  { key: 'lyft', name: 'Lyft', logoUrl: '/brands/lyft_wordmark.svg' },
  { key: 'mint-mobile', name: 'Mint Mobile', logoUrl: '/brands/mint_mobile_wordmark.svg' },
  { key: 'prenuvo', name: 'Prenuvo', logoUrl: '/brands/prenuvo_wordmark.svg', theme: 'light' },
  { key: 'private-internet-access', name: 'Private Internet Access', logoUrl: '/brands/pia_wordmark.svg', theme: 'light'},
  { key: 'purple', name: 'Purple', logoUrl: '/brands/purple_wordmark.svg' },
  { key: 'uber', name: 'Uber', logoUrl: '/brands/uber_wordmark.svg', theme: 'light' },
  { key: 'wise', name: 'Wise', logoUrl: '/brands/wise_wordmark.svg' },
]

export type Code = {
  key: string
  brandKey: string
  description: string
} & ({ url: string } | { code: string })

// prettier-ignore
export const codes: Code[] = [
  { key: 'airbnb', brandKey: 'airbnb', description: 'Up to $51 off your first trip.', url: 'https://www.airbnb.com/c/Px9xIz7qOpZufez1?unique_share_id=9561b453-a018-43e1-8da7-a46fafec67c8' },
  { key: 'chase-bank', brandKey: 'chase', description: '$300 when opening a qualifying Chase checking account', url: 'https://accounts.chase.com/raf/share/2520037318?jp_aid_a=T_86282&jp_aid_p=private_conversation_deck%2fconversationDeckMessageThree' },
  { key: 'chase-freedom', brandKey: 'chase', description: '$200 bonus with the Chase Freedom Unlimited card', url: 'https://www.referyourchasecard.com/18A/4V5FN49WD5' },
  { key: 'chase-sapphire', brandKey: 'chase', description: 'Earn 100,000 bonus points with Chase Sapphire Preferred.', url: 'https://www.referyourchasecard.com/19r/KL37LHY2VX' },
  { key: 'coinbase', brandKey: 'coinbase', description: '$30 for you after 1st trade of $20', url: 'https://coinbase.com/join/S2ZV6EL' },
  { key: 'doordash', brandKey: 'doordash', description: '$10 off your first 3 orders', url: 'https://drd.sh/nc4IL2bWVWYqs17p' },
  { key: 'lyft', brandKey: 'lyft', description: '50% off 2 rides', url: 'https://www.lyft.com/i/NATHAN67481?utm_medium=p2pi_iacc' },
  { key: 'mint-mobile', brandKey: 'mint-mobile', description: 'Get $15 in renewal credit', url: 'http://fbuy.me/vaRFL' },
  { key: 'pia', brandKey: 'private-internet-access', description: 'Get 30 days free', url: 'https://www.privateinternetaccess.com/pages/buy-a-vpn/1218buyavpn?invite=U2FsdGVkX18P77qeez2G2JCh0J3YNx-hKan2ba92y9g%2CmsfRst0pmkdlVUDQZ33lJdCtHW0' },
  { key: 'prenuvo', brandKey: 'prenuvo', description: '$300 off full body scan', url: 'https://prenuvo.com/ref/UrKj1' },
  { key: 'purple', brandKey: 'purple', description: '10% off mattresses + 5% off accessories', url: 'https://share.purple.com/by/nathan_demasie' },
  { key: 'uber', brandKey: 'uber', description: '50% off on your first 2 rides', url: 'https://referrals.uber.com/refer?id=kpa4dhkm1g9e' },
  { key: 'wise', brandKey: 'wise', description: 'Zero fees on a transfer up to €500', url: 'https://wise.com/invite/dic/nathand240' },
]
