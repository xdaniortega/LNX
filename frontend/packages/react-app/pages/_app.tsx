/*import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import celoGroups from "@celo/rainbowkit-celo/lists";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
*/
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import '@fontsource/inter';



import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
  useWeb3ModalEvents,
  useWeb3ModalState,
  useWeb3ModalTheme
} from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'

/*
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

const { chains, publicClient } = configureChains(
  [Celo, Alfajores],
  [publicProvider()]
);

const connectors = celoGroups({
  chains,
  projectId,
  appName: (typeof document === "object" && document.title) || "Your App Name",
});

const appInfo = {
  appName: "Celo Composer",
};

const wagmiConfig = createConfig({
  connectors,
  publicClient: publicClient,
});*/

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app


const appInfo = {
  appName: "LNX",
};

// 2. Create wagmiConfig
const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'LNX'
  }
})

// 3. Create modal
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


  /*return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={appInfo} coolMode={true}>

      </RainbowKitProvider>
    </WagmiConfig>
  );*/

    return (
    <WagmiConfig config={wagmiConfig}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
    )
}

export default App;
