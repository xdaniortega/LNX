import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import {
  createWeb3Modal,
  defaultWagmiConfig,
} from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { avalancheFuji, arbitrumGoerli, bscTestnet, baseGoerli, optimismGoerli, polygonMumbai, sepolia} from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

// Create wagmiConfig
const chains = [avalancheFuji, arbitrumGoerli, bscTestnet, baseGoerli, optimismGoerli, polygonMumbai, sepolia]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'LNX'
  }
})

// Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20
  }
})
function App({ Component, pageProps }: AppProps) {
    return (
    <WagmiConfig config={wagmiConfig}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
    )
}

export default App;
