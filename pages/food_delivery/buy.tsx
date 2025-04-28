import React, { useState, useEffect } from "react";
import { Container, Heading, Text, Select, Flex, Box } from "@chakra-ui/react";
import FoodNFTGrid from "../../components_new/NFTGrids/food_NFTGrid";
import { FOOD_NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS } from "../../const/addresses";
import { useContract, useNFTs, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { NFT as NFTType } from "@thirdweb-dev/sdk";

export default function Buy() {
    const { contract } = useContract(FOOD_NFT_COLLECTION_ADDRESS);
    const { data: nfts, isLoading } = useNFTs(contract);
    const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
    const [sortOption, setSortOption] = useState<string>("default");
    const [sortedNFTs, setSortedNFTs] = useState<NFTType[] | undefined>(undefined);

    const { data: directListings } = useValidDirectListings(marketplace, {
        tokenContract: FOOD_NFT_COLLECTION_ADDRESS,
    });
    const { data: auctionListings } = useValidEnglishAuctions(marketplace, {
        tokenContract: FOOD_NFT_COLLECTION_ADDRESS,
    });

    useEffect(() => {
        if (!nfts) {
            setSortedNFTs(undefined);
            return;
        }

        const priceMap = new Map<string, number>();

        directListings?.forEach(listing => {
            priceMap.set(listing.tokenId, parseFloat(listing.currencyValuePerToken.displayValue));
        });

        auctionListings?.forEach(listing => {
            if (!priceMap.has(listing.tokenId)) {
                priceMap.set(listing.tokenId, parseFloat(listing.minimumBidCurrencyValue.displayValue));
            }
        });

        const nftsWithPrices = nfts.map(nft => ({
            ...nft,
            price: priceMap.get(nft.metadata.id) || 0
        }));

        let sorted;
        switch (sortOption) {
            case "priceLowHigh":
                sorted = [...nftsWithPrices].sort((a, b) => a.price - b.price);
                break;
            case "priceHighLow":
                sorted = [...nftsWithPrices].sort((a, b) => b.price - a.price);
                break;
            default:
                sorted = nfts;
        }
        setSortedNFTs(sorted);
    }, [nfts, sortOption, directListings, auctionListings]);

    return (
        <Container maxW={"1200px"} p={5}>
            <Flex direction="column" width="100%">
                {/* Header row with heading and sort controls */}
                <Flex direction="row" justify="space-between" align="center" mb={4}>
                    <Box>
                        <Heading mb={2}>Buy NFTs</Heading>
                        <Text>Browse and buy NFTs from this collection.</Text>
                    </Box>

                    <Flex align="center" marginRight="1rem">
                        <Text whiteSpace="nowrap" mr={2}>Sort by:</Text>
                        <Select
                            width="200px"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                        </Select>
                    </Flex>
                </Flex>

                <FoodNFTGrid
                    isLoading={isLoading}
                    data={sortedNFTs || nfts}
                    emptyText={"No NFTs found"}
                />
            </Flex>
        </Container>
    );
}