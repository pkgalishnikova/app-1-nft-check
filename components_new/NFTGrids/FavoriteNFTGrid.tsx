import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import { SimpleGrid, Skeleton, Text, Link } from "@chakra-ui/react";
import NFT from "../NFTs/gym_NFT";
import { 
    GYM_NFT_COLLECTION_ADDRESS,
    FOOD_NFT_COLLECTION_ADDRESS,
    CHARITY_NFT_COLLECTION_ADDRESS 
} from "../../const/addresses";

type Props = {
    isLoading: boolean;
    data: NFTType[] | undefined;
    overrideOnclickBehavior?: (nft: NFTType) => void;
    emptyText?: string;
    onFavoriteChange?: () => void;
    collectionType?: "gym" | "food" | "charity";
}

export default function NFTGrid({
    isLoading,
    data,
    overrideOnclickBehavior,
    emptyText = "No NFTs found",
    collectionType = "gym",
}: Props) {
    const getCollectionRoute = (nft: NFTType) => {
        switch(collectionType) {
            case "food":
                return `/food_delivery/token_food/${FOOD_NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`;
            case "charity":
                return `/charity/token_charity/${CHARITY_NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`;
            case "gym":
            default:
                return `/gym/token_gym/${GYM_NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`;
        }
    };

    return (
        <SimpleGrid columns={4} spacing={6} w={"100%"} padding={2.5} my={5}>
            {isLoading ? (
                [...Array(20)].map((_, index) => (
                    <Skeleton key={index} height={"312px"} width={"100%"} />
                ))
            ) : data && data.length > 0 ? (
                data.map((nft) =>
                    !overrideOnclickBehavior ? (
                        <Link
                            href={getCollectionRoute(nft)}
                            key={nft.metadata.id}
                        >
                            <NFT 
                                nft={nft} 
                                contractAddress={""} 
                                onClick={() => {}} 
                            />
                        </Link>
                    ) : (
                        <div
                            key={nft.metadata.id}
                            onClick={() => overrideOnclickBehavior(nft)}
                        >
                            <NFT 
                                nft={nft} 
                                contractAddress={""} 
                                onClick={() => {}} 
                            />
                        </div>
                    )
                )
            ) : (
                <Text>{emptyText}</Text>
            )}
        </SimpleGrid>
    );
}
