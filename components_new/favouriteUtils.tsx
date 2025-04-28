import { ThirdwebSDK, NFT } from "@thirdweb-dev/sdk";

type FavoriteEntry = {
  id: string;
  name: string;
  image: string;
  contractAddress: string;
};

// Extend the NFT type to include contractAddress
export type NFTWithContract = NFT & { contractAddress: string };

export async function getFavoriteNFTs(address: string): Promise<NFTWithContract[]> {
  if (!address) return [];

  const raw = localStorage.getItem(`favorites_${address}`);
  if (!raw) return [];

  const favoritesObj: Record<string, FavoriteEntry> = JSON.parse(raw);

  // Initialize the SDK with the network name and your client ID
  const sdk = new ThirdwebSDK("ethereum", {
    clientId: process.env.THIRDWEB_CLIENT_ID, // Replace with your actual client ID
  });

  const result: NFTWithContract[] = [];

  for (const key in favoritesObj) {
    const { id, contractAddress } = favoritesObj[key];
    try {
      const contract = await sdk.getContract(contractAddress, "nft-collection");
      const nft = await contract.get(id);
      result.push({ ...nft, contractAddress });
    } catch (err) {
      console.error(`Failed to fetch NFT ${id} from ${contractAddress}`, err);
    }
  }

  return result;
}


  