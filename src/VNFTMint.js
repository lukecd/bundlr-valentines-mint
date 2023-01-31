import React, { useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import VNFTAbi from "./abi/VNFTMint.json";
import { useBalance, useAccount, useContract, useContractEvent, useProvider, useSigner } from "wagmi";

export const VNFTMint = () => {
	const CONTRACT_ADDRESS = "0xA7090651cc25256d8033c8Bfc69468a5fc499B12";
	const { data: signer, isError: isSignerError, isLoading: isSignerLoading } = useSigner();
	const provider = useProvider();

	const [message, setMessage] = useState("Connect your wallet and click mint");
	const [mintedTokenId, setMintedTokenId] = useState();

	const baseURL = "https://testnets.opensea.io/assets/mumbai/0xa7090651cc25256d8033c8bfc69468a5fc499b12/";

	const vNFTContractSigner = useContract({
		address: CONTRACT_ADDRESS,
		abi: VNFTAbi,
		signerOrProvider: signer,
	});
	console.log("vNFTContractSigner=", vNFTContractSigner);
	const mint = async () => {
		console.log("minting for: ", signer._address);
		const tx = await vNFTContractSigner.safeMint(signer._address, { gasLimit: 1000000 });
		console.log(tx);
		setMessage("Mint success ... waiting for token id");
		const receipt = await tx.wait();
		console.log(receipt);
		const mintedTokenId = await receipt.events[0].args[2].toString();
		setMintedTokenId(baseURL + mintedTokenId);
		setMessage("We're bound for life ...");
	};
	return (
		<div className="flex flex-col w-[550px] mt-10 mr-10">
			<span className="ml-5 font-bold text-4xl">Happy Valentines Day</span>
			<span className="ml-5 font-bold text-sm">
				{message}
				{mintedTokenId && (
					<a href={mintedTokenId} target="_blank" className="underline decoration-[#D41F3A]">
						{mintedTokenId}
					</a>
				)}
			</span>
			<div className="place-self-center border-8 border-[#D41F3A]">
				<iframe
					src="https://arweave.net/EUVEgM6nuGdQDWsagnw6LaZTJWyUzNqxS7TgYje9Z4Y"
					width="500"
					height="500"
					title="NFT Preview"
				></iframe>
			</div>

			<div className="flex flex-row place-self-end mr-5 mt-2">
				<ConnectButton />
				{signer && (
					<button
						className="ml-2 bg-[#D41F3A] hover:[#D41F3A] text-black font-bold py-1 px-4 rounded"
						onClick={mint}
					>
						Mint
					</button>
				)}
			</div>
		</div>
	);
};
