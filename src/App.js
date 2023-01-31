import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { VNFTMint } from "./VNFTMint";
const { chains, provider } = configureChains([polygonMumbai], [publicProvider()]);

const { connectors } = getDefaultWallets({
	appName: "Bundlr Valentines NFT",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const App = () => {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<VNFTMint />
			</RainbowKitProvider>
		</WagmiConfig>
	);
};
export default App;
