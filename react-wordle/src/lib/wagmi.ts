import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { Chain, configureChains, createClient } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const eduChain: Chain = {
  id: 656_476,
  name: 'EDU Chain Testnet',
  network: 'edu-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EDU',
    symbol: 'EDU',
  },
  rpcUrls: {
    default: { http: ['https://open-campus-codex-sepolia.drpc.org'] },
    public: { http: ['https://open-campus-codex-sepolia.drpc.org'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://open-campus-codex-sepolia.drpc.org' },
  },
}

const { chains, provider } = configureChains(
  [eduChain],
  [publicProvider()]
)

const projectId = '225568a047b4d16e33d3a4468110a6b4'
const { wallets } = getDefaultWallets({ appName: 'Worboo', projectId, chains })
const connectors = connectorsForWallets([...wallets])

export const config = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export { chains }
